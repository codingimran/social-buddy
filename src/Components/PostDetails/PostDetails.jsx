import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const PostDetails = () => {
    const classes = useStyles();
   const {postId,userId} = useParams();
  const [postDetails,setPostDetails] = useState([]);
  useEffect(() => {
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(res => res.json())
      .then(data => setPostDetails(data));
  },[])
  const {title,body} = postDetails;
  //bangla style
  // sir context api diye cesta korci user er data pass korar jonno kinto pari nai.tai user id parameter diye kaj calaise.
  const [userProfile,setUserProfile] = useState([]);
  useEffect(() => {
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(res => res.json())
      .then(data => setUserProfile(data))
  },[])
    const {name} = userProfile;
    //comments
   const [comments,setComments] = useState([]);
   useEffect(() => {
     fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
     .then(res => res.json())
     .then(data => setComments(data))
   },[])
   console.log(comments);

   const [commentShow,setCommentShow] = useState(false);
   const commentsList = () => {
     return(
      <div>
      {comments.map((cm,idx) => {
        const {id,name,email,body} = cm;
        return(
          <div className="center mt4 mb3 grow" key={idx} style={{width: '30rem'}}>
            <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Comment {id}
        </Typography>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary" className="flex">
          <img src={`https://joeschmoe.io/api/v1/${email}`} alt="Profile" className="w3 bg-light-purple" style={{borderRadius: "50%"}}/>
        <span className='self-center ml3'>{email}</span>
        </Typography>
        <Typography variant="body2" component="p" className="tc">
          <span className="ma4 b">
          {body}
          </span>
        </Typography>
      </CardContent>
    </Card>
          </div>
          )
      })}
    </div>
     )
   }
   
    return ( <div> 
        <Card className={classes.root} style={{maxWidth: '40rem', margin: '0 1rem'}}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Post {postId}
        </Typography>
        <Typography variant="h5" component="h2">
            {title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary" className="flex">
        <img src={`https://joeschmoe.io/api/v1/${name}`} alt={name} className="w2 br4 bg-light-purple"/> <span className="self-center ml3">{name}</span>
        </Typography>
        <Typography variant="body2" component="p">
          {body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => setCommentShow(true)} variant='outlined' color="secondary" size="small">Show Comments</Button>
      </CardActions>
    </Card>
    {/* comment */}
    {commentShow && commentsList()}
            </div>
    );
};

export default PostDetails;