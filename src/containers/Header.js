import React, {Component} from 'react';
import {
  Container, Row, Col, Navbar, Nav,
  NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
import logo from '../logo.png';

const LOGO = 'https://www.gravatar.com/avatar/429e504af19fc3e1cfa5c4326ef3394c?s=240&d=mm&r=pg';

class Header extends Component {

  render() {
    return (
      <header>
          <Navbar fixed="top" color="light" light expand="xs" className="border-bottom border-gray bg-white" style={{ height: 80 }}>
          
            <Container>
              <Row noGutters className="position-relative w-100 align-items-center">
              
                <Col className="d-none d-lg-flex justify-content-start">
                  <Nav className="mrx-auto" navbar>
                  
                  <UncontrolledDropdown className="d-flex align-items-center" nav inNavbar>
                      <DropdownToggle className="font-weight-bold" nav caret>
                      <img src={LOGO} alt="avatar" className="img-fluid rounded-circle" style={{ width: 36 }} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem className="font-weight-bold text-secondary text-uppercase" header disabled>My Profile</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Dashboard</DropdownItem>
                        <DropdownItem>Edit Profile</DropdownItem>
                        <DropdownItem>Change Password</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    
                    <NavItem className="d-flex align-items-center">
                      <NavLink className="font-weight-bold" href="/">Home</NavLink>
                    </NavItem>
                    
                    <NavItem className="d-flex align-items-center">
                      <NavLink className="font-weight-bold" href="/">Weekly Ad</NavLink>
                    </NavItem>
                    
                  </Nav>
                </Col>
                
                <Col className="d-flex justify-content-xs-start justify-content-lg-center">
                  <NavbarBrand className="d-inline-block p-0" href="/" style={{ width: 120 }}>
                    <img src={logo} alt="logo" className="position-relative img-fluid" />
                  </NavbarBrand>
                </Col>
                
                
                
              </Row>
            </Container>
            
          </Navbar>
        </header>
    );
  }

}

export default Header;