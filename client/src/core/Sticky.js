import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenciate } from '../auth/index';

const Sticky = () => (
    <>
        <div id="mybutton" style={style}>
        {isAuthenciate() && (
            <Link style={btn} className="btn bg-alert" to={`/post/create`}><i className="fa fa-plus"></i></Link>
        )}
        </div>
    </>
)


const style = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: "999"
}

const btn = {
    backgroundColor:" #4CAF50",
    border: "none",
    color: "white",
    padding: "20px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 2px",
    borderRadius: "70%"
}

// const btn = {
//     backgroundColor:" #4CAF50",
//     display: "inline-block",
//     height: "40px",
//     width: "25px",
//     display: "inline-block",
//     textAlign: "center",
//     borderRadius: "50%",
//     border: "none"
// }

export default Sticky;