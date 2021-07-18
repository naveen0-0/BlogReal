import React, { useState } from 'react';
import newblogimg from '../images/newblog.svg';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';


export default function NewBlog() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [keywordOne, setKeyWordOne] = useState("");
    const [keywordTwo, setKeyWordTwo] = useState("");
    const [keywordThree, setKeyWordThree] = useState("");
    const [msg, setMsg] = useState("");
    const [created, setCreated] = useState(false);


    const { username, loggedIn } = useSelector(state => state.user);

    const NewBlogSubmit = async e => {
        e.preventDefault();
        let { data } = await axios.post('/newblog', { title, description, keywordOne, keywordTwo, keywordThree, username });
        setMsg(data.msg);
        setTitle(data.title);
        setDescription(data.description);
        setKeyWordOne(data.keywordOne);
        setKeyWordTwo(data.keywordTwo);
        setKeyWordThree(data.keywordThree);
        setCreated(data.created);
    }


    if (!loggedIn) return <Redirect to="/" />
    if (created) return <Redirect to="/" />


    return (
        <div className="newblogcontainer">
            <img src={newblogimg} alt="Newblog" className="newblogimg" />
            <div className="newblogformcontainer">
                <div className="newblogheading">Create a Blog</div>
                {msg ? (<div className="newblogmsg">{msg}</div>) : null}
                <form className="newblogform" onSubmit={NewBlogSubmit} encType="multipart/form-data">
                    <input
                        type="text"
                        className="newblogtitle"
                        placeholder="Enter the title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />

                    <textarea
                        className="newblogdescription"
                        cols="30"
                        required
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Enter the description"
                        rows="10">
                    </textarea>


                    <div className="newblogkeywords">
                        <input
                            type="text"
                            placeholder="Enter a keyword"
                            className="newblogkeyword"
                            value={keywordOne}
                            onChange={e => setKeyWordOne(e.target.value)}
                            required />

                        <input
                            type="text"
                            placeholder="Enter a keyword"
                            className="newblogkeyword"
                            value={keywordTwo}
                            onChange={e => setKeyWordTwo(e.target.value)}
                            required />

                        <input
                            type="text"
                            placeholder="Enter a keyword"
                            className="newblogkeyword"
                            value={keywordThree}
                            onChange={e => setKeyWordThree(e.target.value)}
                            required />
                    </div>

                    <input type="submit" value="Create a blog" className="newblogsubmit" />

                </form>
            </div>
        </div>
    )
}
