import React from 'react';
import { Redirect } from 'react-router-dom';
import { signin, authenciate } from './index';


class Signin extends React.Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            redirecttoreferpage: false
        }
    }

    handleForm = name => (event) =>{
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    }
    
    handleSubmit = event => {
        event.preventDefault();
        const { email, password } = this.state;
        const User = {
            email: email,
            password: password
        };
        signin(User)
        .then(data => {
            if(data.error) {
                this.setState({ error: data.error }); 
            } else {
                authenciate(data, () => {
                    this.setState({ redirecttoreferpage: true });
                } );
            }   
        }).catch(err => { console.log(err) });  
    }


    SigninForm = (email, password) => (
        <form>
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
                <label className="form-check-label">Check me out</label>
            </div>
            <button type="submit" onClick={this.handleSubmit} className="btn btn-raised bg-primary">Submit</button>
        </form>
    );

    render() {
        const { email, password, redirecttoreferpage } = this.state;

        if(redirecttoreferpage) {
            return <Redirect to="/" />
        }

        return (
            <div>
                <div className="jumbotron"><h1>Signin</h1></div>
                
                <div className="container">
                    { this.SigninForm(email, password) }
                </div>
            </div>
        );
    }
}

export default Signin;