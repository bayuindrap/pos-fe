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
import { cilMagnifyingGlass, cilDollar, cilTrash, cilPlus, cilColorBorder, cilCart } from '@coreui/icons'
import { CIcon } from '@coreui/icons-react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { sessionSelector, sessionToken } from "../../../redux/slicer/sessionSlicer";
import API from '../../../service/api'
import Swal from "sweetalert2";
import PaginationComponent from "../../../components/PaginationComponent";
import { Modal } from "bootstrap";


// const SalesPage = () => {
//     const navigate = useNavigate();
//     const sessionData = useSelector(sessionSelector);
//     const sessionTokens = useSelector(sessionToken);
//     const [data, setData] = useState([]);
//     const [dataProducts, setDataProducts] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [modal, setModal] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(5);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [totalItems, setTotalItems] = useState(0);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [quantities, setQuantities] = useState({}); // Store quantities for each product
//     const [cart, setCart] = useState([]); // Store added products to the cart
//     const [hoverDelete, setHoverDelete] = useState(false); // Hover untuk ikon hapus
//     const [hoverEdit, setHoverEdit] = useState(false); // Hover untuk ikon edit
//     const [modalVisible, setModalVisible] = useState(false); // State untuk kontrol modal edit
//     const [newQuantity, setNewQuantity] = useState(""); // Quantity baru 

//     const handleSearch = (event) => {
//         setSearchTerm(event.target.value);
//     };

   
//     const handleClick = () => {
//         setModal(true);
//         getProducts();
//     };

//     // Close modal
//     const handleModalClose = () => {
//         setModal(false);
//         // setSelectedProduct(null);
//     };

// const handleQuantityChange = (productId, quantity) => {
//     // Parse the input to ensure it's a valid number
//     const parsedQuantity = parseInt(quantity, 10);

//     // If parsedQuantity is NaN or less than 1, reset the quantity to 0 and show error
//     if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
//         setQuantities((prevQuantities) => ({
//             ...prevQuantities,
//             [productId]: '',
//         }));
//     } else {
//         setQuantities((prevQuantities) => ({
//             ...prevQuantities,
//             [productId]: parsedQuantity,
//         }));
//     }
// };


    
//     const handleProductSelect = (product) => {
//         setSelectedProduct(product);
//         setModal(false);  // Close the modal when a product is selected
//     };


//     const handleAddToCart = () => {
//         if (!selectedProduct) {
//             toast("error", "Please select a product.");
//             return;
//         }
    
//         const quantity = quantities[selectedProduct.ID] || 0;
    
//         if (quantity <= 0 || isNaN(quantity)) {
//             toast("error", "Quantity must be greater than zero.");
//             return;
//         }
    
//         // Add the selected product with its quantity to the cart
//         const updatedCart = [...cart, { ...selectedProduct, quantity }];
//         setCart(updatedCart); // Update the cart with new product
//         toast("success", `${selectedProduct.NAME} has been added with quantity: ${quantity}`);
    
//         setSelectedProduct(null); // Reset selected product after adding to cart
//         setQuantities({}); // Reset quantities
//     };
//     // Fetch products from the API
//     async function getProducts() {
//         const token = sessionTokens;
//         if (!token) {
//             toast("error", "Token not found");
//             setIsLoading(false);
//             return;
//         }
//         const headers = {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//         };
//         setIsLoading(true);
//         API.post("/products", {
//             page: currentPage,
//             limit: itemsPerPage,
//             searchTerm: searchTerm,
//         }, { headers })
//             .then((result) => {
//                 if (result.data.status) {
//                     const fetchedData = result.data.data;
//                     setDataProducts(fetchedData);
//                     setTotalItems(result.data.totalItems);
//                     setIsLoading(false);
//                 } else {
//                     setIsLoading(false);
//                     setDataProducts([]);
//                     setTotalItems(0);
//                     toast("error", result.data.message);
//                 }
//             })
//             .catch((error) => {
//                 setIsLoading(false);
//                 toast("error", error.message);
//             });
//     }
//       const handleRemoveFromCart = async (productId) => {
//         // Menampilkan SweetAlert2 untuk konfirmasi
//         const productToRemove = cart.find(item => item.ID_PRODUCTS === productId);
//         const confirmationResult = await Swal.fire({
//             title: `Remove ${productToRemove.NAME}?`,
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonText: 'Remove',
//             cancelButtonText: 'Cancel',
//             cancelButtonColor: '#D49612',
//             confirmButtonColor: '#ff0000',
//             reverseButtons: true,
//             style: {
//                 confirmButton: 'width: 75px',
//                 cancelButton: 'width: 75px'
//             }
//         });
    
