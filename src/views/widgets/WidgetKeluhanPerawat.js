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

const Table = ({ data, onEdit }) => {

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
          <CTableHeaderCell>Id Pasien</CTableHeaderCell>
          <CTableHeaderCell>Tanggal</CTableHeaderCell>
          <CTableHeaderCell>Status</CTableHeaderCell>
          <CTableHeaderCell>No Handphone</CTableHeaderCell>
          <CTableHeaderCell>Alamat</CTableHeaderCell>
          <CTableHeaderCell>Hasil Data</CTableHeaderCell>
          <CTableHeaderCell>Id Obat</CTableHeaderCell>
          <CTableHeaderCell>Keluhan</CTableHeaderCell>
          <CTableHeaderCell>Pilih</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {data.map((item, index) => (
          <CTableRow key={index}>
            <CTableDataCell>{index + 1}</CTableDataCell>
            <CTableDataCell>{item.idPasien}</CTableDataCell>
            <CTableDataCell>{item.tanggal}</CTableDataCell>
            <CTableDataCell>{item.status}</CTableDataCell>
            <CTableDataCell>{item.noHandphone}</CTableDataCell>
            <CTableDataCell>{item.alamat}</CTableDataCell>
            <CTableDataCell>{item.hasilData}</CTableDataCell>
            <CTableDataCell>{item.idObat}</CTableDataCell>
            <CTableDataCell>{item.keluhan}</CTableDataCell>
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

export default Table