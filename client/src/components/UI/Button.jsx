import styles from '@css/Button.module.css';

export default function Button({ children, onClick = () => {} }) {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
}
