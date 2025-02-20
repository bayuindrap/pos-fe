import React from 'react';
import { CPagination, CPaginationItem } from '@coreui/react';

const PaginationComponent = ({ currentPage, totalItems, itemsPerPage, onPageChange, searchTerm }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems);
  const showDataRange = totalItems > 0 && itemsPerPage > 0;

  const paginationItemStyle = {
    cursor: 'pointer'
  };

  return (
    <div className="d-flex flex-column align-items-end">
      <div className="mb-2">
        {showDataRange ? (
          `${startIndex}-${endIndex} of ${totalItems}`
        ) : (
          'No data available'
        )}
      </div>
      <CPagination aria-label="Page navigation example">
        <CPaginationItem
          aria-label="Previous"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1, searchTerm)}
          style={currentPage === 1 ? {} : paginationItemStyle}
        >
          <span aria-hidden="true">&laquo;</span>
        </CPaginationItem>
        <CPaginationItem
          aria-label="Next"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1, searchTerm)}
          style={currentPage === totalPages ? {} : paginationItemStyle}
        >
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      </CPagination>
    </div>
  );
};

export default PaginationComponent;

