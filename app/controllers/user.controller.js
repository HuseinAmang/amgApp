const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.profile = (req, res) => {
    const id = req.params.id;
    // res.status(200).send(id);
    User.findByPk(id)
        .then((data) => {
            if (data) {
                res.status(200).send({
                    "username":data.username,
                    "email":data.email
                })
            } else {
                res.status(400).send({
                    message: `user dengan id = ${id}, tidak ditemukan`
                })
            }
        }).catch((err) => {
            res.status(500).send({
                message: err.message || `data tidak ditemukan untuk id = ${id}`
            })
        })
}