//         // Jika pengguna mengonfirmasi penghapusan
//         if (confirmationResult.isConfirmed) {
//             // Hapus produk dengan ID yang sesuai dari cart
//             const updatedCart = cart.filter(item => item.ID_PRODUCTS !== productId);
//             setCart(updatedCart); // Update state cart
//             toast("success",`${productToRemove.NAME} has been removed`)
//         }
//     };



//     const handleOpenEditModal = () => {
//         setModalVisible(true); // Membuka modal
//     };

//     // Fungsi untuk mengonfirmasi perubahan quantity
//     const handleSaveEdit = () => {
//         if (newQuantity <= 0) {
//             Swal.fire('Error', 'Quantity must be greater than zero!', 'error');
//             return;
//         }
//         // handleEditProduct(item.ID_PRODUCTS, newQuantity); // Panggil fungsi untuk menyimpan perubahan
//         setModalVisible(false); // Menutup modal setelah edit
//     };

//     useEffect(() => {
//         if (modal) {
//             getProducts();
//         }
//     }, [currentPage, itemsPerPage, searchTerm, modal]);

//     return (
//         <CContainer fluid>
//             <CRow>
//                 <CCol>
//                     <CCard>
//                         <CCardHeader>
//                             <strong>Sales</strong>
//                         </CCardHeader>
//                         <CCardBody>
//                             {/* Sales Form */}
//                             <CRow className="mb-3 shadow-lg p-3 bg-body rounded">
//                                 <CCol md={4}>
//                                     <CFormInput type="date" id="date" label="Date" defaultValue="2019-02-09" />
//                                 </CCol>
//                                 <CCol md={4}>
//                                     <CFormInput type="text" id="cashier" label="Cashier" value={sessionData[0].NAMA} disabled />
//                                 </CCol>
//                                 <CCol md={4}>
//                                     <CFormInput type="text" id="customer" label="Customer" />
//                                 </CCol>
//                             </CRow>

//                             <CRow className="mb-3 shadow-lg p-3 bg-body rounded">
//                                 <CCol md={4}>
//                                     <CFormInput
//                                         type="text"
//                                         id="Products"
//                                         label="Products"
//                                         value={selectedProduct ? selectedProduct.NAME : ''}
//                                         onClick={handleClick}
//                                     />
//                                 </CCol>
//                                 <CCol md={4}>
//                                     <CFormInput
//                                         type="number"
//                                         id="qty"
//                                         label="Qty"
//                                         value={quantities[selectedProduct?.ID] || ''}
//                                         onChange={(e) => handleQuantityChange(selectedProduct?.ID, e.target.value)}
//                                     />
//                                 </CCol>

//                                 <CCol md={4} className="d-flex align-items-end">
//                                     <CButton color="primary" onClick={handleAddToCart} className="w-100 h-300">
//                                         <CIcon icon={cilPlus} /> Add
//                                     </CButton>
//                                 </CCol>
//                             </CRow>

