import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { NavBar } from '../components'
import { TutorialsList, TutorialCreate, TutorialUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/tutorials/list" exact component={<TutorialsList/>} />
                <Route path="/tutorials/create" exact component={<TutorialCreate/>} />
                <Route
                    path="/tutorials/update/:id"
                    exact
                    component={<TutorialUpdate/>}
                />
            </Routes>
        </Router>
    )
}

export default App
