import React from 'react';
import { Redirect } from 'react-router-dom';
import { signup } from './index';

class Signup extends React.Component {

    constructor() {
        super();
        
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            redirecttoreferpage: false
        }
    }

    handleForm = name => (event) => {
        this.setState({error: ""});
        this.setState({[name]: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        const { name, email, password } = this.state;
        const User = {
            name: name,
            email: email,
            password: password
        };
        signup(User)
        .then(data => {
            if(data.error) {
                this.setState({ error: data.error });
            }else {
                this.setState({ redirecttoreferpage: true });
            }
        })
        .catch(err => {
            console.log(err);
        });
    };

    SignupForm = (name, email, password) => (
        <form>
            <div className="form-group">
                <label>Name</label>
                <input type="text" value={name} onChange={this.handleForm("name")} className="form-control" id="exampleName" aria-describedby="NameHelp" placeholder="Enter Name" />
            </div>
            <div className="form-group">
                <label>Email address</label>
                <input type="email" value={email} onChange={this.handleForm("email")} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" value={password} onChange={this.handleForm("password")} className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" >Check me out</label>
            </div>
            <button type="submit" onClick={this.handleSubmit} className="btn btn-raised bg-primary">Submit</button>
        </form>
    );

    render() {
        const { name, email, password, redirecttoreferpage } = this.state;
        
        if(redirecttoreferpage) {
            return <Redirect to="/signin" />
        }

        return (
            <div>
                <div className="jumbotron"><h1>Signup</h1></div>
                
                <div className="container">
                    { this.SignupForm( name, email, password ) }
                </div>
            </div>
        );
    }
}

export default Signup;