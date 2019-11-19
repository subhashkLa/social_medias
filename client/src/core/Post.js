import React, { Component } from 'react';
import { post, isAuthenciate } from '../auth/index';
import { Redirect } from 'react-router-dom';

class Post extends Component {
    
    constructor() {
        super();
        this.state = {
            title: "",
            body: "",
            error: "",
            redirecttoHome: false
        }
    }

    componentDidMount() {
        this.userData = new FormData();
    }

    handleChange = title => event => {
        const value = title === 'photo' ? event.target.files[0] : event.target.value;
        this.userData.set(title, value);
        this.setState({error: ""});
        this.setState({[title]: value});
    }

    clickSubmit = event => {
        event.preventDefault();
        const userId = isAuthenciate().user._id;
        const tokens = isAuthenciate().token;
        post(this.userData, userId, tokens).then(data => {
            if(data.error) {
                this.setState({ error: "" });
            }else {
                this.setState({ title: "", body: "", redirecttoHome: true })
            }
        })
    }

    postForm = (title, body) => (
        <>
        <form>
            <div className="form-group">
                <label className="text-muted">Photo</label>
                <input accept="image/*" type="file" onChange={this.handleChange("photo")} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input type="text" onChange={this.handleChange("title")} className="form-control" value={title}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Body</label>
                <input type="text" onChange={this.handleChange("body")} className="form-control" value={body}/>
            </div>
            <div className="form-group">
                <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Post</button>
            </div>
        </form>
        </>
    );

    render() {
        const { title, body, redirecttoHome } = this.state;
        
        if(redirecttoHome) {
            return <Redirect to="/" />
        }

        return (
            <div className="container" style={{ position: "relative", top: "110px" }}>
                <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="text-muted d-flex justify-content-center">Post</h4>
                        </div>
                        <div className="card-body">
                            { this.postForm(title, body) }
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default Post;
