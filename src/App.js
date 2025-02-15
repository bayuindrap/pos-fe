import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css';
import PrivateRoutes from './middleware/auth'
import { renderLoading } from './utils/utils'



const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))


const Login = React.lazy(() => import('./views/pages/login/Login'))
const Dashboard = React.lazy(() => import('./views/pages/page/asd'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, [])

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            {/* <CSpinner color="primary" variant="grow" /> */}
            {renderLoading()}
          </div>
        }
      >
        <Routes >
          <Route element={<PrivateRoutes/>}>
              <Route path="*" name="Home" element={<DefaultLayout />} />
          </Route>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/dashboard" name="Login Page" element={<Dashboard />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          {/* <Route exact path="/404" name="Page 404" element={<Page404 />} /> */}
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
