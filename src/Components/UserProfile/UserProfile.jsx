import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './UserProfile.css'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';

const UserProfile = () => {
  
   const {userId} = useParams();
  const [userProfile,setUserProfile] = useState([]);
  useEffect(() => {
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(res => res.json())
      .then(data => setUserProfile(data))
  },[])
  console.log(userProfile)
  const {name,email,address,phone} = userProfile;
  const history = useHistory();
  const handlePost = (userId) => {
    history.push(`/user/${userId}/posts`)
  }
  const handleMedia = (userId) => {
    history.push(`/user/${userId}/media`)
  } 
    return (
      <div>
           {/* card */}
           <div className="container grow">
      <div className="cover-photo">
        <img src={`https://joeschmoe.io/api/v1/${name}`} className="profile"></img>
      </div>
    <div className="profile-name">{name}</div>
      <p className="about">Programming Hero Student<br/>front-end developer</p>
    <p className="about">{email}</p>
      <button onClick={() => handleMedia(userId)} className="media-btn">Media</button>
      <button onClick={() => handlePost(userId)} className="post-btn">Posts</button>
      <div>
        <i><FacebookIcon/></i>
        <i><InstagramIcon/></i>
        <i><YouTubeIcon/></i>
        <i><TwitterIcon/></i>
      </div>
    </div>
           {/* card */}
           <p className="tc f4 i lh-copy">
             Hello, I am {name}. I live in {name && address.city}, {name && address.street}, {name && address.suite}
             <br/>
             My phone number <small>{phone}</small>
           </p>
      </div>
    );
};

export default UserProfile;