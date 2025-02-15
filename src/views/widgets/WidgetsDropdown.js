import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
  CButton,
  CLink
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { cilArrowBottom, cilArrowTop, cilOptions, cilGrain } from '@coreui/icons'
import CIcon from "@coreui/icons-react";
import { renderLoading, toast } from '../../utils/utils';
import API from '../../service/api'
import { render } from '@testing-library/react';


const WidgetsDropdown = (props) => {
  const navigate = useNavigate();
  const [indicator, setIndicator] = useState([])
  const [totalPatient, setTotalPatient] = useState("")
  const [totalKeluhan, setTotalKeluhan] = useState("")
  const [totalVisit, setTotalVisit] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function countIndicator() {
    setIsLoading(true);
    API.post("/dashboard/home/indicator", {
    })
      .then((result) => {
        // console.log("dataperawat", result.data)
        if (result.data.status) {
          setIndicator(result.data.data)
          setTotalKeluhan(result.data.totalComplaint)
          setTotalVisit(result.data.totalVisit)
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast("error", result.data.message);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast("error", error.message);
      });
  }

  async function countPatient() {
    setIsLoading(true);
    API.post("/dashboard/obat/count", {
    })
      .then((result) => {
        if (result.data.status) {
          // setTotalItems(result.data.totalMedicine);
          setTotalPatient(result.data.totalPatients)
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast("error", result.data.message);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast("error", error.message);
      });
  }


  useEffect(() => {
    countIndicator()
    countPatient()
  }, [])

  const handleWidgetClick = (widgetName) => {
    if (widgetName === 'Normal') {
      navigate('/dataPasien');
    }
  };

  const getCountForIndicator = (indicatorValue) => {
    const item = indicator.find(item => item.INDICATOR === indicatorValue);
    return item ? item.count : 0;
  };

  const getTotalCountForIndicators = (...indicatorValues) => {
    return indicatorValues.reduce((total, value) => {
      return total + getCountForIndicator(value);
    }, 0);
  };
  
  const totalUrgent = getTotalCountForIndicators(1, 3);

  const handleClick = (value) => {
    navigate(`/pasienBaik/${value}`);
  };

  const countUrgent = () => {
    const res = getCountForIndicator(1) + getCountForIndicator(3)
    return res
  }

  return (
    <CCol> 
      {isLoading ? (
        // renderLoading()
        <div></div>
      ) : (
        <>
        <CRow className={props.className} xs={{ gutter: 4 }}>
          <CCol sm={6} xl={4} xxl={3}>
            <CButton
                color="secondary"
                style={{
                  width: '254px',
                  height: '122px',
                  borderRadius: '15px',
                  border: '1px solid #d8dbe0',
                  boxShadow: '0 2px 6px 0 rgba(0,0,0,.1)',
                  // display: 'flex',
                  alignItems: 'center',
                  padding: '0 15px',
                }}
              >
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <CIcon icon={cilGrain} size="xxl" />
                  </div>
                  <div>
                    <div style={{ fontSize: '18px', lineHeight: '1', textAlign: 'left' }}>Jumlah Pasien</div>
                    <div style={{ fontWeight: 'bold', fontSize: '27px', lineHeight: '1.2', textAlign: 'left' }}>{totalPatient}</div>
                  </div>
                </div>
              </CButton>
          </CCol>
          <CCol sm={6} xl={4} xxl={3}>         
            <CButton
            color="secondary"
            style={{
              width: '254px',
              height: '122px',
              borderRadius: '15px',
              border: '1px solid #d8dbe0',
              boxShadow: '0 2px 6px 0 rgba(0,0,0,.1)',
              // display: 'flex',
              alignItems: 'center',
              padding: '0 15px',
            }}
          >
            <div className="d-flex align-items-center">
              <div className="me-3">
                <CIcon icon={cilGrain} size="xxl" />
              </div>
              <div>
                <div style={{ fontSize: '18px', lineHeight: '1', textAlign: 'left' }}>Kunjungan Dokter</div>
                <div style={{ fontWeight: 'bold', fontSize: '27px', lineHeight: '1.2', textAlign: 'left' }}>{totalVisit}</div>
              </div>
            </div>
          </CButton>
          </CCol>
          <CCol sm={6} xl={4} xxl={3}>
          <CButton
                color="secondary"
                style={{
                  width: '254px',
                  height: '122px',
                  borderRadius: '15px',
                  border: '1px solid #d8dbe0',
                  boxShadow: '0 2px 6px 0 rgba(0,0,0,.1)',
                  // display: 'flex',
                  alignItems: 'center',
                  padding: '0 15px',
                }}
              >
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <CIcon icon={cilGrain} size="xxl" />
                  </div>
                  <div>
                    <div style={{ fontSize: '18px', lineHeight: '1', textAlign: 'left' }}>Segera ke Dokter</div>
                    <div style={{ fontWeight: 'bold', fontSize: '27px', lineHeight: '1.2', textAlign: 'left' }}>{totalUrgent}</div>
                  </div>
                </div>
              </CButton>
          </CCol>
          <CCol sm={6} xl={4} xxl={3}>
          <CButton
                color="secondary"
                style={{
                  width: '254px',
                  height: '122px',
                  borderRadius: '15px',
                  border: '1px solid #d8dbe0',
                  boxShadow: '0 2px 6px 0 rgba(0,0,0,.1)',
                  // display: 'flex',
                  alignItems: 'center',
                  padding: '0 15px',
                }}
              >
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <CIcon icon={cilGrain} size="xxl" />
                  </div>
                  <div>
                    <div style={{ fontSize: '18px', lineHeight: '1', textAlign: 'left' }}>Jumlah Keluhan</div>
                    <div style={{ fontWeight: 'bold', fontSize: '27px', lineHeight: '1.2', textAlign: 'left' }}>{totalKeluhan}</div>
                  </div>
                </div>
              </CButton>
          </CCol>
        
        </CRow>
        <CRow className={props.className} xs={{ gutter: 4 }}>
          <CCol style={{marginBottom: -20}} sm={12} className="d-flex justify-content-start">
              <h4>Hasil Data Pasien</h4>
          </CCol>
          <CCol sm={6} xl={4} xxl={4}>
            <CButton
                color="success"
                style={{
                  width: '370px',
                  height: '122px',
                  borderRadius: '15px',
                  border: '1px solid #d8dbe0',
                  boxShadow: '0 2px 6px 0 rgba(0,0,0,.1)',
                  // display: 'flex',
                  alignItems: 'center',
                  padding: '0 15px',
                }}
                onClick={() => handleClick(2)}
              >
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <CIcon icon={cilGrain} size="xxl" />
                  </div>
                  <div>
                    <div style={{ fontSize: '18px', lineHeight: '1', textAlign: 'left' }}>Baik</div>
                    <div style={{ fontWeight: 'bold', fontSize: '27px', lineHeight: '1.2', textAlign: 'left' }}>{getCountForIndicator(2)}</div>
                  </div>
                </div>
              </CButton>
          </CCol>
          <CCol sm={6} xl={4} xxl={4}>
            <CButton
                color="warning"
                style={{
                  width: '370px',
                  height: '122px',
                  borderRadius: '15px',
                  border: '1px solid #d8dbe0',
                  boxShadow: '0 2px 6px 0 rgba(0,0,0,.1)',
                  // display: 'flex',
                  alignItems: 'center',
                  padding: '0 15px',
                }}
                onClick={() => handleClick(1)}
              >
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <CIcon icon={cilGrain} size="xxl" />
                  </div>
                  <div>
                    <div style={{ fontSize: '18px', lineHeight: '1', textAlign: 'left' }}>Kurang Baik</div>
                    <div style={{ fontWeight: 'bold', fontSize: '27px', lineHeight: '1.2', textAlign: 'left' }}>{getCountForIndicator(1)}</div>
                  </div>
                </div>
              </CButton>
          </CCol>
          <CCol sm={6} xl={4} xxl={4}>
            <CButton
                color="danger"
                style={{
                  width: '370px',
                  height: '122px',
                  borderRadius: '15px',
                  border: '1px solid #d8dbe0',
                  boxShadow: '0 2px 6px 0 rgba(0,0,0,.1)',
                  // display: 'flex',
                  alignItems: 'center',
                  padding: '0 15px',
                }}
                onClick={() => handleClick(3)}
              >
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <CIcon icon={cilGrain} size="xxl" />
                  </div>
                  <div>
                    <div style={{ fontSize: '18px', lineHeight: '1', textAlign: 'left' }}>Buruk</div>
                    <div style={{ fontWeight: 'bold', fontSize: '27px', lineHeight: '1.2', textAlign: 'left' }}>{getCountForIndicator(3)}</div>
                  </div>
                </div>
              </CButton>
          </CCol>
        </CRow>
        </>
      )} 
    </CCol>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
