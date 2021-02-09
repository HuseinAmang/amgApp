module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        user_id:{
            type: Sequelize.INTEGER,
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });

    return Post;
}