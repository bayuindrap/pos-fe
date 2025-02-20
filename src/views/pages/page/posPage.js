import React, { useState, useEffect, useRef } from "react";
import { 
    CContainer,
     CRow, 
     CCol, 
     CCard, 
     CCardHeader, 
     CCardBody, 
     CFormInput,
     CFormSelect, 
     CButton, 
     CTable, 
     CTableHead, 
     CTableRow, 
     CTableHeaderCell,
     CTableBody, 
     CTableDataCell,
     CModal,
     CModalBody,
     CModalFooter,
     CModalHeader,
     CModalTitle,
     CImage,
     CInputGroup,
     CInputGroupText,
    
     } from '@coreui/react';
import { renderLoading, toast, formatCurrency } from '../../../utils/utils';
import { cilMagnifyingGlass, cilGrain, cilCloudDownload } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { sessionSelector, sessionToken } from "../../../redux/slicer/sessionSlicer";
import API from '../../../service/api'
import Swal from "sweetalert2";
import PaginationComponent from "../../../components/PaginationComponent";
import { Modal } from "bootstrap";




// const SalesPage = () => {
//     const navigate = useNavigate()
//     const sessionData = useSelector(sessionSelector);
//     const sessionTokens = useSelector(sessionToken);
//     const [data, setData] = useState([]);
//     const [dataProducts, setDataProducts] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [modal, setModal] = React.useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(5);
//     const [searchTerm, setSearchTerm] = useState('')
//     const [totalItems, setTotalItems] = useState(0);
//     const [quantity, setQuantity] = useState(1);
//     const [selectedProduct, setSelectedProduct] = useState(null); 


//     const custName = useRef("")

//     const handleSearch = (event) => {
//         setSearchTerm(event.target.value)
//       }

//     const handleClick = () => {
//         setModal(true)
//         getProducts()
//       }

//     const handleModalClose = () => {
//         setModal(false);
//         setQuantity(1); 
//         setSelectedProduct(null); 
//       }
//       const handleAddToCart = () => {
//         if (!selectedProduct) {
//           toast("error", "Please select a product.");
//           return;
//         }
//         if (quantity <= 0) {
//           toast("error", "Quantity must be greater than zero.");
//           return;
//         }
    
//         // Tambahkan produk ke keranjang atau tabel
//         toast.success(`${selectedProduct.NAME} has been added with quantity: ${quantity}`);
//         setModal(false);
//         // Reset quantity
//         setQuantity(1);
//       };

//       async function getProducts() {
//         const token = sessionTokens
//         if (!token) {
//           toast("error", "Token not found");
//           setIsLoading(false);
//           return;
//         }
//         const headers = {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         };
//         setIsLoading(true);
//         API.post("/products", {
//             page: currentPage,
//             limit: itemsPerPage,
//             searchTerm: searchTerm
//         },
//         {headers}
//       )
//           .then((result) => {
//             if (result.data.status) {
//               const fetchedData = result.data.data;
//               setDataProducts(fetchedData);
//               setTotalItems(result.data.totalItems);
//               setIsLoading(false);
//             } else {
//               setIsLoading(false);
//               setDataProducts([])
//               setTotalItems(0)
//               toast("error", result.data.message);
//             }
//           })
//           .catch((error) => {
//             setIsLoading(false);
//             toast("error", error.message);
//           });
//       }

//       useEffect(() => {
//         if (modal) {
//             getProducts();
//           }
//       }, [currentPage, itemsPerPage, searchTerm, modal])

//   return (
//     <CContainer fluid>
//       <CRow>
//         <CCol>
//           <CCard>
//             <CCardHeader>
//               <strong>Sales</strong>
//             </CCardHeader>
//             <CCardBody>
//               <CRow className="mb-3 shadow-lg p-3 bg-body rounded">
//                 <CCol md={4}>
//                   <CFormInput type="date" id="date" label="Date" defaultValue="2019-02-09" />
//                 </CCol>
//                 <CCol md={4}>
//                   <CFormInput type="text" id="cashier" label="Cashier" value={sessionData[0].NAMA} disabled />
//                 </CCol>
//                 <CCol md={4}>
//                   <CFormInput type="text" id="customer" label="Customer" />
//                 </CCol>
//               </CRow>
//               <CRow  className="mb-3 shadow-lg p-3 bg-body rounded">
//                 {/* <CCol md={3}>
//                   <CFormInput type="number" id="quantity" label="Qty" placeholder="Quantity" />
//                 </CCol> */}
                
