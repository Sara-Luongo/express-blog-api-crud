import posts from "../data/blogPosts.js";

function checkBody(request, response, next) {
    const { title, content, image, tags, prep_time } = request.body;
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

    if (!content || typeof content !== 'string' || content.trim() === "") {
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
    next()
}
export default checkBody;