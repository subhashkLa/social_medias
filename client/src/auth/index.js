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
    return fetch(`/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
};

export const post = (Post, userId, token) => {
    return fetch(`/post/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`             
        },
        body: JSON.stringify(Post)
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

