import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import '../Login/login.css';
const Nav = () => {
    let isActive = location.pathname === '/' ? true : false;
    return (
        <>
            <img src="images/logo.jpg" className="img-fluid" />
            <div className="Tab">
                <NavLink to="/login"  activeClassName="activeLink" className={isActive? 'signIn activeLink' : 'signIn'}>Login</NavLink>
                <NavLink to="/register" activeClassName="activeLink" className="signUp">Register</NavLink>
            </div>
        </>
    )
}
export default withRouter(Nav);