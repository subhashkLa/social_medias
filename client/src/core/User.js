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
                <div className="card col-md-6" key={i}>
                    <img className="card-img-top" style={{width: 200, height:200}} src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/profile-icon.png" alt="Card cap" />
                    <div className="card-body">
                        <div className="lead ml-4">
                            <h6 className="card-title">{user.name}</h6>
                            <p className="card-text">{user.email}</p>
                        </div>
                        <Link className="btn bg-primary" to={`/user/${user._id}`}>Profile</Link>
                    </div>
                </div>
            ))}
        </div>
    )

    render() {
        const { user } = this.state;

        return (
            <div>
                <div className="jumbotron">
                    <h1>User</h1>
                </div>
                <div className="container">
                    { this.renderuser(user) }
                </div>
            </div>
        );
    }
}

export default User;