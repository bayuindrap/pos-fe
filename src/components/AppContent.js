import React, { Suspense, useState, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'


import {routes} from '../routes'
import { useSelector } from "react-redux";
import {sessionSelector} from "../redux/slicer/sessionSlicer"

const AppContent = () => {
  const sessionData = useSelector(sessionSelector);
  const [roleRoute,setRoleRoute] = useState(routes);

  useEffect(()=>{
    switch(sessionData.ROLE) {
      case 'ROLEGOD':
          setRoleRoute(routes);
          break;
      case 'ROLEUSER':
          setRoleRoute(routes);
          break;
      default:
        setRoleRoute(routes);
        break;
    }
  },[sessionData]);

  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {roleRoute.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
