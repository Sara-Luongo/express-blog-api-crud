import posts from '../data/blogPosts.js';


function index(request, response) {
    response.json(posts);
}

function show(request, response) {
    const post = request.findPost
    response.json({
        error: null,
        results: post
    });
};

function create(request, response) {
    const { title, content, image, tags, prep_time, } = request.body;

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
/*=========================================UPDATE============================================================================*/
function update(request, response) {
    const post = request.findPost

    const { title, content, image, tags, prep_time } = request.body;
    const newSlug = title.toLowerCase().trim().replaceAll(" ", "-");


    post.title = title;
    post.content = content;
    post.image = image;
    post.prep_time = prep_time;
    post.tags = tags;
    post.slug = newSlug;


    response.json({
        message: `post con id: ${post.id} modificato con successo`,
        response: post

    })
}

function destroy(request, response) {
    const post = request.findPost

    const foundPostIndex = posts.indexOf(post)
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