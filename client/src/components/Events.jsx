import styles from '@css/Events.module.css';
import EventItem from './EventItem';
import DUMMY_EVENTS from '../../test.json';
import { useState } from 'react';

const itemsPerPage = 12;

export default function Events() {
  const [page, setPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState('eventDate');
  const [sortOrder, setSortOrder] = useState('asc');

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const sortedEvents = [...DUMMY_EVENTS].sort((a, b) => {
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
  const totalPages = Math.ceil(DUMMY_EVENTS.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Events</h2>
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
          <EventItem key={event.id} event={event} />
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

      <div className={styles.apiEvents}>
        <div className={styles.title}>
          <h2>Other recommendations from our partners</h2>
        </div>
        <div className={styles.apiEventsLink}>
          <a href="">View all</a>
        </div>
      </div>
    </div>
  );
}

// import styles from '@css/Events.module.css';
// import EventItem from './EventItem';
// import DUMMY_EVENTS from '../../test.json';
// import { useState } from 'react';

// const itemsPerPage = 12;

// export default function Events() {
//   const [page, setPage] = useState(1);

//   const startIndex = (page - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentEvents = DUMMY_EVENTS.slice(startIndex, endIndex);
//   const totalPages = Math.ceil(DUMMY_EVENTS.length / itemsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setPage(pageNumber);
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.title}>
//         <h2>Events</h2>
//       </div>
//       <div className={styles.events}>
//         {currentEvents.map((event) => (
//           <EventItem key={event.id} event={event} />
//         ))}
//       </div>
//       <div className={styles.pagination}>
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index + 1}
//             className={`${styles.pageButton} ${page === index + 1 ? styles.active : ''}`}
//             onClick={() => handlePageChange(index + 1)}
//             disabled={page === index + 1}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//       <div className={styles.apiEvents}>
//         <div className={styles.title}>
//           <h2>Other recommendations from our partners</h2>
//         </div>
//         <div className={styles.apiEventsLink}>
//           <a href="https://www.google.com">View all</a>
//         </div>
//       </div>
//     </div>
//   );
// }
