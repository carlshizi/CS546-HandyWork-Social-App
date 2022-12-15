import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; 
// import useFetchHandyMen from '../data/useFetchHandyMen';
import { Container } from 'react-bootstrap';
import HandyManComponent from './HandyManComponent';

// let pic = "https://img.freepik.com/free-vector/concept-handyman-worker_98292-1125.jpg?w=2000";
// let handyMen = [{id: 1, name: "Greg", location: "Nutley, NJ", description: "Hi! I have 2 years of experience and am willing to work anywhere in the Tri-State", pic: pic}, {id: 2, name: "Kola", location: "Raleigh, NC", description: "3 years experience. I specialize in kitchen remodeling", pic: pic}];

function HandyManPage() {
  const location = useLocation();
  const handyMen = location.state.handyMen;

  return (
    <Container>
      <div className="returnNum">{`Total results returned: ${handyMen.length}`}</div>
      {handyMen.map(handyMan => {
        return <HandyManComponent key={handyMan._id} handyMan={handyMan} />
      })}
    </Container>
  );
}

export default HandyManPage;