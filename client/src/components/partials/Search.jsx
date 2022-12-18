import Scroll from './Scroll';
import SearchList from './SearchList';
import { useSelector } from "react-redux";
import { delete_cookie } from 'sfcookies'
import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { Navigate } from 'react-router-dom';
import SimpleBottomNavigation from './bottom'


function Search() {

  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const cookie_key = "navigate"   // clear cookie for navigating to reset page
  delete_cookie(cookie_key)
  const [details, setItems] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      let arr = []
      const list = await axios
        .get(`http://localhost:5000/api/user/all/users`)
        .catch((error) => console.log(error));
      if (list) {
        // console.log("Users: ", list.data[1]);
        for (let i = 0; i < list.data.length; ++i) {
          if(currentUser.other._id !== list.data[i]._id){
            let temp = {
              id: list.data[i]._id,
              imgPath: list.data[i].image,
              name: list.data[i].username,
              email: list.data[i].email,
              address: list.data[i].email
            }
            arr.push(temp)            
          }

          // console.log(list.data[i].username)
        }
        setItems(arr);
      }
    };
    getUsers();
  }, []);


  const filteredPersons = details.filter(
    person => {
      return (
        person
          .name
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        person
          .email
          .toLowerCase()
          .includes(searchField.toLowerCase())
      );
    }
  );

  const handleChange = e => {
    setSearchField(e.target.value);
    if (e.target.value === "") {
      setSearchShow(false);
    }
    else {
      setSearchShow(true);
    }
  };

  function searchList() {
    if (searchShow) {
      return (
        <Scroll>
          <br></br>
          <SearchList href="hotmail.com" filteredPersons={filteredPersons} />
        </Scroll>
      );
    }
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (

    <section className="garamond">
      <div className="navy georgia ma0 grow">
        {/* <h2>Search for Users</h2> */}
      </div>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, height: 50 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search People"
          onChange={handleChange}

        />
      </Paper>
      {searchList()}
    </section>
  );
}

export default Search;
