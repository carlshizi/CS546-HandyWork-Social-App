import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import axios from "axios";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CardActionArea } from '@mui/material';


export default function TitlebarBelowImageList() {
    const { user: currentUser } = useSelector((state) => state.auth);
  const [items, setItems] = useState([]);

  useEffect(() => {

    const getUsers = async () => {
      let arr = []
      const list = await axios
        .get(`http://localhost:5000/api/user/fof/user/${currentUser.other._id}`)
        .catch((error) => console.log(error));
      if (list) {
        // console.log("Users: ", list.data[1]);
        for (let i = 1; i < list.data.length; ++i) {
          let temp = {
            id: list.data[i][0]._id,
            img: list.data[i][0].image,
            title: list.data[i][0].email,
            author: list.data[i][0].username
          }
          arr.push(temp)
        //   console.log(list.data[i][0].image)
        }
        setItems(arr);
      }
    };
    getUsers();
  }, []);

  return (
    <ImageList sx={{ width: 300, height: 350 }}>
      {items.map((item) => (
       <CardActionArea href= {`http://localhost:3000/user/${item.author}`} > 
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
            component={ Link }
            to="/"
          />
          <ImageListItemBar
            title={item.author}
            subtitle={<span>{item.title}</span>}
            position="below"
          />
        </ImageListItem></CardActionArea>
      )
      )}
    </ImageList>
  );
}
