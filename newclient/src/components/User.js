import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { Fragment } from 'react';
import Axios from 'axios';
import userimg from '../images/user.png';
import IndividualUserBlogs from './IndividualUserBlogs';




export default function User() {

    const dispatch = useDispatch();
    const { username, email, loggedIn } = useSelector(state => state.user);

    //* Logout Function
    const LogOut = async () => {
        let { data } = await Axios.post('/logout')
        dispatch({ type: "UPDATEUSER", payload: data })
    }

    if (!loggedIn) return <Redirect to="/" />

    return (
        <Fragment>
            <div className="user">
                <div className="userimgcontainer">
                    <img src={userimg} alt="User" />
                </div>
                <div className="userinfo">
                    <div>{username}</div>
                    <div>{email}</div>
                    <button className="logout" onClick={LogOut}>Logout</button>
                </div>
            </div>

            <div className="userblogstitle">Your Blogs : </div>
            <IndividualUserBlogs username={username} />
        </Fragment>
    )
}
