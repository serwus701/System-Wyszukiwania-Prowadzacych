import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Navbar.css";
// value -> link, 
// name -> wyświetlana nazwa, 
// access -> widoczność przed/po zalogowaniu
class BarElement extends React.Component {
  render() {
    const isLogged = false;
    if(isLogged) {
      if(this.props.access === 'private'){
        return (
          <Nav.Link href={this.props.value}><h1>{this.props.name}</h1></Nav.Link>
        );
      }
    } else if(this.props.access === 'public'){
      return (
        <Nav.Link href={this.props.value}><h1>{this.props.name}</h1></Nav.Link>
      );
    }
    
  }
}
const Bar = () => {
  return (
    <Navbar>
      <Container className="Navbar">
        <Nav className="links">
        <img src='/resources/logo.png' alt="logo"></img>
          <BarElement value="profile" name='Profil' access='private' ></BarElement>
          <BarElement value="consultations" name='Konsultacje' access='private'></BarElement>
          <BarElement value="reservations" name='Rezerwacje' access='private'></BarElement>
          <BarElement value="administration" name='Administracja' access='private'></BarElement>
          <BarElement value="logout" name='Wyloguj' access='private'></BarElement>
          <BarElement value="login" name='Zaloguj' access='public'></BarElement>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Bar;