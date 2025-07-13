
import ToolCard from '../components/ToolCard.jsx';
import { LuQrCode, LuImage, LuVideo, LuRepeat } from 'react-icons/lu';
import { TbFileText } from 'react-icons/tb';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>Welcome to Gearix </h1>
      <p className={styles.subtitle}>Your all-in-one file utility web app.</p>
      <p className={styles.description}>
        Easily compress images and videos, edit PDFs, convert files, generate QR codes, and more.
      </p>
      <div className={styles.toolGrid}>
        <ToolCard name="QR Generator" icon={LuQrCode} link="/qr" />
        {/* <ToolCard name="PDF Tools" icon={TbFileText} link="/pdf" /> */}
        <ToolCard name="Image Compressor" icon={LuImage} link="/image-compressor" />
        <ToolCard name="Video Compressor" icon={LuVideo} link="/video-compressor" />
        {/* <ToolCard name="File Converter" icon={LuRepeat} link="/convert" /> */}
      </div>
    </div>
  );
};

export default Home;
