import React, { useState, useEffect } from 'react';
import newblogimg from '../images/newblog.svg';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';


export default function EditBlog({ match }) {

    const id = match.params.id;
    const blogUsername = match.params.username;

    const { username, loggedIn } = useSelector(state => state.user);


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [keywordOne, setKeyWordOne] = useState("");
    const [keywordTwo, setKeyWordTwo] = useState("");
    const [keywordThree, setKeyWordThree] = useState("");
    const [msg, setMsg] = useState("");
    const [edited, setEdited] = useState(false)



    const EditBlogSubmit = async e => {
        e.preventDefault();
        let { data } = await axios.post(`/edit/${id}`, { title, description, keywordOne, keywordTwo, keywordThree, username });
        setMsg(data.msg); setTitle(data.title); setDescription(data.description); setKeyWordOne(data.keywordOne);
        setKeyWordTwo(data.keywordTwo); setKeyWordThree(data.keywordThree); setEdited(data.edited)
    }

    useEffect(() => {
        let source = axios.CancelToken.source();
        const getBlog = async () => {
            try {
                const { data } = await axios.get(`/blog/${id}`, { cancelToken: source.token })
                setTitle(data.title);
                setDescription(data.description);
                setKeyWordOne(data.keywordOne);
                setKeyWordTwo(data.keywordTwo);
                setKeyWordThree(data.keywordThree);

            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("Caught Cancel");
                } else {
                    throw error;
                }
            }
        }

        getBlog();
        return () => {
            source.cancel();
        }

    }, [id]);


    if (!loggedIn) return <Redirect to="/" />
    if (username !== blogUsername) return <Redirect to="/" />
    if (edited) return <Redirect to="/" />

    return (
        <div className="newblogcontainer">
            <img src={newblogimg} alt="Newblog" className="newblogimg" />
            <div className="newblogformcontainer">
                <div className="newblogheading">Edit the Blog</div>
                {msg ? (<div className="newblogmsg">{msg}</div>) : null}
                <form className="newblogform" onSubmit={EditBlogSubmit} encType="multipart/form-data">
                    <input
                        type="text"
                        className="newblogtitle"
                        placeholder="Edit the title"
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
                        placeholder="Edit the description"
                        rows="10">
                    </textarea>


                    <div className="newblogkeywords">
                        <input
                            type="text"
                            placeholder="Edit the keyword"
                            className="newblogkeyword"
                            value={keywordOne}
                            onChange={e => setKeyWordOne(e.target.value)}
                            required />

                        <input
                            type="text"
                            placeholder="Edit the keyword"
                            className="newblogkeyword"
                            value={keywordTwo}
                            onChange={e => setKeyWordTwo(e.target.value)}
                            required />

                        <input
                            type="text"
                            placeholder="Edit the keyword"
                            className="newblogkeyword"
                            value={keywordThree}
                            onChange={e => setKeyWordThree(e.target.value)}
                            required />
                    </div>

                    <div className="editbloglinks">
                        <input type="submit" value="Edit" className="newblogsubmit" />
                        <Link to="/" className="editcancel">Cancel</Link>
                    </div>

                </form>
            </div>
        </div>
    )
}
