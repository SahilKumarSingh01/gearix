import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from '../styles/Redirect.module.css';

const Redirect = () => {
  const [searchParams] = useSearchParams();
  const targetUrl = searchParams.get('url');
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (!targetUrl) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          window.location.href = targetUrl;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetUrl]);

  return (
    <div className={styles.redirectContainer}>
    <img src="/favicon.ico" alt="Gearix Logo" className={styles.logo} />
    <p>Thanks for using <strong>Gearix</strong></p>
    <h1>Redirecting in {countdown}...</h1>
    
    </div>
  );
};

export default Redirect;
