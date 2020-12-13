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

export default toResponse;