import React, { Component } from 'react';
import {NavLink} from 'reactstrap'


class Header2 extends Component {
    state = {  }
    render() { 
        return ( 
            <div className='header'>
            <div className='atas'>
                <NavLink href="/"><div className='btn'>Home</div></NavLink>
                <NavLink href="/Login" className='btn btn-outline-primary mr-2 signup'>SignUp</NavLink>
                <NavLink href="/Loginku" className='btn btn-outline-primary login'>SignIn</NavLink>
            </div>
            </div>
         );
    }
}
 
export default Header2;