import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import './User.css'
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });


const User = () => {
  const history = useHistory();
  const profileHandler = (userId) => {
    history.push(`./user/${userId}`);
  }
    const classes = useStyles();
   const [user,setUser] = useState([]);
   useEffect(() => {
       fetch('https://jsonplaceholder.typicode.com/users')
       .then(res => res.json())
       .then(data => setUser(data))
   },[])
  
    return (
        <>
        {user.map(user => {
            const {name,id} = user;
            return <Card className={classes.root} style={{margin: '50px'}} key={id}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={`https://joeschmoe.io/api/v1/${name}`}
                title={`${name} Profile`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ducimus fugiat corrupti culpa perferendis veritatis dolorem ullam doloribus similique facere.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button onClick={() => profileHandler(id)} size="small" variant="contained" color="primary">
                Show Profile
              </Button>
            </CardActions>
          </Card>
        })}
    </>
    );
};

export default User;