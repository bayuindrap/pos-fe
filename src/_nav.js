import React, { useEffect, useState } from 'react';
import CIcon from '@coreui/icons-react';
import {
  cilUser,
  cilBook,
  cilMedicalCross,
  cilColumns,
  cilPeople,
  cilChart,
  cilHospital,
  cilUserFemale,
  cilAccountLogout,
  cilAddressBook,
  cilColorBorder,
  cilSpeech,
  cilContact,
  cilGamepad,
  cilSettings,
  cilMovie,
  cilPenAlt,
  cilNotes,
  cilLevelUp,
  cilOptions,
  cibKeycdn,
  cilDescription
} from '@coreui/icons';
import {
  CNavItem,
  CNavTitle,
  CImage,
  CNavGroup,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
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
    var params = { usrId: sessionData.USR_ID, tokenFcm: null };
    await API.post('dashboard/login/updateToken', params);
    dispatch(sessionAction.logout());
    setTimeout(() => {
      navigate('/login');
      setIsLogout(false);
    }, 3250);
  };

  useEffect(() => {
    // console.log("session", sessionData.ROLE)
  }, []);

  const navItems = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon icon={cilColumns} customClassName='nav-icon' />,
      roles: ['ROLEGOD', 'ROLE002'],
    },
    {
      component: CNavItem,
      name: 'Pasien',
      to: '/jumlahPasien',
      icon: <CIcon icon={cilPeople} customClassName='nav-icon' />,
      roles: ['ROLEGOD', 'ROLE002'],
    },
    {
      component: CNavItem,
      name: 'Perawat',
      to: '/jumlahPerawat',
      icon: <CIcon icon={cilUserFemale} customClassName='nav-icon' />,
      roles: ['ROLEGOD' ],
    },
    {
      component: CNavItem,
      name: 'Keluarga',
      to: '/keluarga',
      icon: <CIcon icon={cilContact} customClassName='nav-icon' />,
      roles: ['ROLEGOD', 'ROLE002'],
    },
    {
      component: CNavItem,
      name: 'Kunjungan Dokter',
      to: '/jumlahKunjungan',
      icon: <CIcon icon={cilHospital} customClassName='nav-icon' />,
      roles: ['ROLEGOD', 'ROLE002'],
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
          name: 'Pengaturan Key',
          to: '/key',
          icon: <CIcon icon={cibKeycdn} customClassName='nav-icon' />,
          roles: ['ROLEGOD'],
        },
        {
          component: CNavItem,
          name: 'Pengaturan Obat',
          to: '/jumlahObat',
          icon: <CIcon icon={cilMedicalCross} customClassName='nav-icon' />,
          roles: ['ROLEGOD', 'ROLE002'],
        },
        {
          component: CNavItem,
          name: 'Pengaturan Pasien',
          to: '/pengaturanPasien',
          icon: <CIcon icon={cilPeople} customClassName='nav-icon' />,
          roles: ['ROLEGOD', 'ROLE002'],
        },
        {
          component: CNavItem,
          name: 'Pengaturan Perawat',
          to: '/pengaturanPerawat',
          icon: <CIcon icon={cilUserFemale} customClassName='nav-icon' />,
          roles: ['ROLEGOD', 'ROLE002'],
        },
        {
          component: CNavItem,
          name: 'Pengaturan Keluarga',
          to: '/pengaturanKeluarga',
          icon: <CIcon icon={cilContact} customClassName='nav-icon' />,
          roles: ['ROLEGOD', 'ROLE002'],
        },
        {
          component: CNavItem,
          name: 'Pengaturan Keluhan',
          to: '/pengaturanKeluhan',
          icon: <CIcon icon={cilChart} customClassName='nav-icon' />,
          roles: ['ROLEGOD', 'ROLE002'],
        },
        {
          component: CNavItem,
          name: 'Jawaban Quiz',
          to: '/jawabanQuiz',
          icon: <CIcon icon={cilColorBorder} customClassName='nav-icon' />,
          roles: ['ROLEGOD', 'ROLE002'],
        },
        {
          component: CNavGroup,
          name: 'Hasil Survey',
          icon: <CIcon icon={cilBook} customClassName='nav-icon' />,
          items: [
            {
              component: CNavItem,
              name: 'Survey Keluarga',
              to: '/jawabanSurveyKeluarga',
              icon: <CIcon icon={cilDescription} customClassName='nav-icon' />,
              roles: ['ROLEGOD','ROLE002'],
            },
            {
              component: CNavItem,
              name: 'Survey Pasien',
              to: '/jawabanSurveyPasien',
              icon: <CIcon icon={cilUser} customClassName='nav-icon' />,
              roles: ['ROLEGOD','ROLE002'],
            },
          ],
          roles: ['ROLEGOD','ROLE002'],
        },
        {
          component: CNavGroup,
          name: 'Master Quiz',
          icon: <CIcon icon={cilGamepad} customClassName='nav-icon' />,
          items: [
            {
              component: CNavItem,
              name: 'Level Quiz',
              to: '/levelQuiz',
              icon: <CIcon icon={cilLevelUp} customClassName='nav-icon' />,
              roles: ['ROLEGOD'],
            },
            {
              component: CNavItem,
              name: 'Tema Quiz',
              to: '/temaQuiz',
              icon: <CIcon icon={cilNotes} customClassName='nav-icon' />,
              roles: ['ROLEGOD'],
            },
            {
              component: CNavItem,
              name: 'Pertanyaan Quiz',
              to: '/quiz',
              icon: <CIcon icon={cilPenAlt} customClassName='nav-icon' />,
              roles: ['ROLEGOD'],
            },
          ],
          roles: ['ROLEGOD'],
        },
        {
          component: CNavItem,
          name: 'Pengaturan Records',
          to: '/pengaturanRecords',
          icon: <CIcon icon={cilOptions} customClassName='nav-icon' />,
          roles: ['ROLEGOD'],
        },
        {
          component: CNavItem,
          name: 'Pengaturan Survey',
          to: '/survey',
          icon: <CIcon icon={cilSpeech} customClassName='nav-icon' />,
          roles: ['ROLEGOD'],
        },
        {
          component: CNavItem,
          name: 'Pengaturan Education',
          to: '/pengaturanEducation',
          icon: <CIcon icon={cilMovie} customClassName='nav-icon' />,
          roles: ['ROLEGOD'],
        },
        {
          component: CNavItem,
          name: 'Pengaturan User',
          to: '/dataUser',
          icon: <CIcon icon={cilAddressBook} customClassName='nav-icon' />,
          roles: ['ROLEGOD', 'ROLE002'],
        },
      ],
      roles: ['ROLEGOD', 'ROLE002'],
    },
    {
      component: CNavItem,
      name: isLogout ? 'Logging out...' : 'Keluar',
      to: '#',
      onClick: (e) => logoutHandler(e),
      // icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
      icon: isLogout ? (
        <div className='loading-icon'>
          <CImage src={loadgif} width={70} height={70} />
        </div>
      ) : (
        <CIcon icon={cilAccountLogout} customClassName='nav-icon' />
      ),
      roles: ['ROLEGOD', 'ROLE002'],
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
