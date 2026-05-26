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
    const { title, content, image, tags, prep_time, id, slug, published } = request.body;

    if (!title || typeof title !== 'string' || title.trim() === "") {
        response.status(400)
        response.json({
            error: 'il titolo inserito non è valido',
            results: null
        })
        return;
    };
    if (title.length < 5) {
        response.status(400)
        response.json({
            error: 'il titolo inserito è minore di 5 caratteri',
            results: null
        })
        return;
    };


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
    const foundPostIndex = posts.findIndex(post => {
        return post.id === idReal
    });
    if (foundPostIndex === -1) {
        response.status(404)
            .json({
                errore: 'post inesistente',
                results: null
            });
        return;
    }
    posts.splice(foundPostIndex, 1);

    response.sendStatus(204)

}


export {
    index,
    show,
    create,
    update,
    destroy
}