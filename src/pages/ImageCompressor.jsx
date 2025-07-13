import { useState, useEffect } from 'react';
import Resizer from 'react-image-file-resizer';
import styles from '../styles/ImageCompressor.module.css'; // 🌟 CSS module

const ImageCompressor = () => {
  const [originalFile, setOriginalFile] = useState(null);
  const [quality, setQuality] = useState(60);
  const [compressedBlob, setCompressedBlob] = useState(null);
  const [compressedURL, setCompressedURL] = useState(null);

  const compressImage = (file, qualityVal) => {
    if (!file) return;

    Resizer.imageFileResizer(
      file,
      undefined, // No resizing
      undefined,
      "JPEG",
      qualityVal,
      0,
      (uri) => {
        setCompressedBlob(uri);
        setCompressedURL(URL.createObjectURL(uri));
      },
      "blob"
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOriginalFile(file);
      compressImage(file, quality);
    }
  };

  useEffect(() => {
    if (originalFile) {
      compressImage(originalFile, quality);
    }
  }, [quality]);

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={styles.compressorContainer}>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {originalFile && (
        <>
          <label className={styles.label}>
            <strong>Quality:</strong> {quality}
          </label>
          <input
            className={styles.slider}
            type="range"
            min={10}
            max={100}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
          />
        </>
      )}

      {compressedURL && compressedBlob && (
        <div className={styles.previewBox}>
          <h4>Compressed Preview</h4>
          <img src={compressedURL} alt="Compressed" className={styles.previewImage} />
          <p><strong>Size:</strong> {formatBytes(compressedBlob.size)}</p>
          <br/>
          <a
            href={compressedURL}
            download="compressed-image.jpg"
            className={styles.downloadButton}
            >
            Download Compressed Image
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageCompressor;
