import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';

const UserMedia = () => {
   const {userId} = useParams();
   const [media, setMedia] = useState([]);
   useEffect(() => {
       fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${userId}`)
       .then(res => res.json())
       .then(data => setMedia(data))
   },[])
    return (
        <div>
            <div className="tc">
            <h1>Welcome</h1>
            <h5>Photo Gallery</h5>
            </div>
        <div className="w-100 flex flex-wrap justify-around ">
            {media.map((media,idx) => {
                return (
                        <div className="ba ma4 tc grow" style={{width: '300px'}}>
                        <img style={{width: '300px'}} src={media.thumbnailUrl} alt=""/>
                        <h4>{media.title}</h4>
                    </div>
                )
            })}
        </div>
        </div>
    );
};

export default UserMedia;