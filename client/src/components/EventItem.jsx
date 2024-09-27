import styles from '@css/EventItem.module.css';
import Button from './UI/Button';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '@utils';

export default function EventItem({ event }) {
  const navigate = useNavigate();
  const eventId = event._id;

  const handleRegister = () => {
    navigate(`${eventId}/register`);
  };

  const handleView = () => {
    navigate(`${eventId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h4>{event.title}</h4>
        <p>{event.organizer}</p>
        <p>{formatDate(event.datetime)}</p>
        <p>{event.description}</p>
      </div>
      <div className={styles.buttons}>
        <Button onClick={handleRegister}>Register</Button>
        <Button onClick={handleView}>View</Button>
      </div>
    </div>
  );
}
