import styles from '@css/EventDetailPage.module.css';
import ParticipantItem from './ParticipantItem';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEvent, getEventParticipants } from '@app/http';
import { formatDate } from '@utils';
import RegistrationChart from './UI/RegistrationChart';

export default function EventDetailPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({});
  const [participants, setParticipants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchEventDetails() {
      try {
        const event = await getEvent(eventId);
        setEvent(event);
        const participants = await getEventParticipants(eventId);
        setParticipants(participants);
      } catch (error) {
        console.log(error);
      }
    }

    fetchEventDetails();
  }, [eventId]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleButtonClick = () => {
    navigate('/');
  };

  const filteredParticipants = participants.filter(
    (participant) =>
      participant.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.blockOne}>
        <button className={styles.goBackButton} onClick={handleButtonClick}>
          All events
        </button>
        <h2>{event.title}</h2>
        <div className={styles.datetime}>{formatDate(event.datetime)}</div>
      </div>

      <div className={styles.blockTwo}>
        <div className={styles.organizer}>By {event.organizer}</div>
        <div className={styles.description}>{event.description}</div>
      </div>

      <div className={styles.blockThree}>
        <h3>Registrations over the last 7 days</h3>
        <div className={styles.chartBlock}>
          <div className={styles.chartWidth}>
            <RegistrationChart participants={participants} />
          </div>
        </div>
      </div>

      <div className={styles.blockFour}>
        <h3>&quot;{event.title}&quot; participants</h3>

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.participants}>
          {filteredParticipants.map((participant) => (
            <ParticipantItem key={participant._id} participant={participant} />
          ))}
        </div>
      </div>
    </div>
  );
}
