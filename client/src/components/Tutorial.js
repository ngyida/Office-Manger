import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialService";
import {useLocation, useNavigate} from 'react-router-dom';

const Tutorial = props => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const getTutorial = id => {
    TutorialDataService.get(id)
      .then(response => {
        setCurrentTutorial(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTutorial(location.state._id);
  }, [location.state._id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentTutorial._id,
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: status
    };

    TutorialDataService.update(currentTutorial._id, data)
      .then(response => {
        setCurrentTutorial({ ...currentTutorial, published: status });
        console.log(response.data);
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateTutorial = () => {
    TutorialDataService.update(currentTutorial._id, currentTutorial)
      .then(response => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    TutorialDataService.remove(currentTutorial._id)
      .then(response => {
        console.log(response.data);
        navigate("/tutorials");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const navigateHome = () => {
    navigate("/tutorials")
  }

  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>Update Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTutorial.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTutorial.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTutorial.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentTutorial.published ? (
            <button
              className="btn btn-primary mr-2"
              onClick={() => updatePublished(false)}
              style={{ marginRight: '5px' }}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="btn btn-primary mr-2"
              onClick={() => updatePublished(true)}
              style={{ marginRight: '5px' }}
            >
              Publish
            </button>
          )}

          <button className="btn btn-danger mr-2" 
          onClick={deleteTutorial}
          style={{ marginRight: '5px' }}
          > 
            Delete
          </button>

          <button
            type="submit"
            className="btn btn-success"
            onClick={updateTutorial}
            style={{ marginRight: '5px' }}
          >
            Update
          </button>

          <button className="btn btn-secondary" 
          onClick={navigateHome}
          style={{ marginRight: '5px' }}
          >
            Back
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Tutorial;