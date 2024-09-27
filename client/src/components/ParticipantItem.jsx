import styles from '@css/ParticipantItem.module.css';

export default function ParticipantItem({ participant }) {
  return (
    <div className={styles.container}>
      <h4>{participant.fullname}</h4>
      <div>{participant.email}</div>
    </div>
  );
}
