import styles from '../styles/AboutPage.module.css';

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About Gearix File Studio</h1>

      <p className={styles.description}>
        <strong>Gearix File Studio</strong> is a lightweight, privacy-first file toolkit that runs entirely in your browser.
      </p>

      <p className={styles.text}>
        Whether you're compressing images, reducing video sizes, or generating QR codes, this tool provides a fast, secure, and fully offline experience—your files never leave your device.
      </p>

      <div className={styles.features}>
        <h2 className={styles.subheading}>Current Features</h2>
        <ul>
          <li>Image Compression with real-time preview</li>
          <li>Video Compression with adjustable quality</li>
          <li>QR Code Generator with instant redirect support</li>
        </ul>
      </div>

      <p className={styles.text}>
        More features are on the roadmap and will be added incrementally. If you have suggestions or requests, feel free to reach out.
      </p>

      <p className={styles.footer}>
        Made with care by <strong>Sahil Kumar Singh</strong>
      </p>
    </div>
  );
};

export default AboutPage;
