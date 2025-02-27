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
     CForm,
     CFormLabel
     } from '@coreui/react';
import { renderLoading, toast, formatCurrency, formatNominal } from '../../../utils/utils';
import { cilMagnifyingGlass, cilDollar, cilTrash, cilColorBorder, cilCart, cilMoney, cilDelete } from '@coreui/icons'
import { CIcon } from '@coreui/icons-react';
import { useSelector } from 'react-redux'
import { sessionSelector, sessionToken } from "../../../redux/slicer/sessionSlicer";
import API from '../../../service/api'
import Swal from "sweetalert2";
import PaginationComponent from "../../../components/PaginationComponent";



const SalesPage = () => {
    const sessionData = useSelector(sessionSelector);
    const sessionTokens = useSelector(sessionToken);
    const [dataProducts, setDataProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [isLoads, setIsLoads] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalPayment, setModalPayment] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalItems, setTotalItems] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantities, setQuantities] = useState({});
    const [cart, setCart] = useState([]);
    const [hoverDelete, setHoverDelete] = useState(null);
    const [hoverEdit, setHoverEdit] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isPaid, setIsPaid] = useState(false)
    const [newQuantity, setNewQuantity] = useState("");
    const [grandTotal, setGrandTotal] = useState(0);
    const [change, setChange] = useState(0);
    const [today, setToday] = useState('');
    const custName = useRef("")
    const amountPaid = useRef("")


    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDeleteCart = () => {
        setCart([]);
        custName.current.value = ""
        setGrandTotal(0)
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setToday(selectedDate);
    }

    const handleClick = () => {
        setModal(true);
        getProducts();
    };

    const handleModalClose = () => {
        setModal(false);
        setDataProducts([])
        setSearchTerm("")
        setCurrentPage(1)
    };

    const handleModalPayment = () => {
        if (custName.current.value === ""){
            return toast("error", 'Customer name cant be empty')
        }
        setModalPayment(true);
        // setNewQuantity(product.quantity.toString());
        // setEditModalVisible(true);
        // console.log("hari", today)
    };
    
    const handleModalPaymentClose = () => {
        setModalPayment(false);
        setChange(0)
        setIsPaid(false)
        // setDataProducts([])
        // setSearchTerm("")
        // setCurrentPage(1)
    };


    async function addTransaction(e) {
        const token = sessionTokens;
        if (!token) {
            toast("error", "Token not found");
            setIsLoading(false);
            return;
        }
        // const headers = {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${token}`,
        // };
        e.preventDefault();
        setIsLoading(true); 
        
       
        const cartData = cart; 
        const amountPaidValue = amountPaid.current.value; 
        const changeValue = change; 
        const customerName = custName.current.value; 
        const date = today;
        // console.log("cek", date)
        const cashierId = sessionData[0].ID_USERS; 
        
        // console.log("sess", cartData)
        try {
            
            const result = await API.post('transaction/add', {
                cart: cartData,
                amountPaid: amountPaidValue,
                change: changeValue,
                custName: customerName,
                today: date,
                cashierId: cashierId,
            });
    
           
            if (result.data.status) {
                Swal.fire({
                    title: result.data.message,
                    icon: "success",
                    showConfirmButton: false,
                    position: "center",
                    timer: 2500,
                });
    
           
                setTimeout(() => {
                    window.location.reload(); 
                }, 2500);
            } else {
                toast("error", result.data.message); 
            }
        } catch (error) {
            toast("error", error.message); 
        } finally {
            setIsLoading(false); 
        }
    }
    
    const handleQuantityChange = (productId, quantity) => {
        const parsedQuantity = parseInt(quantity, 10);

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
        setModal(false); 
    };

    const calculateGrandTotal = (cartItems) => {
        return cartItems.reduce((sum, item) => {
            return sum + (item.PRICE * item.quantity);
        }, 0);
    };
    // const handleAddToCart = () => {
    //     if (!selectedProduct) {
    //         toast("error", "Please select a product.");
    //         return;
    //     }
    
    //     const quantity = quantities[selectedProduct.ID] || 0;
    
    //     if (quantity <= 0 || isNaN(quantity)) {
    //         toast("error", "Quantity must be greater than zero.");
    //         return;
    //     }
    
   
    //     const updatedCart = [...cart, { ...selectedProduct, quantity }];
    //     setCart(updatedCart);
    //     setGrandTotal(calculateGrandTotal(updatedCart));
    //     setIsLoad(false);
    //     toast("success", `${selectedProduct.NAME} has been added with quantity: ${quantity}`);
    //     setSelectedProduct(null);
    //     setQuantities({});
    // };
    
    const handleAddToCart = () => {
        if (!selectedProduct) {
            toast("error", "Please select a product.");
            return;
        }
        const quantity = quantities[selectedProduct?.ID] || 0;
        if (quantity <= 0 || isNaN(quantity)) {
            toast("error", "Quantity must be greater than zero.");
            return;
        }
        if (quantity > selectedProduct.STOCK) {
            toast("error", `Insufficient stock. Available: ${selectedProduct.STOCK}`);
            return;
        }
    
        const existingProductIndex = cart.findIndex(item => item.ID_PRODUCTS === selectedProduct.ID_PRODUCTS);
    
        if (existingProductIndex !== -1) {
            const existingQuantity = cart[existingProductIndex].quantity;
            const newTotalQuantity = existingQuantity + parseInt(quantity, 10);
            
            if (newTotalQuantity > selectedProduct.STOCK) {
                toast("error", `Insufficient stock. You already have ${existingQuantity} in cart. Available: ${selectedProduct.STOCK}`);
                return;
            }
        }
    
        let updatedCart;
        
        if (existingProductIndex !== -1) {
            updatedCart = [...cart];
            updatedCart[existingProductIndex] = {
                ...updatedCart[existingProductIndex],
                quantity: updatedCart[existingProductIndex].quantity + parseInt(quantity, 10)
            };
            toast("success", `${selectedProduct.NAME} quantity updated to ${updatedCart[existingProductIndex].quantity}`);
        } else {
            updatedCart = [...cart, { ...selectedProduct, quantity: parseInt(quantity, 10) }];
            toast("success", `${selectedProduct.NAME} has been added with qty: ${quantity}`);
        }
    
        setCart(updatedCart);
        setGrandTotal(calculateGrandTotal(updatedCart));
        setSelectedProduct(null);
        setQuantities({});
    };

    const handleCalculatePayment = () => {
 
        const amountPaidValue = parseFloat(amountPaid.current.value);
        
        if (isNaN(amountPaidValue) || amountPaidValue <= 0) {
            return toast("error", "Please enter a valid amount paid");
        }
        setIsLoads(true);
        setIsPaid(true);
    
        const total = amountPaidValue - grandTotal;
    
        if (grandTotal > amountPaidValue) {

            setIsLoads(false);
            setIsPaid(false);
            return toast("error", "Amount paid must be greater than or equal to grand total");
        }
    
        setTimeout(() => {
            setChange(total);
            setIsLoads(false); 
        }, 1000);
    };
    
 
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
        API.post("/products/pos", {
            page: currentPage,
            limit: itemsPerPage,
            searchTerm: searchTerm,
        }, { headers })
            .then((result) => {
                if (result.data.status) {
                    const fetchedData = result.data.data;
                    // const productsActive = fetchedData.filter(item => (item.STATUS === 1))
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
    
        if (confirmationResult.isConfirmed) {
            const updatedCart = cart.filter(item => item.ID_PRODUCTS !== productId);
            setCart(updatedCart);
            setGrandTotal(calculateGrandTotal(updatedCart));
            toast("success", `${productToRemove.NAME} has been removed`);
        }
    };


    const handleOpenEditModal = (product) => {
        setEditingProduct(product);
        setNewQuantity(product.quantity.toString());
        setEditModalVisible(true);
    };

    const handleSaveEdit = () => {
        const quantity = parseInt(newQuantity, 10);
        
        if (isNaN(quantity) || quantity <= 0) {
            Swal.fire('Error', 'Quantity must be greater than zero', 'error');
            return;
        }

        const updatedCart = cart.map(item => {
            if (item.ID_PRODUCTS === editingProduct.ID_PRODUCTS) {
                return { ...item, quantity: quantity };
            }
            return item;
        });

        setCart(updatedCart);
        setGrandTotal(calculateGrandTotal(updatedCart));
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
                            <CRow className="mb-3 shadow-lg p-3 bg-body rounded">
                                <CCol md={4}>
                                    <CFormInput type="date" id="date" label="Date" value={today} onChange={handleDateChange}/>
                                </CCol>
                                <CCol md={4}>
                                    <CFormInput type="text" id="cashier" label="Cashier" value={sessionData[0].NAMA} disabled />
                                </CCol>
                                <CCol md={4}>
                                    <CFormInput type="text" id="customer" label="Customer" ref={custName}/>
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
                           
                            <CRow className="mt-3">
                                <CCol md={4}>
                                    <h6>Grand Total :</h6>
                                    {
                                        isLoad ? (
                                            renderLoading()
                                        ) : cart.length === 0 ? (
                                            <h1>Rp.0</h1>
                                        ) : (
                                            <div>
                                                <h1>{formatCurrency(grandTotal)}</h1>
                                                <h6>({formatNominal(grandTotal)} Rupiah)</h6>
                                            </div>
                                        )
                                    }
                                </CCol>

                            </CRow>

                            <CRow className="mt-3 justify-content-end">
                                <CCol xs="auto">
                                    <CButton color="danger" style={{borderRadius: 20, width: 170}} onClick={handleDeleteCart}><CIcon icon={cilDelete}/> Delete Cart</CButton>
                                </CCol>
                                <CCol xs="auto">
                                    <CButton
                                     color="success"
                                     type="submit"
                                     style={{ borderRadius: 20, width: 170 }}
                                     onClick={handleModalPayment}>
                                     <CIcon icon={cilMoney}/>  Process Payment
                                     </CButton>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>

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
                    
                     <CModal
                          visible={modalPayment}
                          onClose={handleModalPaymentClose}
                          size="md"
                        >
                          <CModalHeader closeButton>
                            <CModalTitle>{custName.current.value}'s Cart Payment</CModalTitle>
                          </CModalHeader>
                          <CModalBody>
                                <CForm>
                                    <CFormLabel>Grand Total</CFormLabel>
                                    <CFormInput type="text" id="total" value={formatCurrency(grandTotal)} disabled />
                                    
                                    <CFormLabel>Amount Paid</CFormLabel>
                                    <CFormInput 
                                        type="number" 
                                        id="amontpaid"
                                        onWheel={(e) => e.currentTarget.blur()}
                                        onInput={(e) => {e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 14)}} 
                                        ref={amountPaid}
                                    />
                                    {
                                        isPaid === false ? 
                                    <div className="d-flex justify-content-end" style={{marginTop: 10}}>
                                        <CButton  type="button" color="secondary" style={{borderRadius:20, width: 80}} onClick={handleCalculatePayment}>
                                         Pay <CIcon icon={cilDollar}  style={{paddingTop: 1}}/>
                                        </CButton>
                                    </div>
                                    : <div></div>
                                    }

                                    {isPaid && (
                                        <>
                                            <h6 className="mt-3">Total Change :</h6>
                                            {isLoads ? (
                                                renderLoading()
                                            ) : (
                                                <h2>{formatCurrency(change)}</h2>
                                            )}
                                        </>
                                    )}
                                </CForm>

                             {isLoading ? renderLoading() : null}
                          </CModalBody>
                          <CModalFooter>
                            <CButton color="danger" style={{borderRadius:20, width: 75}} onClick={handleModalPaymentClose}>
                              Cancel
                            </CButton>
                            <CButton color="success" style={{borderRadius:20, width: 75}} onClick={addTransaction}>Save</CButton>
                          </CModalFooter>
                        </CModal>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default SalesPage;
