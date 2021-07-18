import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import userimg from '../images/user.png'


export default function NavBar() {

    const { loggedIn } = useSelector(state => state.user);

    return (
        <div className="navbar">
            <Link className="navbartitle" to="/">
                BlogReal
            </Link>
            {loggedIn ?
                (<div className="navbarlinks">
                    <Link to="/user"><img src={userimg} alt="UserDP" className="userImg" /></Link>
                    <Link to="/newblog" className="newblog">New Blog</Link>
                </div>) :
                (
                    <div className="navbarlinks">
                        <Link to="/signup" className="signuplink">Signup</Link>
                        <Link to="/login" className="loginlink">Login</Link>
                    </div>
                )
            }
        </div>
    )
}


