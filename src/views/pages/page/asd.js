import React, {useEffect} from "react";
import {sessionSelector} from "../../../redux/slicer/sessionSlicer";
import { useSelector } from 'react-redux';

const HomePage = () => {
    const sessionData = useSelector(sessionSelector);

    useEffect (() => {
        console.log("data", sessionData)
    })
    return (
        // <div>
        //     {/* <h1 style={{color:"white"}}>HOME PAGE</h1> */}
        //       <CRow className="mb-4">
        //             {/* Row 1: Date, Kasir, and Customer */}
        //             <CCol xs={12} sm={6}>
        //               <CFormInput
        //                 type="date"
        //                 label="Date"
        //                 value={date}
        //                 onChange={(e) => setDate(e.target.value)}
        //               />
        //             </CCol>
        //             <CCol xs={12} sm={6}>
        //               <CFormSelect
        //                 label="Product"
        //                 value={product}
        //                 onChange={(e) => setProduct(e.target.value)}
        //               >
        //                 <option value="">Select Product</option>
        //                 <option value="Product 1">Product 1</option>
        //                 <option value="Product 2">Product 2</option>
        //                 <option value="Product 3">Product 3</option>
        //               </CFormSelect>
        //             </CCol>
        //           </CRow>
            
        //           <CRow className="mb-4">
        //             {/* Row 2: Product, Qty, Add button */}
        //             <CCol xs={12} sm={6}>
        //               <CFormInput
        //                 type="text"
        //                 label="Kasir"
        //                 value="Mohammad Nur Fawaiq"
        //                 disabled
        //               />
        //             </CCol>
                    
        //             <CCol xs={12} sm={6}>
        //               <CFormInput
        //                 label="Qty"
        //                 type="number"
        //                 value={quantity}
        //                 onChange={(e) => setQuantity(Number(e.target.value))}
        //                 min="1"
        //               />
        //             </CCol>
                   
        //           </CRow>
            
        //           <CRow className="mb-4">
        //             {/* Row 2: Product, Qty, Add button */}
        //             <CCol xs={12} sm={6}>
        //               <CFormSelect label="Customer" defaultValue="Umum">
        //                 <option value="Umum">Umum</option>
        //                 {/* Other options can be added here */}
        //               </CFormSelect>
        //             </CCol>
        //             <CCol xs={12} sm={6} className="d-flex align-items-end">
        //               <CButton color="primary" onClick={handleAddItem} className="w-100">
        //                 Add Product
        //               </CButton>
        //             </CCol>
        //           </CRow>
        // </div>
        <div>
            <h1>asdsa</h1>
        </div>
    )
}

export default HomePage