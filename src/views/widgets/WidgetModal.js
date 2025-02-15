import React from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
} from '@coreui/react'

const TableModal = ({ show, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = React.useState(initialData || {})

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = () => {
    onSubmit(formData)
    onClose()
  }

  return (
    <CModal visible={show} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Edit Data Pasien</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {initialData && (
          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="idPasien">ID Pasien</CFormLabel>
              <CFormInput
                type="text"
                id="idPasien"
                name="idPasien"
                value={formData.idPasien || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="tanggal">Tanggal</CFormLabel>
              <CFormInput
                type="date"
                id="tanggal"
                name="tanggal"
                value={formData.tanggal || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="status">Status</CFormLabel>
              <CFormSelect
                id="status"
                name="status"
                value={formData.status || ''}
                onChange={handleChange}
              >
                <option value="">Pilih Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </CFormSelect>
            </div>
          </CForm>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={handleSubmit} disabled={!initialData}>
          Save Changes
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default TableModal   