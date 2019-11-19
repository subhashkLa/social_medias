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
            redirectToProfile: false,
            fileSize: 0
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
        this.userData = new FormData();
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        this.userData.set(name, value);
        this.setState({ error: "" });
        this.setState({ [name]: value })
    };

    clickSubmit = event => {
        event.preventDefault();
        const token = isAuthenciate().token;
        const userId = this.props.match.params.userId;
        edit(userId, token, this.userData)
        .then(data=> {
            if(data.error) {
                this.setState({
                    error: data.error
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
                <label className="text-muted">Profile Photo</label>
                <input type="file" onChange={this.handleChange("photo")} className="form-control" accept="image/*" />
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={this.handleChange("name")} className="form-control" value={name}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" onChange={this.handleChange("email")} className="form-control" value={email}/>
            </div>
            <div className="form-group">
                <button onClick={this.clickSubmit} className="btn btn-raised btn-success">Submit</button>
            </div>
        </form>
    )

    render() {

        const { id, name, email, error, redirectToProfile } = this.state;
        
        if(redirectToProfile) {
            return <Redirect to={`/user/${id}`} />;
        }

        const photoUrls = id ? `/user/photo/${id}` : 'https://i.stack.imgur.com/l60Hf.pnghttps://i.stack.imgur.com/l60Hf.png';

        return (
            <div className="container">
                <h1 className="mt-5 mb-5">Edit Profile</h1>

                <div className="alert alert-primary" style={{ display: error ? "" : "none" }}>
                    { error }
                </div>

                <img src={photoUrls} width="150" height="120"  alt={name} />

                {this.editForm(name, email)}
            
            </div>
        );
    }
}

export default Update;