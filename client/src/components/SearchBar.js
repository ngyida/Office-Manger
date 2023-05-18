import React from 'react';

const SearchBar = ({ searchTitle, onChangeSearchTitle, findByTitle }) => {
  return (
    <div className="col-md-8">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title"
          value={searchTitle}
          onChange={onChangeSearchTitle}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              findByTitle();
            }
          }}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={findByTitle}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;