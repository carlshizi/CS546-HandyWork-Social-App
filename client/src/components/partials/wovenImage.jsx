import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import axios from "axios";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";


export default function TitlebarBelowMasonryImageList() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [items, setItems] = useState([]);

  useEffect(() => {

    const getUsers = async () => {
      let arr = []
      const list = await axios
      .get(`http://localhost:5000/api/user/all/user/${currentUser.other._id}`)
      .catch((error) => console.log(error));
      if (list) {
          // console.log("Users: ", list.data[1]);
          for(let i = 1; i < list.data.length; ++i){
              let temp = {
                img: list.data[i].image,
                title: list.data[i].username,
                author: list.data[i].username
              }
              arr.push(temp)
            // console.log(list.data[i].username)
          }
          setItems(arr);
      }
    };
    getUsers();
  }, []);

  // console.log(items)

  return (
    <Box sx={{ width: 400, height: 350, overflowY: 'scroll' }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {items.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar position="below" title={item.author} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}


