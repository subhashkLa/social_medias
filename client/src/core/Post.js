import React, { Component } from 'react';
import { post, isAuthenciate } from '../auth/index';

class Post extends Component {
    
    constructor() {
        super();
        this.state = {
            title: "",
            body: "",
            error: "",
        }
    }

    handleChange = title => event => {
        this.setState({error: ""});
        this.setState({[title]: event.target.value});
    }

    clickSubmit = event => {
        event.preventDefault();
        const userId = isAuthenciate().user._id;
        const tokens = isAuthenciate().token;
        const { title, body } = this.state;
        const User = {
            title: title,
            body: body            
        }
        post(User, userId, tokens).then(data => {
            if(data.error) {
                this.setState({ error: "" });
            }
        })
    }

    postForm = (title, body) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input type="text" onChange={this.handleChange("title")} className="form-control" value={title}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Body</label>
                <input type="email" onChange={this.handleChange("body")} className="form-control" value={body}/>
            </div>
            <div className="form-group">
                <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
            </div>
        </form>
    );

    render() {
        const { title, body } = this.state;
        return (
            <div>
                <div  className="jumbotron">
                    <h1>Post</h1>
                </div>
                <div className="container">
                    {this.postForm(title, body)}
                </div>
            </div>
        );
    }
}

export default Post;