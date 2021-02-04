const { authJwt } = require("../middleware");
const controller = require("../controllers/post.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Create Post
    app.post(
        "/api/post/",
        [authJwt.verifyToken],
        controller.create
    );

    // Read All Post
    app.get(
        "/api/post/",
        [authJwt.verifyToken],
        controller.findAll
    );

    // Read All Post Published
    app.get(
        "/api/post/published",
        [authJwt.verifyToken],
        controller.findAllPublished
    );

    // Read All Post Not Published
    app.get(
        "/api/post/unpublished",
        [authJwt.verifyToken],
        controller.findAllUnPublished
    );

    // get postby id
    app.get("/api/post/:id",
        [authJwt.verifyToken],
        controller.findOne
    );

    // update post by id
    app.put("/api/post/:id",
        [authJwt.verifyToken],
        controller.update
    );

    // delete post by id
    app.delete("/api/post/:id",
        [authJwt.verifyToken],
        controller.delete
    );

    // delete all
    app.delete("/api/post/",
        [authJwt.verifyToken],
        controller.deleteAll
    );
};
