function toResponse(document) {
    if (document instanceof Array) {
        return document.map(elem => toResponse(elem));
    } else {
        let response = document.toObject({versionKey: false});
        response.id = response._id.toString();
        delete response._id;
        delete response.__v;
        return response;
    }
}

function commentToResponse(comment, user) {
    const response = {
        ...toResponse(comment),
        user: {
            nick: user.nick,
            email: user.email,
        }
    }
    delete response.book;
    return response;
}

function commentsToResponseUser(comments) {
    return comments.map(comment => {
        const response = {
            bookId: comment.book._id,
            ...toResponse(comment)
        }
        delete response.user;
        delete response.book;
        return response;
    });
}

export {
    toResponse,
    commentToResponse,
    commentsToResponseUser
};