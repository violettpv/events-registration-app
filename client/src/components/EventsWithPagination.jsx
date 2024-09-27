import styles from '@css/Events.module.css';
import EventItem from './EventItem';
import { useState, useEffect } from 'react';
import { getAllEvents } from '@app/http';
import { useNavigate } from 'react-router-dom';

const itemsPerPage = 12;

export default function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState('eventDate');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    async function fetchEvents() {
      try {
        const events = await getAllEvents();
        setEvents(events);
      } catch (error) {
        console.log(error);
      }
    }

    fetchEvents();
  }, []);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const sortedEvents = [...events].sort((a, b) => {
    const valueA = a[sortCriteria];
    const valueB = b[sortCriteria];

    if (sortCriteria === 'eventDate') {
      const dateA = new Date(a.datetime);
      const dateB = new Date(b.datetime);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }

    // for string comparisons
    if (valueA < valueB) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0; // if valueA === valueB, keep a relative order
  });

  const currentEvents = sortedEvents.slice(startIndex, endIndex);
  const totalPages = Math.ceil(events.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleOtherEvents = () => {
    navigate('/recommendations');
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Events</h2>
      </div>

      <div className={styles.apiEvents}>
        <div>Other recommendations from our partners</div>
        <button className={styles.blueButton} onClick={handleOtherEvents}>
          View all
        </button>
      </div>

      <div className={styles.sortControls}>
        <label>Sort by:</label>
        <select value={sortCriteria} onChange={handleSortChange}>
          <option value="eventDate">Date</option>
          <option value="title">Title</option>
          <option value="organizer">Organizer</option>
        </select>

        <button className={styles.sortingButton} onClick={toggleSortOrder}>
          {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      </div>

      <div className={styles.events}>
        {currentEvents.map((event) => (
          <EventItem key={event._id} event={event} />
        ))}
      </div>

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`${styles.pageButton} ${page === index + 1 ? styles.active : ''}`}
            onClick={() => handlePageChange(index + 1)}
            disabled={page === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
