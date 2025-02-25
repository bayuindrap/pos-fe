import React, { useEffect, useState } from 'react';
import CIcon from '@coreui/icons-react';
import { 
  cilColumns,
  cilAccountLogout,
  cilSettings,
  cilChartLine,
  cilScreenDesktop,
  cilBrowser
} from '@coreui/icons';
import {
  CNavItem,
  CNavTitle,
  CImage,
  CNavGroup,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  sessionSelector,
  sessionAction,
} from '../src/redux/slicer/sessionSlicer';
import API from '../src/service/api';
import loadgif from './assets/images/loading.gif';

const Navigation = () => {
  const sessionData = useSelector(sessionSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogout, setIsLogout] = useState(false);

  const logoutHandler = async (e) => {
    e.preventDefault();
    setIsLogout(true);
    var params = { userId: sessionData[0].ID_USER, token: null };
    console.log("cek", sessionData[0].ID_USER)
    await API.post('login/updateToken', params);
    dispatch(sessionAction.logout());
    setTimeout(() => {
      navigate('/login');
      setIsLogout(false);
    }, 3250);
  };

  useEffect(() => {
    // console.log("data session", sessionData[0])
  }, []);

  const navItems = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon icon={cilColumns} customClassName='nav-icon' />,
      roles: ['ROLEGOD', 'ROLEUSER'],
    },
    {
      component: CNavItem,
      name: 'POS',
      to: '/POS',
      icon: <CIcon icon={cilScreenDesktop} customClassName='nav-icon' />,
      roles: ['ROLEGOD', 'ROLEUSER'],
    },
    
    {
      component: CNavTitle,
      name: '',
    },
    {
      component: CNavTitle,
      name: '',
    },
    {
      component: CNavTitle,
      name: '',
    },
    {
      component: CNavGroup,
      name: 'Master Data',
      icon: <CIcon icon={cilSettings} customClassName='nav-icon' />,
      items: [
        {
          component: CNavItem,
          name: 'Master Product',
          to: '/products/master',
          icon: <CIcon icon={cilBrowser} customClassName='nav-icon' />,
          roles: ['ROLEGOD'],
        },
        {
          component: CNavItem,
          name: 'Master Transaction',
          to: '/transaction/master',
          icon: <CIcon icon={cilChartLine} customClassName='nav-icon' />,
          roles: ['ROLEGOD', 'ROLEUSER'],
        },
        
      ],
      roles: ['ROLEGOD', 'ROLEUSER'],
    },
    {
      component: CNavItem,
      name: isLogout ? 'Logging out...' : 'Keluar',
      to: '#',
      onClick: (e) => logoutHandler(e),
      icon: isLogout ? (
        <div className='loading-icon'>
          <CImage src={loadgif} width={70} height={70} />
        </div>
      ) : (
        <CIcon icon={cilAccountLogout} customClassName='nav-icon' />
      ),
      roles: ['ROLEGOD', 'ROLEUSER'],
      style: { fontWeight: 'bold', fontSize: '20px' },
    },
  ];  
  const filterNavItems = (items) => {
    return items
      .filter((item) => !item.roles || item.roles.includes(sessionData[0].ROLE))
      .map((item) => ({
        ...item,
        items: item.items ? filterNavItems(item.items) : undefined,
      }));
  };

  const filteredNavItems = filterNavItems(navItems);

  return filteredNavItems;
};

export default Navigation;
