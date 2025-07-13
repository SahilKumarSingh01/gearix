// src/components/ToolCard.jsx
import styles from '../styles/ToolCard.module.css';
import { Link } from 'react-router-dom';

const ToolCard = ({ name, icon: Icon, link }) => {
  return (
    <Link to={link} className={styles.linkWrapper}>
      <div className={styles.card}>
        <div className={styles.iconArea}>
          <Icon size={40} />
        </div>
        <h3 className={styles.name}>{name}</h3>
      </div>
    </Link>
  );
};

export default ToolCard;
