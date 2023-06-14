import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Navbar.css";
// value -> link, name -> wyświetlana nazwa
class BarElement extends React.Component {
  render() {
    return (
      <Nav.Link href={this.props.value}><h1>{this.props.name}</h1></Nav.Link>
    );
  }
}
const Bar = () => {
  return (
    <Navbar>
      <Container className="Navbar">
        <Nav className="links">
          <img src='/resources/logo.png' alt="logo"></img>
          <BarElement value="profile" name='Profil' ></BarElement>
          <BarElement value="consultations" name='Konsultacje'></BarElement>
          <BarElement value="reservations" name='Rezerwacje'></BarElement>
          <BarElement value="administration" name='Administracja'></BarElement>
          <BarElement value="result" name='Szukaj'></BarElement>
          <BarElement value="logout" name='Wyloguj'></BarElement>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Bar;