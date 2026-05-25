import posts from '../data/blogPosts.js';


function index(request, response) {
    response.json(posts);
}

function show(request, response) {
    const { id } = request.params;
    const idReal = Number(id)

    if (isNaN(idReal)) {
        response.status(400)
            .json({
                errore: 'id non corretto',
                results: null
            });
        return;
    }
    if (idReal <= 0) {
        response.status(400)
            .json({
                errore: 'valore id negativo',
                results: null
            });
        return;
    }
    const foundPost = posts.find(post => {
        return post.id === idReal
    });
    if (foundPost === undefined) {
        response.status(404)
            .json({
                errore: 'id inesistente',
                results: null
            });
        return;
    }
    response.json({
        error: null,
        results: foundPost
    });
};

function create(request, response) {
    response.status(201)
    response.json({
        results: 'nuovo post creato'
    })
}
function update(request, response) {

    response.json({
        results: 'modificato post'
    })
}

function destroy(request, response) {
    const { id } = request.params;
    const idReal = Number(id)

    if (isNaN(idReal)) {
        response.status(400)
            .json({
                errore: 'id non corretto',
                results: null
            });
        return;
    }
    if (idReal <= 0) {
        response.status(400)
            .json({
                errore: 'valore id negativo',
                results: null
            });
        return;
    }
    const foundPost = posts.find(post => {
        return post.id === idReal
    });
    if (foundPost === undefined) {
        response.status(404)
            .json({
                errore: 'id inesistente',
                results: null
            });
        return;
    }
    const postsindex = posts.indexOf(foundPost);
    posts.splice(postsindex, 1);


    response.sendStatus(204)

}


export {
    index,
    show,
    create,
    update,
    destroy
}