import styles from '@css/ParticipantItem.module.css';

export default function ParticipantItem() {
  return (
    <div className={styles.container}>
      <h4>John Doe</h4>
      <div>john.doe@gmail.com</div>
    </div>
  );
}
