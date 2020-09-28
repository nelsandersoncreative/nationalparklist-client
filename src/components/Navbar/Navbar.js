import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../contexts/AppContext';
import { withAppContext } from '../../contexts/AppContext';

// the navbar component -- rendered at the top of the page in every view of the app
const Navbar = () => {
  
  const appContext = useContext(AppContext);
  const { showModalFunc, showLoginFunc, logout, hasAuth } = appContext;
  
  return (
      <nav className="navbar bg-primary">
        <h1 className="navbar-main"><i className="fas fa-tree"/> National Park List</h1>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          {hasAuth ? null : <li><Link to='/' onClick={showModalFunc}>Signup</Link></li>}
          <li>
            {hasAuth ? <Link to='/' onClick={logout}>Logout</Link> : <Link to='/' onClick={showLoginFunc}>Login</Link>}
          </li>
        </ul>
      </nav>
    )
}

export default withAppContext(Navbar);
