import React,{useState,useEffect} from 'react'
import { Routes, useLocation } from 'react-router-dom'

import {routes, adminRoutes} from '../routes'
import { useSelector } from "react-redux";
import {sessionSelector} from "../redux/slicer/sessionSlicer"
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const AppBreadcrumb = () => {
  const sessionData = useSelector(sessionSelector);
  const [roleRoute,setRoleRoute] = useState(routes);

  useEffect(()=>{
    console.log("ses", sessionData)
    switch(sessionData.ROLE) {
      case 'ROLEGOD':
          setRoleRoute(adminRoutes);
          break;
      case 'ROLEUSER':
          setRoleRoute(routes);
          break;
      default:
        setRoleRoute(routes);
        break;
    }
  },[sessionData]);

  const currentLocation = useLocation().pathname

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.name : false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, roleRoute)
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="m-0 ms-2">
      <CBreadcrumbItem href="/dashboard">Home</CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            key={index}
          >
            {breadcrumb.name}
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)