//                             {/* Product Table */}
//                             <CTable striped hover responsive>
//                                 <CTableHead style={{textAlign: "center"}}>
//                                     <CTableRow>
//                                         <CTableHeaderCell>Id Product</CTableHeaderCell>
//                                         <CTableHeaderCell>Product Item</CTableHeaderCell>
//                                         <CTableHeaderCell>Price</CTableHeaderCell>
//                                         <CTableHeaderCell>Qty</CTableHeaderCell>
//                                         <CTableHeaderCell>Total</CTableHeaderCell>
//                                         <CTableHeaderCell>Action</CTableHeaderCell>
//                                     </CTableRow>
//                                 </CTableHead>
//                                 <CTableBody style={{textAlign: "center"}}>
//                                     {cart.length > 0 ? (
//                                         cart.map((item, index) => (
//                                             <CTableRow key={index}>
//                                                 <CTableDataCell>{item.ID_PRODUCTS}</CTableDataCell>
//                                                 <CTableDataCell>{item.NAME}</CTableDataCell>
//                                                 <CTableDataCell>{formatCurrency(item.PRICE)}</CTableDataCell>
//                                                 <CTableDataCell>x{item.quantity}</CTableDataCell>
//                                                 <CTableDataCell>{formatCurrency(item.PRICE * item.quantity)}</CTableDataCell>
//                                                 <CTableDataCell>
//                                                     <CRow>
//                                                         <CCol>
//                                                             <CIcon 
//                                                                 icon={cilTrash} 
//                                                                 style={{
//                                                                     // color: hover ? '#007bff' : 'red', // Ganti warna saat hover
//                                                                     color: "red",
//                                                                     width: '20px', 
//                                                                     height: '20px', 
//                                                                     transform: hoverDelete ? 'scale(1.2)' : 'scale(1)', // Besarkan ikon saat hover
//                                                                     transition: 'all 0.3s ease-in-out',
//                                                                     cursor: 'pointer'
//                                                                 }} 
//                                                                 onMouseEnter={() => setHoverDelete(true)} // Saat mouse masuk, aktifkan hover
//                                                                 onMouseLeave={() => setHoverDelete(false)} // Saat mouse keluar, nonaktifkan hover
//                                                                 onClick={() => handleRemoveFromCart(item.ID_PRODUCTS)} // Panggil fungsi hapus produk
//                                                             />  
//                                                         </CCol>
//                                                         <CCol>
//                                                         <CIcon
//                                                             icon={cilColorBorder}
//                                                             style={{
//                                                                 color: hoverEdit ? '#ffc107' : 'yellow', // Hover untuk warna kuning
//                                                                 width: '20px',
//                                                                 height: '20px',
//                                                                 transform: hoverEdit ? 'scale(1.2)' : 'scale(1)',
//                                                                 transition: 'all 0.3s ease-in-out',
//                                                                 cursor: 'pointer'
//                                                             }}
//                                                             onMouseEnter={() => setHoverEdit(true)} // Hover edit aktif
//                                                             onMouseLeave={() => setHoverEdit(false)} // Hover edit nonaktif
//                                                             onClick={handleOpenEditModal(item.ID_PRODUCTS)} // Buka modal edit
//                                                         />
//                                                         </CCol>
//                                                     </CRow>
//                                                     <CModal visible={modalVisible} onClose={() => setModalVisible(false)} size="lg">
//                                                     <CModalHeader closeButton>
//                                                         <CModalTitle>Edit Quantity</CModalTitle>
//                                                     </CModalHeader>
//                                                     <CModalBody>
//                                                         <CFormInput
//                                                             type="number"
//                                                             label="Quantity"
//                                                             value={newQuantity}
//                                                             onChange={(e) => setNewQuantity(e.target.value)}
//                                                             min="1"
//                                                         />
//                                                     </CModalBody>
//                                                     <CModalFooter>
//                                                         <CButton color="secondary" onClick={() => setModalVisible(false)}>
//                                                             Cancel
//                                                         </CButton>
//                                                         <CButton color="primary" onClick={handleSaveEdit}>
//                                                             Save Changes
//                                                         </CButton>
//                                                     </CModalFooter>
//                                                 </CModal>
//                                                 </CTableDataCell>
//                                             </CTableRow>
//                                         ))
//                                     ) : (
//                                         <CTableRow>
//                                             <CTableDataCell colSpan="5" className="text-center">No products in cart</CTableDataCell>
//                                         </CTableRow>
//                                     )}
//                                 </CTableBody>
//                             </CTable>

