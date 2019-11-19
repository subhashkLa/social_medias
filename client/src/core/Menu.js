import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenciate, Signout } from '../auth/index';

// const isActive = (history, path) => {
//     if(history.location.pathname === path) return { color: "#1C1D21" };
//     else return { color: "#ffffff" };
// };

const Menu = ({history}) => (
    <div>
        {/* <nav className="navbar navbar-expand-sm bg-light fixed-top mynavbar">
            <div className="container">
                <button className="btn btn-success bars">
                    <span><i className="fa fa-bars" style={{ color: "black"}} ></i></span>
                </button>
                <div className="navbar-brand">
                    
                </div>      
                <ul className="nav justify-content-center">
                    <form className="form-inline">
                        <input className="form-control mr-sm-2 search" type="text" placeholder="Search" />
                        <button className="btn btn-light btn-raised search" type="submit"><i className="fa fa-search" style={{ color: "black"}}></i></button>
                    </form> 
                 </ul>   
                <ul className="nav justify-content-end linkss">
                    <li className="nav-item">
                    </li>
                        <>
                        <li className="nav-item">
                        </li>
                        <li className="nav-item">
                        </li>
                        </>
                     
                    {
                        <>
                        <li className="nav-item">
                        </li>
                        <li className="nav-item">
                        </li>
                        </>
                     )}
                </ul>
            </div>
        </nav> */}
        <header className="header">
                <Link to="/"><img alt="menu" width="200" height="70" className="logo" src="https://cdn2.f-cdn.com/contestentries/1295465/14376482/5ac3d4cdc34ab_thumb900.jpg" /></Link>
            {/* <a href="" class="logo">CSS Nav</a> */}
                <input className="menu-btn" type="checkbox" id="menu-btn" />
                <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
                <ul className="menu">
                    <li>
                        <Link className="nav-link" to="/user">User</Link>                   
                    </li>
                    {isAuthenciate() && (
                        <>
                        <li>
                            <Link className="nav-link" to={`/user/${isAuthenciate().user._id}`}>Profile</Link>                   
                        </li>
                        <li>
                            <a className="nav-link" href="#0" onClick={() => Signout(() => ("/signin"))}>SignOut</a>                   
                        </li>
                        </>
                    )}
                    {!isAuthenciate() && (
                        <>
                        <li>
                            <Link className="nav-link" to="/signin">SignIN</Link>                   
                        </li>
                        <li>
                            <Link className="nav-link" to="/signup">SignUP</Link>                   
                        </li>
                        </>
                    )}
                </ul>
            </header>
    </div>
);

export default withRouter(Menu);