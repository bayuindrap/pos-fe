// import React, { Suspense, useState, useEffect } from 'react'
// import { Navigate, Route, Routes } from 'react-router-dom'
// import { CContainer, CSpinner } from '@coreui/react'


// import {routes,perawatRoutes,adminRoutes} from '../routes'
// import { useSelector } from "react-redux";
// import {sessionSelector} from "../redux/slicer/sessionSlicer"

// const AppContent = () => {
//   const sessionSelect = useSelector(sessionSelector);
//   const [roleRoute,setRoleRoute] = useState(routes);

//   useEffect(()=>{
//     switch(sessionSelect.ROLE_ID) {
//       case 'ROLE001':
//           setRoleRoute(adminRoutes);
//           break;
//       case 'ROLE002':
//           setRoleRoute(perawatRoutes);
//           break;
//       default:
//         setRoleRoute(routes);
//         break;
//     }
//   },[sessionSelect]);

//   return (
//     <CContainer className="px-4" lg>
//       <Suspense fallback={<CSpinner color="primary" />}>
//         <Routes>
//           {roleRoute.map((route, idx) => {
//             return (
//               route.element && (
//                 <Route
//                   key={idx}
//                   path={route.path}
//                   exact={route.exact}
//                   name={route.name}
//                   element={<route.element />}
//                 />
//               )
//             )
//           })}
//           <Route path="/" element={<Navigate to="/dashboard" replace />} />
//         </Routes>
//       </Suspense>
//     </CContainer>
//   )
// }

// export default React.memo(AppContent)
