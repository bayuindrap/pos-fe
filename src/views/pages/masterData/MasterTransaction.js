import React, { useState, useEffect, useRef } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CHeaderBrand,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormLabel,
  CFormSelect,
  CImage,
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass, cilCloudDownload } from '@coreui/icons'
import { sessionToken } from "../../../redux/slicer/sessionSlicer";
import { useSelector } from 'react-redux'
import PaginationComponent from '../../../components/PaginationComponent'
import { toast, renderLoading, formatCurrency, formatDateTime } from '../../../utils/utils'
import API from '../../../service/api'
import Swal from "sweetalert2";


const MasterProducts = () => {
  const [sortBy, setSortBy] = useState('');
  const sessionTokens = useSelector(sessionToken);
  const [searchTerm, setSearchTerm] = useState('')
  const [data, setData] = useState([]);
  const [dataDetail, setDataDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [modal, setModal] = React.useState(false);

  
  
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleClick = (item) => {
    const trxId = item.ID_TRANSACTIONS
    setModal(true)
    getTransactionDetail(trxId)
  }

 

  const handleModalClose = () => {
    setModal(false);

  };
 

  const handleDownload = async () => {
    setIsLoading(true);
    const token = sessionTokens;
    if (!token) {
      toast("error", "Token not found");
      setIsLoading(false);
      return;
    }
    
    API.get(`/transaction/download`, {
      params: {
        searchTerm: searchTerm, 
        sortBy: sortBy,
      },
      responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", 'Data Transactions.xlsx');
        document.body.appendChild(link);
        link.click();
        toast("success", "Data downloaded");
        setIsLoading(false);
      })
      .catch((error) => {
        toast("error", error.message);
        setIsLoading(false);
      });
  };
  


  const renderTable = () => (
    <CTable align="middle" className="mb-0 border" hover responsive>
      <CTableHead>
        <CTableRow style={{textAlign: "center"}}>
          <CTableHeaderCell>No</CTableHeaderCell>
          <CTableHeaderCell>Id Transactions</CTableHeaderCell>
          <CTableHeaderCell>Customer Name</CTableHeaderCell>
          <CTableHeaderCell>Total Amount</CTableHeaderCell>
          <CTableHeaderCell>Date</CTableHeaderCell>
          <CTableHeaderCell>Action</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {data.map((item, index) => {
          const actualIndex = (currentPage - 1) * itemsPerPage + index + 1;
          return (
            <CTableRow key={index} style={{textAlign: "center"}}>
              <CTableDataCell>{actualIndex}</CTableDataCell>
              <CTableDataCell>{item.ID_TRANSACTIONS}</CTableDataCell>
              <CTableDataCell>{item.CUST_NAME}</CTableDataCell>
              <CTableDataCell>{formatCurrency(item.TOTAL_AMOUNT)}</CTableDataCell>
              <CTableDataCell>{formatDateTime(item.DATE)}</CTableDataCell>
              <CTableDataCell>
                <CButton
                    color="primary"
                    style={{ borderRadius: 40, width: 75, marginRight: 5 }}
                    onClick={() => handleClick(item)}
                  >
                    Detail
                  </CButton>
            </CTableDataCell>
            </CTableRow>
          );
        })}
      </CTableBody>
    </CTable>
  );

 
  async function getTransactions() {
    const token = sessionTokens;
    if (!token) {
      toast("error", "Token not found");
      setIsLoading(false);
      return;
    }
    
    // const headers = {
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`,
    // };

    setIsLoading(true);

    API.post("/transaction", {
      page: currentPage,
      limit: itemsPerPage,
      searchTerm: searchTerm,
      sortBy: sortBy
    })
      .then((result) => {
        if (result.data.status) {
          const fetchedData = result.data.data;
          setData(fetchedData);
          setTotalItems(result.data.totalItems);
        } else {
          setData([]);
          setTotalItems(0);
          toast("error", result.data.message);
        }
      })
      .catch((error) => {
        toast("error", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }


  async function getTransactionDetail(trxId) {
    const token = sessionTokens
    if (!token) {
      toast("error", "Token not found");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    API.post("/transaction/detail", {
      page: currentPage,
      limit: itemsPerPage,
      trxId: trxId
    })
      .then((result) => {
        if (result.data.status) {
          const fetchedData = result.data.data;
          setDataDetail(fetchedData);
          // setTotalItems(result.data.totalItems);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setDataDetail([])
          // setTotalItems(0)
          toast("error", result.data.message);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast("error", error.message);
      });


  }


  useEffect(() => {
    getTransactions()
  }, [currentPage, itemsPerPage, searchTerm, sortBy])

  return (
    <>
      <CCard className="mb-4" style={{borderRadius: 20}}>
        <CCardHeader>
          <CHeaderBrand>Master Data Transaction</CHeaderBrand>
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-3">
            <CCol sm={12} className="d-flex justify-content-end mb-3">
              <CButton
                color="success"
                type="submit"
                style={{ borderRadius: 40 }}
                onClick={handleDownload}
              >
                Download <CIcon icon={cilCloudDownload} />
              </CButton>
            </CCol>

            <CCol sm={6} className="mb-3">
              <CFormLabel>Sort By</CFormLabel>
              <CFormSelect value={sortBy} onChange={handleSortChange}>
                <option value="">Select</option>
                <option value="amount_asc">Amount Asc</option>
                <option value="amount_desc">Amount Desc</option>
                <option value="date_asc">Date Asc</option>
                <option value="date_desc">Date Desc</option>
             </CFormSelect>
            </CCol>

            <CCol sm={6} className="mb-3">
              <CFormLabel>Find Customer</CFormLabel>
              <CInputGroup>
                <CFormInput
                  type="text"
                  placeholder="Search by customer name"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <CInputGroupText>
                  <CIcon icon={cilMagnifyingGlass} />
                </CInputGroupText>
              </CInputGroup>
            </CCol>
         </CRow>



          {isLoading ? renderLoading() : renderTable()}
           <div className="mt-4">
          <PaginationComponent
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
          </div>
          
        </CCardBody>
      </CCard>
 
      <CModal
        visible={modal}
        onClose={handleModalClose}
        size="xl"
      >
        <CModalHeader closeButton>
          <CModalTitle>Detail Transaction</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead>
            <CTableRow style={{textAlign: "center"}}>
              <CTableHeaderCell>No</CTableHeaderCell>
              <CTableHeaderCell>Id Detail Transactions</CTableHeaderCell>
              <CTableHeaderCell>Product Name</CTableHeaderCell>
              <CTableHeaderCell>Category</CTableHeaderCell>
              <CTableHeaderCell>Price</CTableHeaderCell>
              <CTableHeaderCell>Quantity</CTableHeaderCell>
              <CTableHeaderCell>Customer Name</CTableHeaderCell>
              <CTableHeaderCell>Cashier</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {dataDetail?.map((item, index) => {
              const actualIndex = (currentPage - 1) * itemsPerPage + index + 1;
              return (
                <CTableRow key={index} style={{textAlign: "center"}}>
                  <CTableDataCell>{actualIndex}</CTableDataCell>
                  <CTableDataCell>{item.TRXID}</CTableDataCell>
                  <CTableDataCell>{item.PRODUCT_NAME}</CTableDataCell>
                  <CTableDataCell>{item.CATEGORY_NAME}</CTableDataCell>
                  <CTableDataCell>{formatCurrency(item.PRICE)}</CTableDataCell>
                  <CTableDataCell>{item.QUANTITY}</CTableDataCell>
                  <CTableDataCell>{item.CUST_NAME}</CTableDataCell>
                  <CTableDataCell>{item.NAMA}</CTableDataCell>
                
            </CTableRow>
          );
        })}
      </CTableBody>
    </CTable>
           {isLoading ? renderLoading() : null}
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" style={{borderRadius:20, width: 75}} onClick={handleModalClose}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
   

    </>
  )
}

export default MasterProducts