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
  CFormText
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass,cilCloudDownload } from '@coreui/icons'
import { sessionToken } from "../../../redux/slicer/sessionSlicer";
import { useSelector } from 'react-redux'
import PaginationComponent from '../../../components/PaginationComponent'
import { toast, renderLoading, formatCurrency } from '../../../utils/utils'
import API from '../../../service/api'
import Swal from "sweetalert2";
import axios from "axios";
import { CloudinaryContext, Image, Video, Transformation } from 'cloudinary-react';

const MasterProducts = () => {
  const sessionTokens = useSelector(sessionToken);
  const [searchTerm, setSearchTerm] = useState('')
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [modal, setModal] = React.useState(false);
  const [modalEdit, setModalEdit] = React.useState(false);
  const [category, setCategory] = useState([])
  const [selectedCategory, setSelectedCategory] = React.useState(null)
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [imageFile, setImageFile] = useState(null);
  const addName = useRef("")
  const addPrice = useRef("")
  const addStock = useRef("")
  const editName = useRef("")
  const editPrice = useRef("")

  
  
  const handleEdit = (item) => {
    // console.log("cek", item)
    setModalEdit(true)
    setSelectedProduct(item)
    getCategory()
  }

  const handleModalEditClose = () => {
    setModalEdit(false);
    setSelectedProduct(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleClick = () => {
    setModal(true)
    getCategory()
  }

  const handleModalClose = () => {
    setModal(false);
    setSelectedCategory(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };
  

  const handleDownload = async () => {
    setIsLoading(true)
    const token = sessionTokens;
        if (!token) {
          toast("error", "Token not found");
          setIsLoading(false);
          return;
        }
    API.get(`/products/download`, {
      responseType: "blob",
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", 'Data Products.xlsx');
      document.body.appendChild(link);
      link.click();
      toast("success", "Data downloaded");
      setIsLoading(false)
    })
    .catch((error) => {
      toast("error", error.message);
     setIsLoading(false)
    });
  };

  const handleDelete = async (item) => {
    // setSelectLevel(item);
    const idProduct = item.ID_PRODUCTS
    const confirmationResult = await Swal.fire({
      title: `Delete ${item.NAME} data?`,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#blue',
      confirmButtonColor: '#d33',
      reverseButtons: true,
    });
    if (confirmationResult.isConfirmed) {
      setIsLoading(true);
      API.post("products/delete", { idProduct })
        .then((result) => {
          if (result.data.status) {
            setIsLoading(false);
            toast("success", result.data.message);
            getProducts();
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
  };

  async function updateData () {
    // console.log("isiprod", selectedProduct)
    const confirmationResult = await Swal.fire({
      title: `Update data ${selectedProduct.NAME}?`,
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#D49612',
      confirmButtonColor: '#28a745',
      reverseButtons: true,
      style: {
        confirmButton: 'width: 75px',
        cancelButton: 'width: 75px'
      }
    })
    if (confirmationResult.isConfirmed) {
      setIsLoading(true)
      await API
        .post('products/edit', {
          idProduct: selectedProduct.ID_PRODUCTS,
          prodName: editName.current.value,
          prodPrice: editPrice.current.value,
          category: selectedCategory === null ? selectedProduct.ID_CATEGORY : selectedCategory,
        })
        .then(result => {
          //  console.log(result)
          if (result.data.status) {
            getProducts()
            setIsLoading(false)
            setModalEdit(false)
            toast("success", result.data.message);
          } else {
            toast("error", result.data.message);
          }
          setIsLoading(false)
          // setProcess(false);
        })
        .catch(e => {
          setIsLoading(false)
          toast("error", e.message);
        })
    } else if (confirmationResult.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  }


  async function getCategory () {
    setIsLoading(true)
    const token = sessionTokens;
        if (!token) {
          toast("error", "Token not found");
          setIsLoading(false);
          return;
        }
    API.post('products/category', {
    })
    .then(result => {
      if (result.data.status) {
        const fetchedData = result.data.data
        setCategory(fetchedData)
        setIsLoading(false)
      } else {
        setIsLoading(false)
        toast("error", result.data.message);
      }
    })
    .catch(e => {
      toast("error", e.message);
    })
}

  async function getProducts() {
    const token = sessionTokens
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
    API.post("/products", {
      page: currentPage,
      limit: itemsPerPage,
      searchTerm: searchTerm
    }
  )
      .then((result) => {
        if (result.data.status) {
          const fetchedData = result.data.data;
          setData(fetchedData);
          setTotalItems(result.data.totalItems);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setData([])
          setTotalItems(0)
          toast("error", result.data.message);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast("error", error.message);
      });
  }

  async function addProducts () {
    const confirmationResult = await Swal.fire({
      title: `Add product ${addName.current.value}?`,
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#D49612',
      confirmButtonColor: '#28a745',
      reverseButtons: true,
      style: {
        confirmButton: 'width: 75px',
        cancelButton: 'width: 75px'
      }
    })
    if (confirmationResult.isConfirmed) {
      const token = sessionTokens
      if (!token) {
        toast("error", "Token not found");
        setIsLoading(false);
        return;
      }
      // const headers = {
      //   'Content-Type': 'application/json',
      //   'Authorization': `Bearer ${token}`,
      // };
      setIsLoading(true)
      const imageUrl = await uploadToCloudinary(imageFile);
    
    if (!imageUrl) {
      setIsLoading(false);
      return;
    }
      await API
        .post('products/add', {
          prodName : addName.current.value,
          price : addPrice.current.value,
          category : selectedCategory,
          stock : addStock.current.value,
          imageUrl: imageUrl
        }
      )
        .then(result => {   
           console.log(result)
          if (result.data.status) {
            getProducts()
            setIsLoading(false)
            setModal(false)
            toast("success", result.data.message);
            // window.location.reload()
          } else {
            console.log("cekres",result)
            toast("error", result.message);
          }
          setIsLoading(false)
        })
        .catch(e => {
          setIsLoading(false)
          toast("error", e.message);
        })
    } else if (confirmationResult.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  }


  const uploadToCloudinary = async (image) => {
    if (!image) return null;
  
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'POS Apps'); 
  
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dhsskvrzl/image/upload', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
  
      if (result.secure_url) {
        return result.secure_url
      }
  
      throw new Error('Upload failed');
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const renderTable = () => (
    <CTable align="middle" className="mb-0 border" hover responsive>
      <CTableHead>
        <CTableRow style={{textAlign: "center"}}>
          <CTableHeaderCell>No</CTableHeaderCell>
          <CTableHeaderCell>Image</CTableHeaderCell>
          <CTableHeaderCell>Id Products</CTableHeaderCell>
          <CTableHeaderCell>Product Name</CTableHeaderCell>
          <CTableHeaderCell>Category</CTableHeaderCell>
          <CTableHeaderCell>Price</CTableHeaderCell>
          <CTableHeaderCell>Stock</CTableHeaderCell>
          <CTableHeaderCell>Action</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {data.map((item, index) => {
          const actualIndex = (currentPage - 1) * itemsPerPage + index + 1;
          return (
            <CTableRow key={index} style={{textAlign: "center"}}>
              <CTableDataCell>{actualIndex}</CTableDataCell>
              <CTableDataCell>
                 <CImage 
                src={item.IMAGE} 
                alt="Product Image" 
                width={140} 
              />
              </CTableDataCell>
              <CTableDataCell>{item.ID_PRODUCTS}</CTableDataCell>
              <CTableDataCell>{item.NAME}</CTableDataCell>
              <CTableDataCell>{item.CATEGORY}</CTableDataCell>
              <CTableDataCell>{formatCurrency(item.PRICE)}</CTableDataCell>
              <CTableDataCell>{item.STOCK}</CTableDataCell>
              <CTableDataCell>
              <CButton
                  color="warning"
                  style={{ borderRadius: 40, width: 75, marginRight: 5 }}
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </CButton>
              <CButton
                  color="danger"
                  style={{ borderRadius: 40, width: 75, marginRight: 5 }}
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </CButton>
            </CTableDataCell>
            </CTableRow>
          );
        })}
      </CTableBody>
    </CTable>
  );


  


  useEffect(() => {
    getProducts()
  }, [currentPage, itemsPerPage, searchTerm])

  return (
    <>
     <div className="d-flex justify-content-end align-items-center mb-3">
          <CButton
            color="primary"
            style={{ width: 150, height: 50, borderRadius: 15, fontSize: "18px" }}
            onClick={handleClick}
          >
            Add Product
          </CButton>
      </div>
      <CCard className="mb-4" style={{borderRadius: 20}}>
        <CCardHeader>
          <CHeaderBrand>Master Data Products</CHeaderBrand>
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-3">
          <CCol sm={12} className="mb-3 d-flex justify-content-end">
                  <CButton
                    color="success"
                    type="submit"
                    style={{ borderRadius: 40 }}
                    onClick={handleDownload}
                  >
                   Download <CIcon icon={cilCloudDownload}/> 
                  </CButton>
             </CCol>
            <CCol sm={12}>
            <CInputGroup>
                <CFormInput
                  type="text"
                  placeholder="Find Products..."
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
        size="md"
      >
        <CModalHeader closeButton>
          <CModalTitle>Add Product</CModalTitle>
        </CModalHeader>
        <CModalBody>

            <CForm>
              <CFormLabel>Product Name</CFormLabel>
              <CFormInput
      
                ref={addName}
              />
              <CFormSelect
                label="Category"
                onChange={(e) => setSelectedCategory(e.target.value)}
                options={[
                  { label: "Select category", value: "" },
                  ...category.map((cat) => ({
                    label: cat.CATEGORY_NAME,
                    value: cat.ID_CATEGORY,
                  })),
                ]}
              />
               <CFormLabel>Price</CFormLabel>
              <CFormInput
                id="namaPasien"
                ref={addPrice}
              />
               <CFormLabel>Stock</CFormLabel>
             <CFormInput
                id="namaPasien"
                ref={addStock}
              />
            </CForm>
            <CFormLabel>Product Image</CFormLabel>
            <CFormInput
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />
           {isLoading ? renderLoading() : null}
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" style={{borderRadius:20, width: 75}} onClick={handleModalClose}>
            Cancel
          </CButton>
          <CButton color="success" style={{borderRadius:20, width: 75}} onClick={addProducts}>Add</CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={modalEdit}
        onClose={handleModalEditClose}
        size="md"
      >
        <CModalHeader closeButton>
          <CModalTitle>Edit Product</CModalTitle>
        </CModalHeader>
        <CModalBody>
                {selectedProduct && (
                   <CForm>
                   <CFormLabel>Product Name</CFormLabel>
                   <CFormInput
                     type="text"
                     defaultValue={selectedProduct.NAME}
                     ref={editName}
                   />
                   <CFormLabel>Price</CFormLabel>
                   <CFormInput
                     type="number"
                     defaultValue={selectedProduct.PRICE}
                     onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 14);
                    }}
                     ref={editPrice}
                   />
                   <CFormSelect
                    label="Category"
                    defaultValue={selectedProduct.CATEGORY}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    options={[
                      { label: "Select category", value: "" },
                      ...category.map((cat) => ({
                        label: cat.CATEGORY_NAME,
                        value: cat.ID_CATEGORY,
                      })),
                    ]}
                  />
                 </CForm>
                )}
                {isLoading ? renderLoading() : null}
              </CModalBody>
        <CModalFooter>
          <CButton color="danger" style={{borderRadius:20, width: 75}} onClick={handleModalEditClose}>
            Cancel
          </CButton>
          <CButton color="success" style={{borderRadius:20, width: 75}} onClick={updateData}>Save</CButton>
        </CModalFooter>
      </CModal>
   

    </>
  )
}

export default MasterProducts