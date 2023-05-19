import React, { useState, useEffect, useMemo, useRef } from "react";
import TutorialDataService from "../services/TutorialService";
import { useTable, usePagination } from "react-table";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import Table from "./Table";
import RemoveButton from "./RemoveButton";


const Home = (props) => {
  const [tutorials, setTutorials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const [isFiltered, setIsFiltered] = useState(false)
  const tutorialsRef = useRef();
  const navigate = useNavigate();

  tutorialsRef.current = tutorials;

  const handleSearchTitleChange = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const refreshList = () => {
    setCurrentPage(1);
    setIsFiltered(false);
    fetchTutorials();
  };

  const removeAllTutorials = () => {
    TutorialDataService.removeAll()
      .then((response) => {
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = async (pageNum) => {
    try {
      if (searchTitle == "") {
        refreshList();
        return;
      }
      const response = await TutorialDataService.findByTitle(encodeURIComponent(searchTitle), pageNum);
      const { tutorials, totalPages } = response.data;
      console.log(totalPages);
      console.log(tutorials);
      setIsFiltered(true);
      setTutorials(tutorials);
      setTotalPages(totalPages);
      console.log("findByTitle called finished")
    } catch (err) {
      console.log(err);
    }
  };

  const onSearchClick = async () => {
    console.log("onSearchClick called");
    await findByTitle(1);
    setCurrentPage(1);
  }

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

  const fetchTutorials = async (pageNum) => {
    try {
      const response = await TutorialDataService.getPage(pageNum);
      const { tutorials, totalPages } = response.data;
      setTutorials(tutorials);
      setTotalPages(totalPages);
    } catch (err) {
      console.log(err);
    }
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
    if (isFiltered) {
      console.log("findByTitle called in effect")
      findByTitle(currentPage);
    } else {
      console.log("fetchTutorials called")
      fetchTutorials(currentPage);
    }
  }, [currentPage]);

  return (
    <div className="list row">
      <SearchBar searchTitle={searchTitle} onChangeSearchTitle={handleSearchTitleChange} onSearchClick={onSearchClick} />

      <Table
      getTableProps={getTableProps}
      getTableBodyProps={getTableBodyProps}
      headerGroups={headerGroups}
      page={page}
      prepareRow={prepareRow}
      openTutorial={openTutorial}
      deleteTutorial={deleteTutorial}
      currentPage={currentPage}
      totalPages={totalPages}
      handlePageChange={handlePageChange}
      />

      <RemoveButton removeAllTutorials={removeAllTutorials} />
    </div>
  );
};

export default Home;