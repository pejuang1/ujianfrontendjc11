import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import {connect} from 'react-redux'
import {FiShoppingCart} from 'react-icons/fi'
import Gambar from '../img/logohead.png'
import Background from './backgroun'

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  
  return (
    <div >
      <Navbar className='bodyku stars stars2 stars3' light expand="md">
        <NavbarBrand href="/"><img src={Gambar} style={{height:50, width:150}} alt=""/></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto"  navbar>
            {props.roleUser==='admin'?
            
            <NavItem className='stile'>
              <NavLink className='btn btn-outline-primary mr-3' href="/admin/" style={{color:'white'}}>Manage Admin</NavLink>
              <NavLink className='btn btn-outline-primary' href="/managestudio/" style={{color:'white'}}>Manage Studio</NavLink>
            </NavItem>
            :
            null
            }

              {props.roleUser==='user'?
              
              <NavItem className='stile'>
                <NavLink className='btn btn-outline-primary mr-3' style={{color:'white'}} href="/history/">History Belanja</NavLink>
              <NavLink className='btn btn-outline-primary mr-2' style={{color:'white'}} href="/cart/"><FiShoppingCart style={{color:'red'}}/> {props.carts}</NavLink>
            </NavItem>
            
            :
            null
          }
            {props.namauser===''?
            
            
            <NavItem className='stile'> 
              <NavLink className='btn btn-outline-primary mr-3' href="/admin/" style={{color:'white'}} href="/register/">Register</NavLink>
    
                <NavLink className='btn btn-outline-primary' href="/admin/" style={{color:'white'}} href="/login">Login</NavLink>
              </NavItem>
            
            
            :
            null
          }
            {
              props.namauser===''?
              null
              :
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret style={{color:'white'}}>
                {props.namauser}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href='/setting'>
                  Setting
                </DropdownItem>
                <DropdownItem href='/' onClick={()=>onSignOutClick()}>
                  Logout
                </DropdownItem>
                <DropdownItem divider />
              </DropdownMenu>
            </UncontrolledDropdown>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

const onSignOutClick=()=>{
  localStorage.clear()
  window.location.reload()
}

const MapstateToprops=(state)=>{
  return{
    namauser:state.Auth.username,
    roleUser:state.Auth.role,
    carts:state.Auth.cart
  }
}

export default connect (MapstateToprops) (Header);