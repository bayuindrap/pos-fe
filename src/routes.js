import { element } from 'prop-types';
import React from 'react';


const Dashboard = React.lazy(() => import('./views/pages/page/asd'));



// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'));
const Logins = React.lazy(() => import('./views/pages/login/Login'));

export const adminRoutes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/login', name: 'Login', element: Logins },
  // { path: '/error', name: 'Unknown', element: Page404 },
];


export const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // { path: '/dashboard', name: 'Dashboard', element: Dashboard },
];

