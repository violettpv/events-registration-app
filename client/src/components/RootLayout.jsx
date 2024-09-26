import { Outlet } from 'react-router-dom';
import '../index.css';

export default function RootLayout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}
