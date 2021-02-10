module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        avatar:{
            type: Sequelize.STRING,
        },
        avatar_type:{
            type: Sequelize.STRING,
        },
        avatar_data:{
            type: Sequelize.BLOB("long"),
        }
    });

    return User;
};