import React, { useState } from 'react';
import useFetchHandyMen from '../data/useFetchHandyMen';
import { Container } from 'react-bootstrap';
import HandyManComponent from './HandyManComponent';


function HandyManPageComponent() {
  const { handyMen } = useFetchHandyMen();

  return (
    <Container>
      {handyMen.map(handyMan => {
        return <HandyManComponent key={handyMan.id} handyMan={handyMan} />
      })}
    </Container>
  );
}

export default HandyManPageComponent;