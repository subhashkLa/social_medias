import React, {Component} from 'react';
import { allpost } from '../auth/index';
import { Link } from 'react-router-dom';

class Home extends Component{

    constructor() {
        super();
        this.state = {
            post: [],
        }
    }
    
    Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    componentDidMount() {
        allpost().then(data => {
            if(data.error) {
                console.log(data.error);
            }else {
                this.setState({ post: data });
            }
        });              
    }

    renderPost = post => (
        <div className="col-12 ">
        {
            post.map((post, i) => (
                <div key={i}>
                <div className="card promoting-card">
                    <div className="card-body d-flex flex-row">
                        <img alt="name" src={post.postedBy && post.postedBy._id ? `/user/photo/${post.postedBy._id}` : 'https://i.stack.imgur.com/l60Hf.pnghttps://i.stack.imgur.com/l60Hf.png'} className="rounded-circle mr-3" height="50px" width="50px" />
                        <div style={{ marginTop: "12px" }}>
                            <Link className="btn btn-sm" to={post.postedBy && post.postedBy._id ? `/user/${post.postedBy._id}` : 'Id'}>{post.postedBy && post.postedBy.name ? post.postedBy.name : 'Name' }</Link>                        
                        </div>
                    </div>
                    
                    <div className="view overlay">
                        <img className="card-img-top rounded-0" src={`/post/photo/${post._id}`} onError={i => (i.target.src = 'https://mdbootstrap.com/img/Photos/Horizontal/Food/full page/2.jpg')} alt="Card cap" />
                    </div>
                    <div className="card-body">
                        <div className="collapse-content">
                            {
                                <>
                                <Link to={`/post/${post._id}`} ><span className="text-muted float-left p-1 my-1 mr-3">{post.likes.length} &nbsp;<i className="fa fa-thumbs-up" data-toggle="tooltip" title="I like it" ></i></span></Link>
                                </>
                            }
                            <p className="text-muted float-left p-1 my-1">If You want to like of Comment on Post Click on Like Button</p>
                            <p className="text-muted card-text float-right p-1 my-1"><i className="far fa-clock pr-2"></i>{new Date(post.created).toDateString()}</p>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                </div>
            ))}
        </div>
    )

    render() {
        const myContainer = {
            position: "relative",
            top: "110px",
        };

        const { post } = this.state;
        return (
            <div>
                <div className="container-fluid" style={myContainer}>
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-lg-6">
                            {this.renderPost(post)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;