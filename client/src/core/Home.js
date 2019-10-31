import React, {Component} from 'react';
import { allpost } from '../auth/index';

class Home extends Component{

    constructor() {
        super();
        this.state = {
            post: []
        }
    }

    componentDidMount() {
        allpost().then(data => {
            if(data.error) {
                console.log(data.error);
            }else {
                this.setState({ post: data });
            }
        })              
    }

    renderPost = post => (
        <div className="">
            {
                post.map((post, i) => (
                <div className="card col-md-6" key={i}>
                    <div className="container">
                    <img className="card-img-top" style={{width: 200, height:200}} src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/profile-icon.png" alt="Card cap" />
                    <div className="card-body">
                        <div className="lead ml-4">
                            <h6 className="card-title">{post.title}</h6>
                            <p className="card-text">{post.body}</p>
                            <p className="card-text">
                            {
                               post.postedBy && post.postedBy.name ? post.postedBy.name : 'Hello world'
                            }
                            </p>
                            <p className="card-text">
                            {
                               post.postedBy && post.postedBy._id ? post.postedBy._id : 'Hello world'
                            }
                            </p>
                        </div>
                    </div>
                    </div>
                </div>
            ))}
        </div>
    )

    render() {
        const { post } = this.state;
        return (
            <div>
                <div className="jumbotron">
                    <h1>Post</h1>
                </div>
                <div className="container">
                    { this.renderPost(post) }
                </div>
            </div>
        );
    }
}

export default Home;