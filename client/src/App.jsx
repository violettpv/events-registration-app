import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '@components/RootLayout';
import Events from '@components/Events';
import EventDetailPage from '@components/EventDetailPage';
import ErrorPage from '@components/UI/ErrorPage';
import RegisterForm from '@components/UI/RegisterForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Events /> }, // same as path: ''
      {
        path: ':eventId',
        element: <EventDetailPage />,
      },
      {
        path: ':eventId/register',
        element: <RegisterForm />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
