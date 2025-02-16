import React,{useEffect, useState} from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
// import {
//   cilBell,
//   cilCreditCard,
//   cilCommentSquare,
//   cilEnvelopeOpen,
//   cilFile,
//   cilLockLocked,
//   cilSettings,
//   cilTask,
//   cilUser,
//   cilAccountLogout 
// } from '@coreui/icons'
import { cilUser, cilAccountLogout } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import CIcon from '@coreui/icons-react'
import { sessionSelector, sessionAction } from '../../redux/slicer/sessionSlicer'
// import { sessionAction } from '../../redux/slicer/sessionSlicer'
import rolegod from './../../assets/images/GOD.png'
import perawat from './../../assets/images/perawat.png'
import API from '../../service/api'
import { toast,renderLoading } from '../../utils/utils'


const AppHeaderDropdown = () => {
  const sessionData = useSelector(sessionSelector)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [role, setRole] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function getRole () {
    setIsLoading(true)
    API.post('dashboard/regis/getRoleById', {
      roleId: sessionData.ROLE
    })
    .then(result => {
      if (result.data.status) {
        const fetchedData = result.data.data[0]
        setIsLoading(false)
        setRole(fetchedData)
      } else {
        setIsLoading(false)
        toast("error", result.data.message);
      }
    })
    .catch(e => {
      setIsLoading(false)
      toast("error", e.message);
    })
}

useEffect(() => {
  // getRole()
},[])

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
      <CAvatar
          src={
            sessionData.ROLE === 'ROLEGOD'
              ? rolegod
              : perawat
          }
          size='md'
        />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Role Account</CDropdownHeader>
         <CDropdownItem
          style={{ cursor: `pointer` }}
        >
          <CIcon icon={cilUser} className='me-2' />
          {role.ROLE_NM} ({sessionData.ROLE_ID})
        </CDropdownItem>
        {/* <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader> */}
        <CDropdownDivider />
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
