import { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import styles from '../styles/QrGenerator.module.css';


const dotStyles = [
  'square',
  'dots',
  'rounded',
  'classy',
  'classy-rounded',
  'extra-rounded'
];

const cornerStyles = [
  'square',
  'dot',
  'extra-rounded',
  'classy',
  'classy-rounded'
];

const foregroundColors = [
  '#000000', // Black
  '#ffffff', // White
  '#1f2937', // Gray-800
  '#ef4444', // Red-500
  '#10b981', // Emerald-500
  '#3b82f6', // Blue-500
  '#8b5cf6', // Violet-500
  '#f59e0b', // Amber-500
];

const backgroundColors = [
  '#ffffff', // White
  '#f9fafb', // Gray-50
  '#e5e7eb', // Gray-200
  '#fef3c7', // Yellow-100
  '#dbeafe', // Blue-100
  '#fce7f3', // Pink-100
  '#dcfce7', // Green-100
  '#f3f4f6', // Gray-100
];

const colorNameMap = {
  '#000000': 'Black',
  '#ffffff': 'White',
  '#1f2937': 'Charcoal',
  '#ef4444': 'Red',
  '#10b981': 'Emerald',
  '#3b82f6': 'Blue',
  '#8b5cf6': 'Violet',
  '#f59e0b': 'Amber',
  '#f9fafb': 'Soft Gray',
  '#e5e7eb': 'Fog',
  '#fef3c7': 'Sunlight',
  '#dbeafe': 'Sky',
  '#fce7f3': 'Blush',
  '#dcfce7': 'Mint',
  '#f3f4f6': 'Cloud'
};

const QrGenerator = () => {
  const qrRef = useRef(null);
  const [text, setText] = useState('');
  const [qrVisible, setQrVisible] = useState(false);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [dotType, setDotType] = useState('dots');
  const [cornerType, setCornerType] = useState('square');
  let url=text;
  if(!text.startsWith("https://")&&!text.startsWith("http://")){
    url="https://"+text;
  }
  const redirectUrl = `${import.meta.env.VITE_BASE_URL}/r?url=${encodeURIComponent(url)}`;
  const qrCode = useRef(
    new QRCodeStyling({
      width: 300,
      height: 300,
      type: 'canvas',
      data: '',
      dotsOptions: {
        color: fgColor,
        type: 'dots', // this makes the dots rounded
      },
      backgroundOptions: {
        color: bgColor,
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        excavate: true,
      },
    })
  );

  const handleGenerate = () => {
    if (text.trim()) {
      
      console.log(redirectUrl);
      qrCode.current.update({
        data: redirectUrl,
        dotsOptions: { color: fgColor },
        backgroundOptions: { color: bgColor },
      });
      setQrVisible(true);
    }
  };

  const handleDownload = () => {
    qrCode.current.download({
      name: 'gearix-qr',
      extension: 'jpg',
    });
  };

  useEffect(() => {
        if (qrVisible) {
        qrCode.current.update({
            data: redirectUrl,
            dotsOptions: {
                color: fgColor,
                type: dotType
            },
            backgroundOptions: {
                color: bgColor
            },
            cornersSquareOptions: {
                type: cornerType,
                color: fgColor
            },
            cornersDotOptions: {
                type: 'dot'
            }
            });
    }
    if (qrRef.current && qrVisible) {
      qrRef.current.innerHTML = ''; // clear previous canvas
      qrCode.current.append(qrRef.current);
    }
  }, [qrVisible, fgColor,text,cornerType,dotType, bgColor]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>QR Code Generator</h1>
      <p className={styles.subtitle}>Enter text or a URL to generate a custom QR code!</p>

      <input
        type="text"
        placeholder="Type your text or URL here..."
        className={styles.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleGenerate} className={styles.generateBtn}>
        Generate QR
      </button>

      {qrVisible && (
        <>
        <div className={styles.control}>
        {/* Dot Style */}
        <label className={styles.dropdownLabel}>
            Dot Style:
            <select
            value={dotType}
            onChange={(e) => setDotType(e.target.value)}
            className={styles.dropdown}
            >
            {dotStyles.map((style, idx) => (
                <option value={style} key={idx}>{style}</option>
            ))}
            </select>
        </label>

        {/* Corner Style */}
        <label className={styles.dropdownLabel}>
            Corner Style:
            <select
            value={cornerType}
            onChange={(e) => setCornerType(e.target.value)}
            className={styles.dropdown}
            >
            {cornerStyles.map((style, idx) => (
                <option value={style} key={idx}>{style}</option>
            ))}
            </select>
        </label>

        {/* Foreground Color */}
        <label className={styles.dropdownLabel}>
            Foreground:
            <select
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
            className={styles.dropdown}
            >
            {foregroundColors.map((color, idx) => (
                <option key={idx} value={color}>
                {colorNameMap[color]}
                </option>
            ))}
            </select>
        </label>

        {/* Background Color */}
        <label className={styles.dropdownLabel}>
            Background:
            <select
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className={styles.dropdown}
            >
            {backgroundColors.map((color, idx) => (
                <option key={idx} value={color}>
                {colorNameMap[color]}
                </option>
            ))}
            </select>
        </label>
        </div>


          <div className={styles.qrArea}>
            <div ref={qrRef}></div>
            <button onClick={handleDownload} className={styles.downloadBtn}>
              Download QR
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default QrGenerator;
