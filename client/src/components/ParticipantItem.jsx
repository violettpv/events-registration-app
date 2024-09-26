import styles from '@css/ParticipantItem.module.css';

export default function ParticipantItem({ user }) {
  return (
    <div className={styles.container}>
      <h4>{user.fullname}</h4>
      <div>{user.email}</div>
    </div>
  );
}
