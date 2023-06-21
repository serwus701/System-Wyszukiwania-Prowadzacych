import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Navbar.css";
// value -> link, 
// name -> wyświetlana nazwa, 
// access -> widoczność przed/po zalogowaniu
function handleLogout(params) {
  localStorage.removeItem("PROFILE")
} 
class BarElement extends React.Component {
  
  render() {

    if(localStorage.getItem("PROFILE")) {
      if(this.props.access === 'private'){
        if(this.props.name === 'Wyloguj'){
          return (
          <Nav.Link href={this.props.value} onClick={handleLogout}><h1>{this.props.name}</h1></Nav.Link>
          );
        } else
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
          <a href='/'><img src='/resources/logo.png' alt="logo"></img></a>
          <BarElement value="profile" name='Profil' access='private' ></BarElement>
          <BarElement value="consultations" name='Konsultacje' access='private'></BarElement>
          <BarElement value="reservations" name='Rezerwacje' access='private'></BarElement>
          <BarElement value="administration" name='Administracja' access='private'></BarElement>
          <BarElement value="/" name='Szukaj' access='private'></BarElement>
          <BarElement value="/" name='Wyloguj' access='private'></BarElement>
          <BarElement value="login" name='Zaloguj' access='public'></BarElement>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Bar;