//                 <CCol md={6}>
//                   <CButton color="primary" onClick={handleClick}>Find Product</CButton>
//                 </CCol>
//               </CRow>

//               <CTable striped hover responsive>
//                 <CTableHead>
//                   <CTableRow>
//                     <CTableHeaderCell>Id Product</CTableHeaderCell>
//                     <CTableHeaderCell>Product Item</CTableHeaderCell>
//                     <CTableHeaderCell>Price</CTableHeaderCell>
//                     <CTableHeaderCell>Qty</CTableHeaderCell>
//                     <CTableHeaderCell>Total</CTableHeaderCell>
//                     <CTableHeaderCell>Actions</CTableHeaderCell>
//                   </CTableRow>
//                 </CTableHead>
//                 <CTableBody>
//                   <CTableRow>
//                     <CTableDataCell colSpan="7" className="text-center">Tidak ada item</CTableDataCell>
//                   </CTableRow>
//                 </CTableBody>
//               </CTable>

//               <CRow className="mt-3">
//                 <CCol md={6}>
//                   <CFormInput type="text" id="note" label="Note" placeholder="Add note" />
//                 </CCol>
//                 <CCol md={3}>
//                   <CFormInput type="number" id="discount" label="Discount" placeholder="Discount" />
//                 </CCol>
//                 <CCol md={3}>
//                   <CFormInput type="number" id="cash" label="Cash" placeholder="Cash" />
//                 </CCol>
//               </CRow>

//               <CRow className="mt-3">
//                 <CCol md={6}>
//                   <CButton color="danger">Cancel</CButton>
//                 </CCol>
//                 <CCol md={6} className="text-end">
//                   <CButton color="success">Process Payment</CButton>
//                 </CCol>
//               </CRow>
//             </CCardBody>
//           </CCard>
//           <CModal visible={modal} onClose={handleModalClose} size="lg">
//             <CModalHeader closeButton>
//               <CModalTitle>Product List</CModalTitle>
//             </CModalHeader>
//             <CModalBody>
//               <CInputGroup className="mb-3">
//                 <CFormInput
//                   type="text"
//                   placeholder="Find Products..."
//                   onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state
//                 />
//                 <CInputGroupText>
//                   <CIcon icon={cilMagnifyingGlass} />
//                 </CInputGroupText>
//               </CInputGroup>

//               <CTable striped hover responsive>
//                 <CTableHead>
//                   <CTableRow style={{ textAlign: "center" }}>
//                     <CTableHeaderCell>Image</CTableHeaderCell>
//                     <CTableHeaderCell>Product Name</CTableHeaderCell>
//                     <CTableHeaderCell>Stock</CTableHeaderCell>
//                     <CTableHeaderCell>Qty</CTableHeaderCell>
//                   </CTableRow>
//                 </CTableHead>
//                 <CTableBody>
//                   {dataProducts.map((item, index) => {
//                     return (
//                       <CTableRow
//                         key={index}
//                         style={{ textAlign: "center" }}
//                         onClick={() => setSelectedProduct(item)} 
//                       >
//                         <CTableDataCell>
//                           <CImage src={item.IMAGE} alt="Product Image" width={60} />
//                         </CTableDataCell>
//                         <CTableDataCell>{item.NAME}</CTableDataCell>
//                         <CTableDataCell>{item.STOCK}</CTableDataCell>
//                         <CTableDataCell>
                        
//                             <CFormInput
//                                 type="number"
                               
//                                 value={quantity}
//                                 onChange={(e) => setQuantity(Number(e.target.value))}
                                
//                             />
                           
//                         </CTableDataCell>
//                       </CTableRow>
//                     );
//                   })}
//                 </CTableBody>
//               </CTable>

//               {isLoading && <div>Loading...</div>}

