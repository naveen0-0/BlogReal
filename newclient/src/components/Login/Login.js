import React, { useState } from 'react';
import styles from './Login.module.css';
import authen2 from '../../images/authen2.svg';
import personimg from '../../images/username.png';
import lockimg from '../../images/lock.png';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'


export default function Login() {

    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const { loggedIn } = useSelector(state => state.user)

    const LoginSubmit = async e => {
        e.preventDefault();
        let { data } = await axios.post('/login', { username, password });
        setMsg(data.msg);
        dispatch({ type: "UPDATEUSER", payload: { username: data.username, email: data.email, loggedIn: data.loggedIn } })
    }


    if (loggedIn) return <Redirect to="/" />


    return (
        <div className={styles.signupformcontainer}>
            <div className={styles.authen1container}><img src={authen2} alt="Login" className={styles.authen1} /></div>

            <div className={styles.signupformcontainer}>
                <form className={styles.signupform} onSubmit={LoginSubmit}>
                    <div className={styles.signuptitle}>Login</div>

                    {msg && <div className={styles.msg}>{msg}</div>}

                    <div className={styles.inputfields}>
                        <div className={styles.usernameContainer}>
                            <input
                                type="text"
                                className={styles.username}
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                                placeholder="Enter Your Username" />

                            <div className={styles.personicon}><img src={personimg} alt="Person" className={styles.personsvg} /></div>
                        </div>



                        <div className={styles.passwordContainer}>
                            <input
                                type="password"
                                className={styles.password}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                autoComplete="New Password"
                                placeholder="Enter Your Password" />
                            <div className={styles.passwordicon}><img src={lockimg} alt="Lock" className={styles.locksvg} /></div>
                        </div>



                        <input type="submit" value="Login" className={styles.signupbutton} />
                    </div>


                </form>
            </div>
        </div>
    )
}
