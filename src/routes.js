import { element } from 'prop-types';
import React from 'react';


const Logins = React.lazy(() => import('./views/pages/login/Login'));
const Dashboard = React.lazy(() => import('./views/pages/page/dashboard'));
const MasterProducts = React.lazy(() => import('./views/pages/masterData/MasterProducts'));
const MasterTransaction = React.lazy(() => import('./views/pages/masterData/MasterTransaction'));
const POS = React.lazy(() => import('./views/pages/page/posPage'));



// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'));

export const adminRoutes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/login', name: 'Login', element: Logins },
  { path: '/products/master', name: 'Master Products', element: MasterProducts },
  { path: '/transaction/master', name: 'Master Transaction', element: MasterTransaction },
  { path: '/POS', name: 'POS Page', element: POS },
  // { path: '/error', name: 'Unknown', element: Page404 },
];


export const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // { path: '/products/master', name: 'Master Products', element: MasterProducts },
  // { path: '/dashboard', name: 'Dashboard', element: Dashboard },
];