//               <div className="mt-4">
//                 <PaginationComponent
//                   currentPage={currentPage}
//                   totalItems={totalItems}
//                   itemsPerPage={itemsPerPage}
//                   onPageChange={setCurrentPage} // Update currentPage state
//                 />
//               </div>
//             </CModalBody>
//             <CModalFooter>
//               <CButton color="danger" style={{ borderRadius: 20, width: 75 }} onClick={handleModalClose}>Cancel</CButton>
//               <CButton color="success" style={{ borderRadius: 20, width: 75 }} onClick={handleAddToCart}>Add</CButton>
//             </CModalFooter>
//           </CModal>
//         </CCol>
//       </CRow>
//     </CContainer>
//   );
// };

const SalesPage = () => {
    const navigate = useNavigate();
    const sessionData = useSelector(sessionSelector);
    const sessionTokens = useSelector(sessionToken);
    const [data, setData] = useState([]);
    const [dataProducts, setDataProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalItems, setTotalItems] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantities, setQuantities] = useState({}); // Store quantities for each product
    const [cart, setCart] = useState([]); // Store added products to the cart

    // Handle search input
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Open modal to search products
    const handleClick = () => {
        setModal(true);
        getProducts();
    };

    // Close modal
    const handleModalClose = () => {
        setModal(false);
        // setSelectedProduct(null);
    };

    // Handle quantity change for each product
    const handleQuantityChange = (productId, quantity) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: quantity,
        }));
    };

    // Handle product selection in the modal
    // const handleProductSelect = (product) => {
    //     setSelectedProduct(product);
    //     setQuantities({ ...quantities, [product.ID]: 1 }); // Default quantity to 1
    //     setModal(false);
    // };

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setModal(false);  // Close the modal when a product is selected
    };

    // Add selected product to the cart (main table)
    const handleAddToCart = () => {
        if (!selectedProduct) {
            toast("error", "Please select a product.");
            return;
        }
        const quantity = quantities[selectedProduct.ID] || 0;
        if (quantity <= 0) {
            toast("error", "Quantity must be greater than zero.");
            return;
        }

        // Add the selected product with its quantity to the cart
        const updatedCart = [...cart, { ...selectedProduct, quantity }];
        setCart(updatedCart); // Update the cart with new product
        toast("success",`${selectedProduct.NAME} has been added with quantity: ${quantity}`);

        setSelectedProduct(null); // Reset selected product after adding to cart
        setQuantities({}); // Reset quantities
    };

    // Fetch products from the API
    async function getProducts() {
        const token = sessionTokens;
        if (!token) {
            toast("error", "Token not found");
            setIsLoading(false);
            return;
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };
        setIsLoading(true);
        API.post("/products", {
            page: currentPage,
            limit: itemsPerPage,
            searchTerm: searchTerm,
        }, { headers })
            .then((result) => {
                if (result.data.status) {
                    const fetchedData = result.data.data;
                    setDataProducts(fetchedData);
                    setTotalItems(result.data.totalItems);
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                    setDataProducts([]);
                    setTotalItems(0);
                    toast("error", result.data.message);
                }
            })
            .catch((error) => {
                setIsLoading(false);
                toast("error", error.message);
            });
    }

    useEffect(() => {
        if (modal) {
            getProducts();
        }
    }, [currentPage, itemsPerPage, searchTerm, modal]);

    return (
        <CContainer fluid>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <strong>Sales</strong>
                        </CCardHeader>
                        <CCardBody>
                            {/* Sales Form */}
                            <CRow className="mb-3 shadow-lg p-3 bg-body rounded">
                                <CCol md={4}>
                                    <CFormInput type="date" id="date" label="Date" defaultValue="2019-02-09" />
                                </CCol>
                                <CCol md={4}>
                                    <CFormInput type="text" id="cashier" label="Cashier" value={sessionData[0].NAMA} disabled />
                                </CCol>
                                <CCol md={4}>
                                    <CFormInput type="text" id="customer" label="Customer" />
                                </CCol>
                            </CRow>

                            <CRow className="mb-3 shadow-lg p-3 bg-body rounded">
                                <CCol md={4}>
                                    <CFormInput
                                        type="text"
                                        id="Products"
                                        label="Products"
                                        value={selectedProduct ? selectedProduct.NAME : ''}
                                        onClick={handleClick}
                                    />
                                </CCol>
                                <CCol md={4}>
                                    <CFormInput
                                        type="number"
                                        id="qty"
                                        label="Qty"
                                        value={quantities[selectedProduct?.ID] || 1}
                                        onChange={(e) => handleQuantityChange(selectedProduct?.ID, e.target.value)}
                                    />
                                </CCol>
                                <CCol md={4} className="d-flex align-items-end">
                                    <CButton color="primary" onClick={handleAddToCart} className="w-100">
                                        Add
                                    </CButton>
                                </CCol>
                            </CRow>

                            {/* Product Table */}
                            <CTable striped hover responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell>Id Product</CTableHeaderCell>
                                        <CTableHeaderCell>Product Item</CTableHeaderCell>
                                        <CTableHeaderCell>Price</CTableHeaderCell>
                                        <CTableHeaderCell>Qty</CTableHeaderCell>
                                        <CTableHeaderCell>Total</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {cart.length > 0 ? (
                                        cart.map((item, index) => (
                                            <CTableRow key={index}>
                                                <CTableDataCell>{item.ID_PRODUCTS}</CTableDataCell>
                                                <CTableDataCell>{item.NAME}</CTableDataCell>
                                                <CTableDataCell>{formatCurrency(item.PRICE)}</CTableDataCell>
                                                <CTableDataCell>{item.quantity}</CTableDataCell>
                                                <CTableDataCell>{formatCurrency(item.PRICE * item.quantity)}</CTableDataCell>
                                            </CTableRow>
                                        ))
                                    ) : (
                                        <CTableRow>
                                            <CTableDataCell colSpan="5" className="text-center">No products in cart</CTableDataCell>
                                        </CTableRow>
                                    )}
                                </CTableBody>
                            </CTable>

                            {/* Totals Section */}
                            <CRow className="mt-3">
                                <CCol md={6}>
                                    <CFormInput type="text" label="Note" placeholder="Add note" />
                                </CCol>
                                <CCol md={3}>
                                    <CFormInput type="number" label="Discount" placeholder="Discount" />
                                </CCol>
                                <CCol md={3}>
                                    <CFormInput type="number" label="Cash" placeholder="Cash" />
                                </CCol>
                            </CRow>

                            <CRow className="mt-3">
                                <CCol md={6}>
                                    <CButton color="danger">Cancel</CButton>
                                </CCol>
                                <CCol md={6} className="text-end">
                                    <CButton color="success">Process Payment</CButton>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>

                    {/* Modal for Product List */}
                    <CModal visible={modal} onClose={handleModalClose} size="lg">
                        <CModalHeader closeButton>
                            <CModalTitle>Product List</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <CInputGroup className="mb-3">
                                <CFormInput
                                    type="text"
                                    placeholder="Find Products..."
                                    onChange={handleSearch}
                                />
                                <CInputGroupText>
                                    <CIcon icon={cilMagnifyingGlass} />
                                </CInputGroupText>
                            </CInputGroup>

                            <CTable striped hover responsive>
                                <CTableHead>
                                    <CTableRow style={{ textAlign: "center" }}>
                                        <CTableHeaderCell>Image</CTableHeaderCell>
                                        <CTableHeaderCell>Product Name</CTableHeaderCell>
                                        <CTableHeaderCell>Stock</CTableHeaderCell>
                                        <CTableHeaderCell>Actions</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {dataProducts.map((item, index) => (
                                        <CTableRow
                                            key={index}
                                            style={{ textAlign: "center" }}
                                            onClick={() => handleProductSelect(item)}
                                        >
                                            <CTableDataCell>
                                                <CImage src={item.IMAGE} alt="Product Image" width={60} />
                                            </CTableDataCell>
                                            <CTableDataCell>{item.NAME}</CTableDataCell>
                                            <CTableDataCell>{item.STOCK}</CTableDataCell>
                                            <CTableDataCell>
                                                <CButton color="success" onClick={() => handleProductSelect(item)}>Select</CButton>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>

                            {isLoading && <div>Loading...</div>}

                            <div className="mt-4">
                                <PaginationComponent
                                    currentPage={currentPage}
                                    totalItems={totalItems}
                                    itemsPerPage={itemsPerPage}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="danger" onClick={handleModalClose}>Cancel</CButton>
                        </CModalFooter>
                    </CModal>
                </CCol>
            </CRow>
        </CContainer>
    );
};





export default SalesPage;