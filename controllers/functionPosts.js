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
            error: 'il titolo inserito non è valido, vuoto o solo spazi',
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

    if (!content || typeof title !== 'string' || content.trim() === "") {
        response.status(400)
        response.json({
            error: 'la descrizione non è valida vuota o solo spazi',
            results: null
        });
        return;
    }
    if (content.length < 100) {
        response.status(400)
        response.json({
            error: 'la descrizione del content inserita è minore di 100 caratteri',
            results: null
        })
        return;
    }

    if (!image || typeof image !== 'string' || image.trim() === "") {
        response.status(400)
        response.json({
            error: 'campo immagine sbagliato o inesistente',
            results: null
        });
        return;
    }
    if (!image.endsWith('.jpg') && !image.endsWith('.jpeg') && !image.endsWith('.png')) {
        response.status(400)
        response.json({
            error: 'estensione immagine errata',
            results: null
        });
        return;
    };

    if (!Array.isArray(tags)) {
        response.status(400);
        response.json({
            error: 'i tags devono essere un array!',
            results: null
        });
        return;
    }

    if (tags.length === 0) {
        response.json({
            error: 'array vuoto',
            results: null
        });
        return;
    }
    for (let i = 0; i < tags.length; i++) {
        if (typeof tags[i] !== 'string' || tags[i].trim() === "") {
            response.json({
                error: 'gli elementi degli array devono essere stringhe e non spazi vuoti',
                results: null
            });
            return;
        }
    }

    if (!prep_time || typeof prep_time !== 'number') {
        response.json({
            error: 'il campo di preparazione è obbligatorio e deve contenere solo numeri',
            results: null
        });
        return;
    }
    if (prep_time < 30 || prep_time > 240) {
        response.json({
            error: 'il tempo di preparazione non deve essere minore di trenta e superiore di 240',
            results: null
        });
        return;
    }

    let newId = 1
    if (posts.length > 0) {
        newId = posts[posts.length - 1].id + 1
    };
    const newSlug = title.toLowerCase().trim().replaceAll(" ", "-");

    const newPost = {
        id: newId,
        title,
        content,
        image,
        prep_time,
        tags,
        slug: newSlug,
        published: true
    };

    posts.push(newPost)

    response.status(201)
    response.json({
        results: 'nuovo post creato',
        response: newPost
    })
}
function update(request, response) {
    const id = request.params.id;
    const postToUpdate = posts.find(post => post.id === id);
    if (!postToUpdate) {
        response.status(404);
        response.json({
            error: 'nessun post trovato a questo id',
            results: null
        })
        return;
    }
    const { title, content, image, tags, prep_time } = request.body;
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