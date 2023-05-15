import React, { useState } from "react";
import TutorialDataService from "../services/TutorialService";
import { useNavigate } from "react-router-dom";

const AddTutorial = () => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    var data = {
      title: tutorial.title,
      description: tutorial.description,
      published: tutorial.published
    };

    TutorialDataService.create(data)
      .then(response => {
        setTutorial({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  const navigateHome = () => {
    navigate("/tutorials")
  }

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Tutorial submmited successfully!</h4>
          <button className="btn btn-primary" 
          onClick={newTutorial}
          style={{ marginRight: '5px' }}
          >
            Add new tutorial
          </button>
          <button className="btn btn-secondary" onClick={navigateHome}>
            Back
          </button>
        </div>
      ) : (
        <div>
          <h4>Add Tutorial</h4>

          <div className="form-group mb-2">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group mb-2">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={tutorial.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group d-flex flex-column mb-3">
            <label htmlFor="published" className="mr-3">Status</label>
            <select
              className="selectpicker ml-2"
              id="published"
              required
              value={tutorial.published}
              onChange={handleInputChange}
              name="published"
            >
              <option value="true">Published</option>
              <option value="false">Pending</option>
            </select>
          </div>

          <button onClick={saveTutorial} 
          className="btn btn-success"
          style={{ marginRight: '5px' }}
          >
            Submit
          </button>
          <button className="btn btn-secondary" 
          onClick={navigateHome}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;
