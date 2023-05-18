import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-end">
        {pageNumbers.map((pageNum) => (
          <li
            key={pageNum}
            className={`page-item ${currentPage === pageNum ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(pageNum)}
              disabled={currentPage === pageNum}
            >
              {pageNum}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;