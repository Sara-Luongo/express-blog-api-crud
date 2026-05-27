import posts from "../data/blogPosts.js";


function checkPostId(request, response, next) {
    const id = parseInt(request.params.id);
    const postToUpdate = posts.find(post => post.id === id);
    if (!postToUpdate) {
        response.status(404);
        response.json({
            error: 'nessun post trovato a questo id',
            results: null
        })
        return;
    }
    request.findPost = postToUpdate
    next()
}

export default checkPostId;