import React from 'react';

const Pagination = ({ previousPage, canPreviousPage, pageIndex, nextPage, canNextPage, pageOptions }) => {
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

export default Pagination;