//                             {/* Totals Section */}
//                             <CRow className="mt-3">
//                                 <CCol md={6}>
//                                     <CFormInput type="text" label="Note" placeholder="Add note" />
//                                 </CCol>
//                                 <CCol md={3}>
//                                     <CFormInput type="number" label="Discount" placeholder="Discount" />
//                                 </CCol>
//                                 <CCol md={3}>
//                                     <CFormInput type="number" label="Cash" placeholder="Cash" />
//                                 </CCol>
//                             </CRow>

//                             <CRow className="mt-3">
//                                 <CCol md={6}>
//                                     <CButton color="danger">Cancel</CButton>
//                                 </CCol>
//                                 <CCol md={6} className="text-end">
//                                     <CButton color="success">Process Payment</CButton>
//                                 </CCol>
//                             </CRow>
//                         </CCardBody>
//                     </CCard>

//                     {/* Modal for Product List */}
//                     <CModal visible={modal} onClose={handleModalClose} size="lg">
//                         <CModalHeader closeButton>
//                             <CModalTitle>Product List</CModalTitle>
//                         </CModalHeader>
//                         <CModalBody>
//                             <CInputGroup className="mb-3">
//                                 <CFormInput
//                                     type="text"
//                                     placeholder="Find Products..."
//                                     onChange={handleSearch}
//                                 />
//                                 <CInputGroupText>
//                                     <CIcon icon={cilMagnifyingGlass} />
//                                 </CInputGroupText>
//                             </CInputGroup>

//                             <CTable striped hover responsive>
//                                 <CTableHead>
//                                     <CTableRow style={{ textAlign: "center" }}>
//                                         <CTableHeaderCell>Image</CTableHeaderCell>
//                                         <CTableHeaderCell>Product Name</CTableHeaderCell>
//                                         <CTableHeaderCell>Stock</CTableHeaderCell>
//                                         <CTableHeaderCell>Actions</CTableHeaderCell>
//                                     </CTableRow>
//                                 </CTableHead>
//                                 <CTableBody>
//                                     {dataProducts.map((item, index) => (
//                                         <CTableRow
//                                             key={index}
//                                             style={{ textAlign: "center" }}
//                                             onClick={() => handleProductSelect(item)}
//                                         >
//                                             <CTableDataCell>
//                                                 <CImage src={item.IMAGE} alt="Product Image" width={60} />
//                                             </CTableDataCell>
//                                             <CTableDataCell>{item.NAME}</CTableDataCell>
//                                             <CTableDataCell>{item.STOCK}</CTableDataCell>
//                                             <CTableDataCell>
//                                                 <CButton color="success" onClick={() => handleProductSelect(item)} style={{borderRadius: 20, width: 80}}>Select</CButton>
//                                             </CTableDataCell>
//                                         </CTableRow>
//                                     ))}
//                                 </CTableBody>
//                             </CTable>

//                             {isLoading && <div>Loading...</div>}

//                             <div className="mt-4">
//                                 <PaginationComponent
//                                     currentPage={currentPage}
//                                     totalItems={totalItems}
//                                     itemsPerPage={itemsPerPage}
//                                     onPageChange={setCurrentPage}
//                                 />
//                             </div>
//                         </CModalBody>
//                         <CModalFooter>
//                             <CButton color="danger" onClick={handleModalClose} style={{borderRadius: 20, width: 80}}>Cancel</CButton>
//                         </CModalFooter>
//                     </CModal>
//                 </CCol>
//             </CRow>
//         </CContainer>
//     );
// };

