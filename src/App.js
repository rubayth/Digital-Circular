import React from 'react'
import OfferList from './components/Offers';
import Header from './components/Header';
import { Container } from 'reactstrap';

function App() {
  return (
    <Container className="my-5 py-5">
      <Header />
      <OfferList />
    </Container>
    
  );
}

export default App;
