import { useEffect, useState } from 'react';
import { useParams, useLocation } from "react-router-dom";

import styles from '../styles/Redirect.module.css';

const Redirect = () => {
  const [countdown, setCountdown] = useState(3);
  const location = useLocation();


  useEffect(() => {
    const targetUrl = location.pathname.replace("/r/", "");

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
  }, []);

  return (
    <div className={styles.redirectContainer}>
    <img src="/favicon.ico" alt="Gearix Logo" className={styles.logo} />
    <p>Thanks for using <strong>Gearix</strong></p>
    <h1>Redirecting in {countdown}...</h1>
    
    </div>
  );
};

export default Redirect;
