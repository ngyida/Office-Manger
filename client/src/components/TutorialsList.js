import React, { useState, useEffect, useMemo, useRef } from "react";
import TutorialDataService from "../services/TutorialService";
import { useTable, usePagination } from "react-table";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import Table from "./Table";
import RemoveButton from "./RemoveButton";


const TutorialsList = (props) => {
  const [tutorials, setTutorials] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const tutorialsRef = useRef();
  const navigate = useNavigate();

  tutorialsRef.current = tutorials;

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

  useEffect(() => {
    retrieveTutorials();
  }, []);

  return (
    <div className="list row">
      <SearchBar searchTitle={searchTitle} onChangeSearchTitle={onChangeSearchTitle} findByTitle={findByTitle} />

      {/* Table */}
      <Table 
      getTableProps={getTableProps} 
      getTableBodyProps={getTableBodyProps}
      headerGroups={headerGroups}
      page={page}
      prepareRow={prepareRow}
      openTutorial={openTutorial}
      deleteTutorial={deleteTutorial}
      />

      <Pagination 
      previousPage={previousPage} 
      canPreviousPage={canPreviousPage} 
      pageIndex={pageIndex} nextPage={nextPage} 
      canNextPage={canNextPage} 
      pageOptions={pageOptions}
      />

      {/* remove all */}
      <RemoveButton removeAllTutorials={removeAllTutorials} />
    </div>
  );
};

export default TutorialsList;