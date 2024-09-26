import styles from '@css/ErrorPage.module.css';

export default function ErrorPage() {
  return (
    <div className={styles.container}>
      <h1>Page doesn`t exist!</h1>
      <button className={styles.button} onClick={() => window.history.back()}>
        Go back
      </button>
    </div>
  );
}
