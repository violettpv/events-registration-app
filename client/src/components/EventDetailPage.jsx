import styles from '@css/EventDetailPage.module.css';
import ParticipantItem from './ParticipantItem';

export default function EventDetailPage() {
  return (
    <div className={styles.container}>
      <div className={styles.blockOne}>
        <h2>Title</h2>
        <div className={styles.datetime}>Date and Time</div>
      </div>
      <div className={styles.blockTwo}>
        <div className={styles.organizer}>By Organizer</div>
        <div className={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis doloremque neque
          quia ipsam! Numquam at saepe similique id quaerat beatae amet eos totam eum
          cupiditate? Distinctio minus saepe omnis maxime.
        </div>
      </div>
      <div className={styles.blockThree}>
        <h3>Title participants</h3>

        <div className={styles.searchBar}>SEARCH BAR</div>

        <div className={styles.participants}>
          <ParticipantItem />
          <ParticipantItem />
          <ParticipantItem />
          <ParticipantItem />
          <ParticipantItem />
        </div>
      </div>
    </div>
  );
}