const SalesPage = () => {
    const navigate = useNavigate();
    const sessionData = useSelector(sessionSelector);
    const sessionTokens = useSelector(sessionToken);
    const [data, setData] = useState([]);
    const [dataProducts, setDataProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [modal, setModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalItems, setTotalItems] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantities, setQuantities] = useState({}); // Store quantities for each product
    const [cart, setCart] = useState([]); // Store added products to the cart
    const [hoverDelete, setHoverDelete] = useState(null); // Hover untuk ikon hapus (track by product ID)
    const [hoverEdit, setHoverEdit] = useState(null); // Hover untuk ikon edit (track by product ID)
    const [editModalVisible, setEditModalVisible] = useState(false); // State untuk kontrol modal edit
    const [editingProduct, setEditingProduct] = useState(null); // Product yang sedang diedit
    const [newQuantity, setNewQuantity] = useState(""); // Quantity baru untuk editing
    const [grandTotal, setGrandTotal] = useState(0);  // State untuk menyimpan grand total
    const [today, setToday] = useState('');


    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleClick = () => {
        setModal(true);
        getProducts();
    };

    // Close modal
    const handleModalClose = () => {
        setModal(false);
        setDataProducts([])
        setSearchTerm("")
        setCurrentPage(1)
    };

    const handleQuantityChange = (productId, quantity) => {
        // Parse the input to ensure it's a valid number
        const parsedQuantity = parseInt(quantity, 10);

        // If parsedQuantity is NaN or less than 1, reset the quantity to empty string
        if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
            setQuantities((prevQuantities) => ({
                ...prevQuantities,
                [productId]: '',
            }));
        } else {
            setQuantities((prevQuantities) => ({
                ...prevQuantities,
                [productId]: parsedQuantity,
            }));
        }
    };

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setModal(false);  // Close the modal when a product is selected
    };

    const handleAddToCart = () => {
        if (!selectedProduct) {
            toast("error", "Please select a product.");
            return;
        }
    
        const quantity = quantities[selectedProduct.ID] || 0;
    
        if (quantity <= 0 || isNaN(quantity)) {
            toast("error", "Quantity must be greater than zero.");
            return;
        }
    
        // Add the selected product with its quantity to the cart
        const updatedCart = [...cart, { ...selectedProduct, quantity }];
        setCart(updatedCart); // Update the cart with new product
        toast("success", `${selectedProduct.NAME} has been added with quantity: ${quantity}`);
    
        setSelectedProduct(null); // Reset selected product after adding to cart
        setQuantities({}); // Reset quantities
    };

    const handleCalculateGrandTotal = () => {
        setIsLoad(true)
        setTimeout(() => {
        const total = cart.reduce((sum, item) => {
            return sum + (item.PRICE * item.quantity);
        }, 0);

        setGrandTotal(total);
        setIsLoad(false); 
     }, 1350);
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

    const handleRemoveFromCart = async (productId) => {
        // Menampilkan SweetAlert2 untuk konfirmasi
        const productToRemove = cart.find(item => item.ID_PRODUCTS === productId);
        const confirmationResult = await Swal.fire({
            title: `Remove ${productToRemove.NAME}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'Remove',
            cancelButtonText: 'Cancel',
            cancelButtonColor: '#D49612',
            confirmButtonColor: '#ff0000',
            reverseButtons: true,
            style: {
                confirmButton: 'width: 75px',
                cancelButton: 'width: 75px'
            }
        });
    
        // Jika pengguna mengonfirmasi penghapusan
        if (confirmationResult.isConfirmed) {
            // Hapus produk dengan ID yang sesuai dari cart
            const updatedCart = cart.filter(item => item.ID_PRODUCTS !== productId);
            setCart(updatedCart); // Update state cart
            toast("success", `${productToRemove.NAME} has been removed`);
        }
    };

    // Fungsi untuk membuka modal edit dengan product tertentu
    const handleOpenEditModal = (product) => {
        setEditingProduct(product);
        setNewQuantity(product.quantity.toString());
        setEditModalVisible(true);
    };

    // Fungsi untuk mengonfirmasi perubahan quantity
    const handleSaveEdit = () => {
        const quantity = parseInt(newQuantity, 10);
        
        if (isNaN(quantity) || quantity <= 0) {
            Swal.fire('Error', 'Quantity must be greater than zero!', 'error');
            return;
        }

        // Update cart dengan quantity baru
        const updatedCart = cart.map(item => {
            if (item.ID_PRODUCTS === editingProduct.ID_PRODUCTS) {
                return { ...item, quantity: quantity };
            }
            return item;
        });

        setCart(updatedCart);
        toast("success", `Quantity for ${editingProduct.NAME} updated to ${quantity}`);
        setEditModalVisible(false);
        setEditingProduct(null);
        setNewQuantity("");
    };

    useEffect(() => {
        if (modal) {
            getProducts();
        }
        const currentDate = new Date().toISOString().split('T')[0];
        setToday(currentDate);
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
                                    <CFormInput type="date" id="date" label="Date" defaultValue={today} />
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
                                        value={quantities[selectedProduct?.ID] || ''}
                                        onChange={(e) => handleQuantityChange(selectedProduct?.ID, e.target.value)}
                                    />
                                </CCol>

                                <CCol md={4} className="d-flex align-items-end">
                                    <CButton color="primary" onClick={handleAddToCart} className="w-100 h-300">
                                        <CIcon icon={cilCart} /> Add to cart
                                    </CButton>
                                </CCol>
                            </CRow>

                            {/* Product Table */}
                            <CTable striped hover responsive>
                                <CTableHead style={{textAlign: "center"}}>
                                    <CTableRow>
                                        <CTableHeaderCell>Id Product</CTableHeaderCell>
                                        <CTableHeaderCell>Product Name</CTableHeaderCell>
                                        <CTableHeaderCell>Price</CTableHeaderCell>
                                        <CTableHeaderCell>Qty</CTableHeaderCell>
                                        <CTableHeaderCell>Total</CTableHeaderCell>
                                        <CTableHeaderCell>Action</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody style={{textAlign: "center"}}>
                                    {cart.length > 0 ? (
                                        cart.map((item, index) => (
                                            <CTableRow key={index}>
                                                <CTableDataCell>{item.ID_PRODUCTS}</CTableDataCell>
                                                <CTableDataCell style={{fontWeight:"bold"}}>{item.NAME}</CTableDataCell>
                                                <CTableDataCell>{formatCurrency(item.PRICE)}</CTableDataCell>
                                                <CTableDataCell>x{item.quantity}</CTableDataCell>
                                                <CTableDataCell>{formatCurrency(item.PRICE * item.quantity)}</CTableDataCell>
                                                <CTableDataCell>
                                                    <CRow>
                                                        <CCol>
                                                            <CIcon 
                                                                icon={cilTrash} 
                                                                style={{
                                                                    color: "red",
                                                                    width: '20px', 
                                                                    height: '20px', 
                                                                    transform: hoverDelete === item.ID_PRODUCTS ? 'scale(1.2)' : 'scale(1)',
                                                                    transition: 'all 0.3s ease-in-out',
                                                                    cursor: 'pointer',
                                                                    marginLeft: 7
                                                                    
                                                                }} 
                                                                onMouseEnter={() => setHoverDelete(item.ID_PRODUCTS)}
                                                                onMouseLeave={() => setHoverDelete(null)}
                                                                onClick={() => handleRemoveFromCart(item.ID_PRODUCTS)}
                                                                
                                                            />  
                                                        </CCol>
                                                        <CCol >
                                                            <CIcon
                                                                icon={cilColorBorder}
                                                                style={{
                                                                    color: hoverEdit === item.ID_PRODUCTS ? '#ffc107' : 'yellow',
                                                                    width: '20px',
                                                                    height: '20px',
                                                                    transform: hoverEdit === item.ID_PRODUCTS ? 'scale(1.2)' : 'scale(1)',
                                                                    transition: 'all 0.3s ease-in-out',
                                                                    cursor: 'pointer',
                                                                    marginLeft: 7
                                                                }}
                                                                onMouseEnter={() => setHoverEdit(item.ID_PRODUCTS)}
                                                                onMouseLeave={() => setHoverEdit(null)}
                                                                onClick={() => handleOpenEditModal(item)}
                                                            />
                                                        </CCol>
                                                    </CRow>
                                                </CTableDataCell>
                                            </CTableRow>
                                            
                                        ))
                                        
                                    ) : (
                                        <CTableRow>
                                            <CTableDataCell colSpan="6" className="text-center">No products in cart</CTableDataCell>
                                        </CTableRow>
                                    )}
                                </CTableBody>
                            </CTable>
                            {cart.length > 0 ?(

                            <CCol sm={12} className="mb-3 d-flex justify-content-end">
                                              <CButton
                                                color="success"
                                                type="submit"
                                                style={{ borderRadius: 40 }}
                                                onClick={handleCalculateGrandTotal}
                                              >
                                               Count<CIcon icon={cilDollar}/> 
                                              </CButton>
                                         </CCol>
                            ) : <div></div>}

                            {/* Totals Section */}
                            <CRow className="mt-3">
                                <CCol md={4}>
                                    <h6>Grand Total :</h6>
                                    {
                                        isLoad ? (
                                            renderLoading()
                                        ) : cart.length === 0 ? (
                                            <h1>Rp.0</h1>
                                        ) : (
                                            <h1>{formatCurrency(grandTotal)}</h1>
                                        )
                                    }
                                </CCol>

                                <CCol md={4}>
                                    <CFormInput type="number" label="Amount Paid" placeholder="Rp.xxx" />
                                </CCol>
                                <CCol md={4}>
                                    <CFormInput type="number" label="Change" placeholder="Rp.xx" />
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
                                        <CTableHeaderCell>Price</CTableHeaderCell>
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
                                            <CTableDataCell>{formatCurrency(item.PRICE)}</CTableDataCell>
                                            <CTableDataCell>{item.STOCK}</CTableDataCell>
                                            <CTableDataCell>
                                                <CButton color="success" onClick={() => handleProductSelect(item)} style={{borderRadius: 20, width: 80}}>Select</CButton>
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
                            <CButton color="danger" onClick={handleModalClose} style={{borderRadius: 20, width: 80}}>Cancel</CButton>
                        </CModalFooter>
                    </CModal>

                    {/* Modal for Editing Quantity */}
                    <CModal visible={editModalVisible} onClose={() => setEditModalVisible(false)} size="md">
                        <CModalHeader closeButton>
                            <CModalTitle>Edit Product Quantity</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            {editingProduct && (
                                <>
                                    <div className="mb-3">
                                        <h5>Product Name: {editingProduct.NAME}</h5>
                                        <p>Current Quantity: {editingProduct.quantity}</p>
                                    </div>
                                    <CFormInput
                                        type="number"
                                        label="New Quantity"
                                        value={newQuantity}
                                        onChange={(e) => setNewQuantity(e.target.value)}
                                        min="1"
                                    />
                                </>
                            )}
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="warning" onClick={() => setEditModalVisible(false)} style={{borderRadius: 20}}>
                                Cancel
                            </CButton>
                            <CButton color="success" onClick={handleSaveEdit} style={{borderRadius: 20, width: 70}}>
                                Save
                            </CButton>
                        </CModalFooter>
                    </CModal>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default SalesPage;
