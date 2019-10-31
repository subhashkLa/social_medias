import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenciate, Signout } from '../auth/index';

const isActive = (history, path) => {
    if(history.location.pathname === path) return { color: "#1C1D21" };
    else return { color: "#ffffff" };
};

const Menu = ({history}) => (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/")}  to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/user")}  to="/user">User</Link>
            </li>
            { isAuthenciate() && (
                <>
                <li className="nav-item">
                    <Link className="nav-link" to={`/user/${isAuthenciate().user._id}`} 
                    style={isActive(history, `/user/${isAuthenciate().user._id}`)} >{isAuthenciate().user.name } Profile</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, `/user/post/${isAuthenciate().user._id}`)} to={`/user/post/${isAuthenciate().user._id}`}><i className="fa fa-plus"></i></Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link" style={isActive(history, "/signout")} 
                            onClick={() => Signout(() => history.push('/signin'))}>
                    Signout
                    </a>
                </li>
                </>
            )}
            { !isAuthenciate()  && (
                <>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">Signin</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">Signup</Link>
                </li>
                </>
            )}
        </ul>
    </div>
);

export default withRouter(Menu);