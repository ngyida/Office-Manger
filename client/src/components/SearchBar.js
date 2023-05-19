import React from 'react';

const SearchBar = ({ searchTitle, onChangeSearchTitle, onSearchClick }) => {
  return (
    <div className="col-md-8">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title"
          value={searchTitle}
          maxLength={100}
          onChange={onChangeSearchTitle}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onSearchClick();
            }
          }}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={onSearchClick}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;