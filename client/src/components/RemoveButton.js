import React from 'react';

const RemoveButton = ({ removeAllTutorials }) => {
    return (
        <div className="col-md-8">
            <button className="btn btn-sm btn-danger" onClick={removeAllTutorials}>
            Remove All
            </button>
        </div>
    );
};

export default RemoveButton;
