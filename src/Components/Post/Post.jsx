import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box } from '@material-ui/core';

const Post = () => {
   const {userId} = useParams()
    const [posts, setPosts] = useState([])
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(res => res.json())
        .then(data => setPosts(data))
    },[])
    console.log(posts);
  
    //bangla style
    const [userProfile,setUserProfile] = useState([]);
  useEffect(() => {
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(res => res.json())
      .then(data => setUserProfile(data))
  },[])
    const {name} = userProfile;
    return (
        <div>
            <h4>{name} Post List:</h4>
            <ol>
            {posts.map((post,idx) => {
                const {title,id} = post;
            return <Link to={`/user/${userId}/posts/${id}`} key={idx} className="link f3 ma3 b">
                <Box color='text.primary' clone>
                     <li >{title}</li>
                </Box>
            </Link>
            })}
            </ol>
        </div>
    );
};

export default Post;