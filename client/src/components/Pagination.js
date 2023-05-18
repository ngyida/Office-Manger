import React from 'react';

const Pagination_old = ({ previousPage, canPreviousPage, pageIndex, nextPage, canNextPage, pageOptions }) => {
  return (
    <div className="pagination justify-content-end mb-3">
      <ul className="pagination">
        <li className="page-item">
          <button className="page-link" onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>
        </li>
        <li className="page-item">
          <button className="page-link" disabled>
            Page {pageIndex + 1} of {pageOptions.length}
          </button>
        </li>
        <li className="page-item">
          <button className="page-link" onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>
        </li>
      </ul>
    </div>
  );
};

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