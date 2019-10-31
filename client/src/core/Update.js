import React, { Component } from 'react';
import { isAuthenciate, read, edit } from '../auth/index';
import { Redirect } from 'react-router-dom';

class Update extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            name: "",
            email: "",
            error: "",
            redirectToProfile: false
        }
    }
    
    init = userId => {
        const token = isAuthenciate().token;
        read(userId, token)
        .then(data => {
            if(data.error) {
                this.setState({ redirectToProfile: true })
            }else {
                this.setState({ id: data._id, name: data.name, email: data.email })
            }
        });
    }

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    handleChange = name => (event) => {
        this.setState({ error: "" });
        this.setState({[name]: event.target.value})
    };

    clickSubmit = event => {
        event.preventDefault();
        const { name, email} = this.state;
        const token = isAuthenciate().token;
        const user = {
            name: name,
            email: email,
        };
        const userId = this.props.match.params.userId;
        edit(userId, token, user)
        .then(data=> {
            if(data.error) {
                this.setState({
                    error: data.error,
                    name: "",
                    email: "",
                });
        } else {
            this.setState({ 
                redirectToProfile: true
            });
        }
        })
    };

    editForm = (name, email) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={this.handleChange("name")} className="form-control" value={name}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" onChange={this.handleChange("email")} className="form-control" value={email}/>
            </div>
            <div className="form-group">
                <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
            </div>
        </form>
    )

    render() {

        const { id, name, email, error, redirectToProfile } = this.state;
        
        if(redirectToProfile) {
            return <Redirect to={`/user/${id}`} />;
        }

        return (
            <div className="container">
                <h1 className="mt-5 mb-5">Edit Profile</h1>

                <div className="alert alert-primary" style={{ display: error ? "" : "none" }}>
                    { error }
                </div>

                {this.editForm(name, email)}
            
            </div>
        );
    }
}

export default Update;