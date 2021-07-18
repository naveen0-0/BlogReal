import React, { Fragment, useEffect } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css'
import HomePage from './components/HomePage';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import NavBar from './components/NavBar';
import User from './components/User';
import NewBlog from './components/NewBlog';
import FullBlog from './components/FullBlog';
import EditBlog from './components/EditBlog';


export default function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        const GetUser = async () => {
            let { data } = await Axios.get('/getuser');
            dispatch({ type: "UPDATEUSER", payload: data })
        }
        GetUser()
    }, [dispatch])


    return (
        <Fragment>
            <Router>
                <NavBar />
                <Route path="/" exact component={HomePage} />
                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={Login} />
                <Route path="/user" component={User} />
                <Route path="/newblog" component={NewBlog} />
                <Route path="/blog/:id" component={FullBlog} />
                <Route path="/edit/:id/:username" component={EditBlog} />
            </Router>
        </Fragment>
    )
}

