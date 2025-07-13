import { useState, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import styles from '../styles/VideoCompressor.module.css';

const ffmpeg = new FFmpeg({log:true});

const VideoCompressor = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [quality, setQuality] = useState(28);
  const [compressedURL, setCompressedURL] = useState(null);
  const [compressedBlob, setCompressedBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadFFmpeg = async () => {
      if (!ffmpeg.loaded) {
        await ffmpeg.load();
        setReady(true);
      }
    };
    loadFFmpeg();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setCompressedURL(null);
      setCompressedBlob(null);
      
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        setDuration(video.duration);
      };
      video.src = URL.createObjectURL(file);
    }
  };

  const compressVideo = async () => {
    if (!videoFile || !ready) return;

    setLoading(true);

    const inputName = 'input.mp4';
    const outputName = 'output.mp4';

    await ffmpeg.writeFile(inputName, await fetchFile(videoFile));
    ffmpeg.on('log', ({ message }) => {
      const match = message.match(/time=(\d+):(\d+):([\d.]+)/);
      if (match) {
        const h = parseInt(match[1]);
        const m = parseInt(match[2]);
        const s = parseFloat(match[3]);
        const currentTime = h * 3600 + m * 60 + s;
        if (duration > 0) {
          const percent = (currentTime / duration) * 100;
          setProgress(Math.min(percent, 100));
        }
      }
    });
    await ffmpeg.exec([
      '-i', inputName,
      '-vcodec', 'libx264',
      '-crf', `${quality}`,
      '-preset', 'fast',
      outputName
    ]);

    const data = await ffmpeg.readFile(outputName);
    const blob = new Blob([data], { type: 'video/mp4' });
    const url = URL.createObjectURL(blob);

    setCompressedBlob(blob);
    setCompressedURL(url);
    setLoading(false);
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={styles.compressorContainer}>
      <h1 className={styles.title}>Video Compressor</h1>
      
      <input type="file" accept="video/*" onChange={handleFileChange} />

      {videoFile && (
        <>
          <label className={styles.label}>
            <strong>Compression Level (CRF):</strong> {quality}
          </label>
          <input
            className={styles.slider}
            type="range"
            min={23}
            max={35}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
          />
          <p><strong>Original Size:</strong> {formatBytes(videoFile.size)}</p>
          <button onClick={compressVideo} disabled={loading} className={styles.downloadButton}>
            {loading ? 'Compressing...' : 'Compress Video'}
          </button>
          {loading && (
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
              <span>{progress.toFixed(1)}%</span>
            </div>
          )}

        </>
      )}

      {compressedURL && compressedBlob && (
        <div className={styles.previewBox}>
          <h4>Compressed Preview</h4>
          <video src={compressedURL} controls width="100%" />
          <p><strong>Size:</strong> {formatBytes(compressedBlob.size)}</p>
          <a href={compressedURL} download="compressed-video.mp4" className={styles.downloadButton}>
            Download Compressed Video
          </a>
        </div>
      )}
    </div>
  );
};

export default VideoCompressor;
