import styles from '@css/EventDetailPage.module.css';
import ParticipantItem from './ParticipantItem';
import DUMMY_USERS from '../../users.json';
import { useState } from 'react';

export default function EventDetailPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = DUMMY_USERS.filter(
    (user) =>
      user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          {filteredUsers.map((user) => (
            <ParticipantItem key={user.id} user={user} />
          ))}
        </div>

        {/* <div className={styles.searchBar}>SEARCH BAR</div>

        <div className={styles.participants}>
          {DUMMY_USERS.map((user) => (
            <ParticipantItem key={user.id} user={user} />
          ))}
        </div> */}
      </div>
    </div>
  );
}
