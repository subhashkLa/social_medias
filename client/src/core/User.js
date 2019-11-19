import React from 'react';
import { user } from '../auth/index';
import { Link } from 'react-router-dom';

class User extends React.Component {

    constructor() {
        super();
        this.state = {
            user: []
        }
    }

    componentDidMount() {
        user().then(data => {
            if(data.error) {
                console.log(data.error);
            }else {
                this.setState({ user: data });
            }
        });
    }   

    renderuser = users => (
        <div className="row">
            {
                users.map((user, i) => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-4" key={i}>
                        <div className="padding">
                        <div className="card">
                        <img className="card-img" width="250" height="200" src={`/user/photo/${user._id}`} onError={i => (i.target.src = "https://timedotcom.files.wordpress.com/2015/04/512137691.jpg")} alt={user.name} />
                        <div className="card-body">
                            <h4 className="card-title">{user.name}</h4>
                            <p className="card-text">{user.email}</p>
                            <div className="d-inline-block"> 
                                <Link className="btn btn-sm btn-raised bg-primary" to={`/user/${user._id}`}>Profile</Link>                        
                            </div>
                        </div>
                        <div className="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
                            <div className="views">Joined  {new Date(user.created).toDateString()}</div>
                        </div>
                    </div>
                    </div>
                    <br />
                </div>
            ))}
        </div>
    )

    render() {
        const { user } = this.state;

        const myContainer = {
            position: "relative",
            top: "110px",
        };

        return (
            <div>
                <div className="container" style={myContainer}>
                    { this.renderuser(user) }
                </div>
            </div>
        );
    }
}

export default User;