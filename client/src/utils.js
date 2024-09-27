export function formatDate(dateString) {
  const date = new Date(dateString);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const hour = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${month} ${day}, ${year}, ${hour}:${minutes}`;
}

export const normalizeEvents = (events) => {
  if (!Array.isArray(events)) {
    return [];
  }

  return events
    .map((event) => {
      if (event) {
        return {
          title: event.name || 'Unknown Title',
          organizer: event.promoter?.name || 'Unknown Organizer',
          datetime: event.dates?.start.dateTime || 'Unknown Date',
          description: event.url || 'Unknown',
        };
      }
      return null;
    })
    .filter((event) => event !== null);
};
