import Scroll from './Scroll';
import SearchList from './SearchList';
import { useSelector } from "react-redux";
import { delete_cookie } from 'sfcookies'
import React, { useState, useEffect } from "react";
import axios from "axios";

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
            for(let i = 0; i < list.data.length; ++i){
                let temp = {
                  id: list.data[i]._id,
                  imgPath: list.data[i].image,
                  name: list.data[i].username,
                  email: list.data[i].email,
                  address: list.data[i].email
                }
                arr.push(temp)
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
    if(e.target.value===""){
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
          {/* <a href="http://www.hotmail.com"></a> */}
	  			<SearchList filteredPersons={filteredPersons} />
	  		</Scroll>
	  	);
	  }
  }

  return (
    <section className="garamond">
			<div className="navy georgia ma0 grow">
				<h2 className="f2">Search for Users</h2>
			</div>
			<div className="pa2">
				<input 
					className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
					type = "search" 
					placeholder = "Search People" 
					onChange = {handleChange}
				/>
			</div>
			{searchList()}
		</section>
  );
}

export default Search;
