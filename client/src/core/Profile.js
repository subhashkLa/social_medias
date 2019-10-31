import React, { Component } from 'react';
import { isAuthenciate, read } from '../auth/index';
import { Redirect, Link } from 'react-router-dom';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: "",
            redirectToSigin: false
        }
    }

    init = userId => {
        const token = isAuthenciate().token;
        read(userId, token)
        .then(data => {
            if(data.error) {
                this.setState({ redirectToSigin: true })
            }else {
                this.setState({ user: data })
            }
        });
    }
    
    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    componentWillReceiveProps(props) {
        const userId = props.match.params.userId;
        this.init(userId);
    }

    render() {
        const { redirectToSigin, user} = this.state;
             if(redirectToSigin) return <Redirect to="/signin" />
       
        return(
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <div className="row">
                    <div className="col-md-6">
                        <img className="img-fluid" widht="10" height="10" alt="Card image cap" />
                    </div>
                    <div className="col-md-6">
                        <div className="lead">
                            <p style={{ color: "white"}}>Hello, {user.name}</p>
                            <p style={{ color: "white"}}>Email : {user.email}</p>
                            <p style={{ color: "white"}}>{`Joined : ${new Date(user.created).toDateString()}`}</p>
                        </div>
                        {isAuthenciate().user && isAuthenciate().user._id === user._id && (
                            <div className="d-inline-block">
                                <Link className="btn btn-raised btn-primary mr-5" to={`/user/edit/${user._id}`}>Edit</Link>
                            </div>
                        )}
                    </div>
                </div>                
            </div>
        );
    }
}

export default Profile;