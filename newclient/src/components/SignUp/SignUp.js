import React, { useState } from 'react';
import styles from './SignUp.module.css';
import authen1 from '../../images/authen1.svg';
import axios from 'axios';
import personimg from '../../images/username.png';
import emailimg from '../../images/email.png';
import lockimg from '../../images/lock.png';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'


export default function SignUp() {

    const { loggedIn } = useSelector(state => state.user)

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [msg, setMsg] = useState("");


    const SignUpSubmit = async e => {
        e.preventDefault();
        let { data } = await axios.post("/signup", { username, email, password, confirmPassword });
        setMsg(data.msg);
    }

    if (loggedIn) return <Redirect to="/" />

    return (
        <div className={styles.signupformcontainer}>
            <div className={styles.authen1container}><img src={authen1} alt="SignUp" className={styles.authen1} /></div>

            <div className={styles.signupformminicontainer}>
                <form className={styles.signupform} onSubmit={SignUpSubmit}>
                    <div className={styles.signuptitle}>Sign Up</div>

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


                        <div className={styles.emailContainer}>
                            <input
                                type="email"
                                className={styles.email}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                placeholder="Enter Your Email" />
                            <div className={styles.emailicon}><img src={emailimg} alt="Email" className={styles.emailsvg} /></div>

                        </div>

                        <div className={styles.passwordContainer}>
                            <input
                                type="password"
                                className={styles.password}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                autoComplete="New Password"
                                required
                                placeholder="Enter Your Password" />
                            <div className={styles.passwordicon}><img src={lockimg} alt="Lock" className={styles.locksvg} /></div>
                        </div>

                        <div className={styles.passwordContainer}>
                            <input
                                type="password"
                                className={styles.confirmPassword}
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                autoComplete="New Password"
                                required
                                placeholder="Confirm Your Password" />
                            <div className={styles.passwordicon}><img src={lockimg} alt="Lock" className={styles.locksvg} /></div>
                        </div>

                        <input type="submit" value="Signup" className={styles.signupbutton} />
                    </div>


                </form>
            </div>
        </div>
    )
}