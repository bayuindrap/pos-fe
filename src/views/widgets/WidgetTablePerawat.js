import React from 'react'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

const TablePerawat = ({ data, onEdit }) => {

    const handleEdit = (item) => {
        if (onEdit) {
          onEdit(item)
        }
      }

  return (
    <CTable align="middle" className="mb-0 border" hover responsive>
      <CTableHead color="light">
        <CTableRow>
          <CTableHeaderCell>No</CTableHeaderCell>
          <CTableHeaderCell>Id Perawat</CTableHeaderCell>
          <CTableHeaderCell>Id Pasien</CTableHeaderCell>
          <CTableHeaderCell>Status</CTableHeaderCell>
          <CTableHeaderCell>No Handphone</CTableHeaderCell>
          <CTableHeaderCell>Alamat</CTableHeaderCell>
          <CTableHeaderCell>Jumlah Pasien</CTableHeaderCell>
          <CTableHeaderCell>Jumlah Tindakan</CTableHeaderCell>
          <CTableHeaderCell>Pilih</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {data.map((item, index) => (
          <CTableRow key={index}>
            <CTableDataCell>{index + 1}</CTableDataCell>
            <CTableDataCell>{item.idPerawat}</CTableDataCell>
            <CTableDataCell>{item.idPasien}</CTableDataCell>
            <CTableDataCell>{item.status}</CTableDataCell>
            <CTableDataCell>{item.noHandphone}</CTableDataCell>
            <CTableDataCell>{item.alamat}</CTableDataCell>
            <CTableDataCell>{item.jumlahPasien}</CTableDataCell>
            <CTableDataCell>{item.jumlahTindakan}</CTableDataCell>
            <CTableDataCell>
              <CButton color="primary" onClick={() => handleEdit(item)}>
                {item.action}
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}

export default TablePerawat