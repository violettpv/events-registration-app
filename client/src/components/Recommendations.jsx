import { useEffect, useState } from 'react';
import { getEventsAPI } from '@app/http';
import { useNavigate } from 'react-router-dom';
import styles from '@css/Events.module.css';
import EventItem from './EventItem';
import Loader from './UI/Loader';

export default function Recommendations() {
  const navigate = useNavigate();
  const [eventsAPI, setEventAPI] = useState([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 8;

  useEffect(() => {
    async function fetchEventsAPI() {
      try {
        const events = await getEventsAPI();
        setEventAPI(events);
      } catch (error) {
        console.log(error);
      }
    }

    fetchEventsAPI();
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      const response = await getEventsAPI(page, itemsPerPage);
      setEventAPI((prev) => {
        return [...prev, ...response];
      });
      setLoading(false);
    }, 1500);
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((prev) => prev + 1);
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.apiEvents}>
        <button className={styles.blueButton} onClick={handleGoBack}>
          Main page
        </button>
      </div>

      <div className={styles.title}>
        <h2>Recommendations from our partners</h2>
      </div>

      <div className={styles.events}>
        {eventsAPI.map((event) => (
          <EventItem key={event._id} event={event} />
        ))}
      </div>

      {loading && <Loader />}
    </div>
  );
}
