import React, { useState, useEffect, useMemo, useRef } from "react";
import TutorialDataService from "../services/TutorialService";
import { useTable, usePagination } from "react-table";
import { useNavigate } from "react-router-dom";


const TutorialsList = (props) => {
  const [tutorials, setTutorials] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const tutorialsRef = useRef();
  const navigate = useNavigate();

  tutorialsRef.current = tutorials;

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveTutorials = () => {
    TutorialDataService.getAll()
      .then((response) => {
        setTutorials(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTutorials();
  };

  const removeAllTutorials = () => {
    TutorialDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    if (searchTitle !== "") {
      TutorialDataService.findByTitle(searchTitle)
      .then((response) => {
        setTutorials(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    } else {
      refreshList();
    }
    
  };

  const openTutorial = (rowIndex) => {
    const id = tutorialsRef.current[rowIndex]._id;
    console.log(id);
    navigate("/tutorials/" + id, {state:{_id:id}});
  };

  const deleteTutorial = (rowIndex) => {
    const id = tutorialsRef.current[rowIndex]._id;
    TutorialDataService.remove(id)
      .then((response) => {
        let newTutorials = [...tutorialsRef.current];
        newTutorials.splice(rowIndex, 1);

        setTutorials(newTutorials);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Status",
        accessor: "published",
        Cell: (props) => {
          return props.value ? "Published" : "Pending";
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openTutorial(rowIdx)}>
                <i className="far fa-edit action"></i>
              </span>
              &nbsp;
              <span onClick={() => deleteTutorial(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
          </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex, pageSize },
    prepareRow,
  } = useTable(
    {
      columns,
      data: tutorials,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <div className="list row">
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

      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pagination justify-content-end mb-3">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {"<"}
            </button>
          </li>
          <li className="page-item">
            <button className="page-link" disabled>
              Page {pageIndex + 1} of {pageOptions.length}
            </button>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              {">"}
            </button>
          </li>
        </ul>
      </div>

      <div className="col-md-8">
        <button className="btn btn-sm btn-danger" onClick={removeAllTutorials}>
          Remove All
        </button>
      </div>
    </div>
  );
};

export default TutorialsList;