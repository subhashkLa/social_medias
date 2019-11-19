import React, { Component } from 'react';
import { isAuthenciate, read, postByUser  } from '../auth/index';
import { Redirect, Link } from 'react-router-dom';
import './core.css';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: "",
            title: "Profile",
            redirectToSigin: false,
            users: { following: [], followers: [] },
            following: false,
            post: [],
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
                this.loadPosts(data._id);
            }
        });
    }

    loadPosts = userId => {
        // const token = isAuthenciate().token;
        postByUser(userId).then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
            this.setState({ post: data });
          }
        });
    };
    
    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    componentWillReceiveProps(props) {
        const userId = props.match.params.userId;
        this.init(userId);
    }

    renderPost = post => (
        <div className="container">
        <div className="row">
        {
            post.map((post, i) => (
                <div className="col-12 col-sm-12 col-md-6 col-lg-4" key={i}>
                <div className="card" style={{padding: "0px"}}>
                    <div className="card-body" style={{padding: "0px"}}>
                        <Link to={`/post/${post._id}`}>
                            <img className="card-img-top" height="200"
                                src={`/post/photo/${post._id}`}
                                onError={i => (i.target.src = 'https://i.stack.imgur.com/l60Hf.pnghttps://i.stack.imgur.com/l60Hf.png')} 
                                alt={post.title} />
                        </Link>
                    </div>
                    <div className="card-header">
                        <p className="float-left">{post.likes.length} &nbsp;<i className="fa fa-thumbs-up" style={{color: "	dodgerblue"}}></i></p>
                        <p className="float-right">{new Date(post.created).toDateString()}</p>
                    </div>
                </div>
                <br />
                </div>
            ))}
        </div>
        </div>
    )

    render() {
        const { post } = this.state;

        const { redirectToSigin, user} = this.state;
             if(redirectToSigin) return <Redirect to="/signin" />
        
        return(
            <div className="profilecontainer">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                        <img className="card-img-top" style={{ maxWidth: "200px", maxHeight: "200px"}} src={`/user/photo/${user._id}`} onError={i => (i.target.src = 'https://i.stack.imgur.com/l60Hf.pnghttps://i.stack.imgur.com/l60Hf.png')} alt={user.name} />
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                        <div className="lead">
                            <p>Hello, {user.name}</p>
                            <p>Email : {user.email}</p>
                            <p>{`Joined : ${new Date(user.created).toDateString()}`}</p>
                        </div>
                        {isAuthenciate().user && isAuthenciate().user._id === user._id && (
                            <>
                            <div className="d-inline-block">
                                <Link className="btn btn-raised btn-primary mr-5" to={`/user/edit/${user._id}`}>Edit</Link>
                                <Link className="btn btn-raised btn-danger mr-5" to={`/user/edit/${user._id}`}>Delete</Link>
                            </div>
                            </>
                        )}
                    </div>

                </div>                
            </div>
                <hr />
                <br />
                {this.renderPost(post)}            
            </div>
        );
    }
}

export default Profile;