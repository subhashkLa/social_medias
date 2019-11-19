// import React, {Component} from 'react';
// import { isAuthenciate, postByUser, read } from '../auth/index';
// import { Link } from 'react-router-dom';

// class PostByUser extends Component {

//     constructor() {
//         super();
//         this.state = {
//             post: [],
//             error: ""
//         }
//     }

//     init = userId => {
//         read(userId)
//         .then(data => {
//             if(data.error) {
//                 this.setState({  })
//             }else {
//                 this.setState({ user: data })
//                 this.loadPosts(data._id);
//             }
//         });
//     }

//     loadPosts = userId => {
//         const token = isAuthenciate().token;
//         postByUser(userId, token).then(data => {
//           if (data.error) {
//             console.log(data.error);
//           } else {
//             this.setState({ post: data });
//           }
//         });
//     };
    
//     componentDidMount() {
//         const userId = this.props.match.params.userId;
//         this.init(userId);
//     }

//     componentWillReceiveProps(props) {
//         const userId = props.match.params.userId;
//         this.init(userId);
//     }

//     renderPost = post => (
//         <div className="row">
//         {
//             post.map((post, i) => (
//                 <div className="col-12 col-sm-12 col-md-6 col-lg-4">
//                 <div className="card" key={i} style={{padding: "0px"}}>
//                     <div className="card-body" style={{padding: "0px"}}>
//                         <Link to={`/post/${post._id}`}>
//                             <img className="card-img-top" height="200"
//                                 src={`/post/photo/${post._id}`}
//                                 onError={i => (i.target.src = 'https://i.stack.imgur.com/l60Hf.pnghttps://i.stack.imgur.com/l60Hf.png')} 
//                                 alt={post.title} />
//                         </Link>
//                     </div>
//                     <div className="card-header">
//                         <p className="float-left">{post.likes.length} &nbsp;<i className="fa fa-thumbs-up" style={{color: "	dodgerblue"}}></i></p>
//                         <p className="float-right">{new Date(post.created).toDateString()}</p>
//                     </div>
//                 </div>
//                 <br />
//                 </div>
//             ))}
//         </div>
//     )

//     render() {
//         const { post } = this.state;

//         return (
//             <div>
//                 <div className="container">
//                     { this.renderPost(post) }
//                 </div>
//             </div>
//         );
//     }
// }

// export default PostByUser;