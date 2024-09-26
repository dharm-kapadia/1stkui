import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const Dashboard = Loadable(lazy(() => import('pages/dashboard/DashboardPage')));

// render - exceptions
const DiscrepanciesPage = Loadable(lazy(() => import('pages/exceptions/DiscrepanciesPage')));
const PendingPage = Loadable(lazy(() => import('pages/exceptions/PendingPage')));
const DeclinedPage = Loadable(lazy(() => import('pages/exceptions/DeclinedPage')));
const NacksPage = Loadable(lazy(() => import('pages/exceptions/NackPage')));

// render - entities
const EventsPage = Loadable(lazy(() => import('pages/entities/EventsPage')));
const TradeAgreementsPage = Loadable(lazy(() => import('pages/entities/TradeAgreementsPage')));
const LoansPage = Loadable(lazy(() => import('pages/entities/LoansPage')));
const ReratesPage = Loadable(lazy(() => import('pages/entities/ReratesPage')));
const ReturnsPage = Loadable(lazy(() => import('pages/entities/ReturnsPage')));
const RecallsPage = Loadable(lazy(() => import('pages/entities/RecallsPage')));
const BuyinsPage = Loadable(lazy(() => import('pages/entities/BuyinsPage')));
const SplitsPage = Loadable(lazy(() => import('pages/entities/SplitsPage')));

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
      path: 'discrepancies',
      element: <DiscrepanciesPage />
    },
    {
      path: 'nacks',
      element: <NacksPage />
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
      path: 'loans',
      element: <LoansPage />
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
    },
    {
      path: 'buyins',
      element: <BuyinsPage />
    },
    {
      path: 'splits',
      element: <SplitsPage />
    }
  ]
};

export default MainRoutes;
