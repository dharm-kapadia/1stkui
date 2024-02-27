import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const Dashboard = Loadable(lazy(() => import('pages/dashboard/DashboardPage')));

// render - exceptions
const ErrorsPage = Loadable(lazy(() => import('pages/exceptions/ErrorsPage')));
const PendingPage = Loadable(lazy(() => import('pages/exceptions/PendingPage')));
const DeclinedPage = Loadable(lazy(() => import('pages/exceptions/DeclinedPage')));

// render - entities
const EventsPage = Loadable(lazy(() => import('pages/entities/EventsPage')));
const TradeAgreementsPage = Loadable(lazy(() => import('pages/entities/TradeAgreementsPage')));
const ContractsPage = Loadable(lazy(() => import('pages/entities/ContractsPage')));
const ReratesPage = Loadable(lazy(() => import('pages/entities/ReratesPage')));
const ReturnsPage = Loadable(lazy(() => import('pages/entities/ReturnsPage')));
const RecallsPage = Loadable(lazy(() => import('pages/entities/RecallsPage')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Dashboard />
    },
    {
      path: 'dashboard',
      element: <Dashboard />
    },
    {
      path: 'declined',
      element: <DeclinedPage />
    },
    {
      path: 'errors',
      element: <ErrorsPage />
    },
    {
      path: 'pending',
      element: <PendingPage />
    },
    {
      path: 'events',
      element: <EventsPage />
    },
    {
      path: 'tradeagreements',
      element: <TradeAgreementsPage />
    },
    {
      path: 'contracts',
      element: <ContractsPage />
    },
    {
      path: 'rerates',
      element: <ReratesPage />
    },
    {
      path: 'returns',
      element: <ReturnsPage />
    },
    {
      path: 'recalls',
      element: <RecallsPage />
    }
  ]
};

export default MainRoutes;
