

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { sessionAction, sessionSelector } from "../../../redux/slicer/sessionSlicer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import API from '../../../service/api'
import logo from '../../../assets/images/agc.png';
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CImage,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilLockUnlocked } from '@coreui/icons'
import loadgif from '../../../assets/images/loading.gif'
import { toast } from "../../../utils/utils";


const Login = () => {

  const history = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [process, setProcess] = useState(false);
  const sessionData = useSelector(sessionSelector);
  const [togglePassword, setTogglePassword] = useState(false);

  const togglePasswords = () => {
    setTogglePassword(!togglePassword);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    if (!process) {
      setProcess(true);
      try {
        var params = { 'username': userName, 'pass': password };
        const result = await API.post('login', params);
        if (result.data.status) {
          dispatch(sessionAction.addSession({
            data: result.data.data,
            token: result.data.token,
            refreshToken: result.data.refreshToken
          }));
          setTimeout(() => {
            history("/dashboard");
            setUsername('');
            setPassword('');
          }, 2000);
        } else {
          toast("error", result.data.message);
          setProcess(false)
        }
      } catch (error) {
        toast("error", error.message);
      } finally {
        setTimeout(() => {
          setProcess(false);
        }, 2400);
      }
    }
  };

  useEffect(()=>{
		if(sessionData){
			if(Object.keys(sessionData).length > 1){
				// console.log(Object.keys(sessionData).length);
				// history("/dashboard");
				setTimeout(() => {
					history("/dashboard");
				  }, 2400); 
			}
		}
			
		// setProcess(false);
		setTimeout(() => {
			setProcess(false);
		  }, 2400);
	},[sessionData]);

  return (

    <div className="min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            {process ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                 <CImage src={loadgif} width={175} height={175} />
                <h4>Logging in...</h4>
              </div>
            ) : (

              <form style={{ backgroundColor: "transparent" }}
                onSubmit={(e) => {
                  loginHandler(e)
                }}
              >
                
                <CContainer style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <CImage src={logo} width={220} style={{ marginBottom: 20 }} />

                </CContainer>

                <h3 style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 50
                }}>Point of Sales Apps</h3>

                <CInputGroup className="mb-3">
                  <CFormInput maxLength={30} placeholder="Username" value={userName} autoComplete="username" onChange={(e) => setUsername(e.target.value)} />
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CFormInput
                    maxLength={30}
                    type={togglePassword ? "text" : "password"}
                    placeholder="Password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }} required
                  />
                  <CInputGroupText>
                    <CIcon icon={togglePassword ? cilLockUnlocked : cilLockLocked} onClick={togglePasswords} />
                  </CInputGroupText>
                </CInputGroup>
                <CRow>
                  <CCol xl={12}>
                    <div className="d-flex">
                      <CButton
                        type="submit"
                        color="info"
                        style={{ color: 'white', borderRadius: '50px', width: "100%" }}
                        className="px-4"
                      >
                        Login
                      </CButton>
                    </div>
                  </CCol>
                </CRow>
              </form>
            )}
          </CCol>
        </CRow>
      </CContainer>

      <script src="js/jquery.min.js"></script>
      <script src="js/popper.js"></script>
      <script src="js/bootstrap.min.js"></script>
      <script src="js/main.js"></script>

    </div>
  )
}

export default Login