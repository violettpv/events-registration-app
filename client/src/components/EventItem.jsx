import styles from '@css/EventItem.module.css';
import Button from './UI/Button';
import { redirect, useParams } from 'react-router-dom';

export default function EventItem({ event }) {
  const { eventId } = useParams();

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h4>{event.title}</h4>
        <p>{event.description}</p>
      </div>
      <div className={styles.buttons}>
        <Button
          onClick={() => {
            console.log('Registering for event', eventId);
            redirect(`${eventId}/register`);
          }}
        >
          Register
        </Button>
        <Button>View</Button>
      </div>
    </div>
  );
}
