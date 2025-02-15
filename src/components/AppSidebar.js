
import React,{useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
  CImage
} from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import logo from '../assets/images/logo1.png'
import Navigation from '../_nav'
import { stateAction } from '../redux/slicer/stateSlicer'


const AppSidebar = () => {
  const [fold,setFold] = useState(false);
  const [sideBar,setSideBar] = useState(false);
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) =>state.stateSlice.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.stateSlice.sidebarShow );
  
  const navItems = Navigation()

  useEffect(()=>{
		setFold(unfoldable);
    setSideBar(sidebarShow);
    
	},[unfoldable,sidebarShow]);

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={fold}
      visible={sideBar}
      onVisibleChange={(visible) => {
        dispatch(
          stateAction.changeState({
            type:'setSideBarShow',
            sidebarShow:visible
          }));
       
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <CImage fluid src={logo} width={80} height={80}/>
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navItems} />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
