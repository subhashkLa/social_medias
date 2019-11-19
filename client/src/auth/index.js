export const signup = User => {
    return fetch("/signup", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(User)
    })
    .then(data => {
        return data.json();
    })
    .catch(err => console.log(err));
};

export const signin = User => {
    return fetch("/signin", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(User)
    })
    .then(data => {
        return data.json();
    })
    .catch(err => console.log(err));
}

export const Signout = (next) =>  {
    if(typeof window !== "undefined") {
        localStorage.removeItem("jwt");
        next();
    }
    return fetch("/signout", {
        method: "GET"
    }).then(data => {
        console.log("signout", data);
        return data.json();
    })
    .catch(err => console.log(err))
}

export const authenciate = (jwt, next) => {
    if(typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(jwt));
        next();
    }
}

export const isAuthenciate = () => {
    if(typeof window == "undefined") {
        return false;
    }

    if(localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    }else {
        return false;
    }
}

export const user = () => {
    return fetch('/user', {
        method: "GET",
    }).then(data =>  {
        return data.json();
    });
}

export const read = (userId, token) => {
    return fetch(`/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        },
    })
    .then(response => {
        return response.json();
    });
};

export const edit = (userId, token, user) => {
    console.log("User Data Update", user)
    return fetch(`/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}` 
        },
        body: user 
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
};

//post

export const post = (Post, userId, token) => {
    console.log(Post);
    return fetch(`/post/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`             
        },
        body: Post
    })
    .then(data => {
        return data.json();
    })
    .catch(err => {
        console.log(err);
    });
}

export const allpost = () => {
    return fetch('/post', {
        method: "GET",
    })
    .then(data => {
        return data.json();
    });
}

export const singlePost = postId => {
    return fetch(`/post/${postId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const postByUser = userId => {
    return fetch(`/user/post/${userId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const like = (userId, token, postId) => {
    return fetch("/post/likes", {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({userId, postId}) 
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const unlike = (userId, token, postId) => {
    return fetch("/post/unlikes", {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({userId, postId}) 
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
};

export const comment = (userId, token, postId, comment) => {
    return fetch("/post/comment", {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({userId, postId, comment}) 
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const uncomment = (userId, token, postId, comment) => {
    return fetch("/post/uncomment", {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({userId, postId, comment}) 
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
};

export const follow = (userId, token, followId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/follow`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, followId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const unfollow = (userId, token, unfollowId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/unfollow`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, unfollowId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
