const fs = require("fs");
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
                    "username": data.username,
                    "email": data.email
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

exports.updateProfile = async (req, res) => {
    const id = req.params.id;

    try {
        console.log(req.file);

        if (req.file == undefined) {
            return res.send(`You must select a file.`);
        }

        User.update({
            avatar: req.file.originalname,
            avatar_type: req.file.mimetype,
            avatar_data: fs.readFileSync(
                __basedir + "/uploads/" + req.file.filename
            ),
        }, {
            where: { id: id }
        }).then((image) => {
            fs.writeFileSync(
                __basedir + "/uploads/tmp/" + image.name,
                image.data
            );

            return res.send(`File has been uploaded.`);
        });
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload images: ${error}`);
    }
}