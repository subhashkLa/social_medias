import React, { Component } from 'react';
import {comment, uncomment, isAuthenciate} from '../auth/index';
import { Link } from 'react-router-dom';

class Comment extends Component {
    state = {
        text: "",
        error: ""
    };

    handleChange = event => {
        this.setState({ error: "" });
        this.setState({ text: event.target.value });
    };

    addComment = e => {
        e.preventDefault();

        if (!isAuthenciate()) {
            this.setState({ error: "Please signin to leave a comment" });
            return false;
        }

        const userId = isAuthenciate().user._id;
        const token = isAuthenciate().token;
        const postId = this.props.postId;

        comment(userId, token, postId, { text: this.state.text }).then(
            data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    this.setState({ text: "" });
                    // dispatch fresh list of coments to parent (SinglePost)
                    this.props.updateComments(data.comments);
                }
            }
        );
    };

    deleteComment = comment => {
        const userId = isAuthenciate().user._id;
        const token = isAuthenciate().token;
        const postId = this.props.postId;

        uncomment(userId, token, postId, comment).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.props.updateComments(data.comments);
            }
        });
    };

    deleteConfirmed = comment => {
        let answer = window.confirm(
            "Are you sure you want to delete your comment?"
        );
        if (answer) {
            this.deleteComment(comment);
        }
    };

    render() {
        const { comments } = this.props;
        const { error } = this.state;

        return (
            <div>
                <h2 className="mt-5 mb-5">Leave a comment</h2>

                <form onSubmit={this.addComment}>
                    <div className="form-group">
                        <input
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.text}
                            className="form-control"
                            placeholder="Leave a comment..."
                        />
                        <button className="btn btn-raised btn-success mt-2">
                            Post
                        </button>
                    </div>
                </form>

                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                <div className="col-md-12">
                    <h3 className="text-primary">{comments.length} Comments</h3>
                    <hr />
                    {comments.map((comment, i) => (
                        <div key={i}>
                            <div>
                                <Link to={`/user/${comment.postedBy._id}`}>
                                    <img
                                        style={{
                                            borderRadius: "50%",
                                            border: "1px solid black"
                                        }}
                                        className="float-left mr-2"
                                        height="30px"
                                        width="30px"
                                        onError={i =>
                                            (i.target.src = "https://i.stack.imgur.com/l60Hf.pnghttps://i.stack.imgur.com/l60Hf.png")
                                        }
                                        src={`/user/photo/${comment.postedBy._id}`}
                                        alt={comment.postedBy.name}
                                    />
                                </Link>
                                <div>
                                    <p className="lead">{comment.text}</p>
                                    <p className="font-italic mark">
                                        Posted by{" "}
                                        <Link
                                            to={`/user/${comment.postedBy._id}`}
                                        >
                                            {comment.postedBy.name}{" "}
                                        </Link>
                                        on{" "}
                                        {new Date(
                                            comment.created
                                        ).toDateString()}
                                        <span>
                                            {isAuthenciate().user &&
                                                isAuthenciate().user._id ===
                                                    comment.postedBy._id && (
                                                    <>
                                                        <span
                                                            onClick={() =>
                                                                this.deleteConfirmed(
                                                                    comment
                                                                )
                                                            }
                                                            className="text-danger float-right mr-1"
                                                        >
                                                            Remove
                                                        </span>
                                                    </>
                                                )}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Comment;