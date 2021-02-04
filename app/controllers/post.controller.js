const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

// Create 
exports.create = (req, res) => {
    // Validate request 
    if (!req.body.title) {
        res.status(400).send({
            message: 'Judul tidak boleh kosong'
        });
        return;
    }

    // ambil post dari request body
    const post = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    // create post
    Post.create(post)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: err.message || `Ada Kesalahan ketika input data`
            })
        })
}

// Retrieve All
exports.findAll = (req, res) => {
    const title = req.body.title;
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Post.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: err.message || `data tidak ditemukan`
            })
        })
}

// Find a single
exports.findOne = (req, res) => {
    const id = req.params.id;

    Post.findByPk(id)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: err.message || `data tidak ditemukan untuk id = ${id}`
            })
        })
}

// Update a post with ID
exports.update = (req, res) => {
    const id = req.params.id;

    Post.update(req.body, { where: { id: id } })
        .then((result) => {
            if (result == 1) {
                res.send({
                    message: `post dengan id = ${id}, berhasil di update`
                })
            } else {
                res.send({
                    message: `post dengan id = ${id}, gagal di update`
                })
            }
        }).catch((err) => {
            res.status(500).send({
                message: err.message || `Ada Kesalahan ketika update data dengan id = ${id}`
            })
        })
}

// Delete a post with ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Post.destroy({ where: { id: id } })
        .then((result) => {
            if (result == 1) {
                res.send({
                    message: `post dengan id = ${id}, berhasil di hapus`
                })
            } else {
                res.send({
                    message: `post dengan id = ${id}, gagal di hapus`
                })
            }
        }).catch((err) => {
            res.status(500).send({
                message: err.message || `Ada Kesalahan ketika hapus data dengan id = ${id}`
            })
        })
}

// Delete all
exports.deleteAll = (req, res) => {
    Post.destroy({
        where: {},
        truncate: false
    })
        .then((result) => {
            res.send({
                message: `Semua post berhasil di hapus`
            })
        }).catch((err) => {
            res.status(500).send({
                message: err.message || `Ada Kesalahan ketika hapus semua data`
            })
        })
}

// Find all published
exports.findAllPublished = (req, res) => {
    Post.findAll({
        where: { published: true }
    }).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || `tidak ditemukan data yang di publish`
        })
    })
}

// Find all UnPublished
exports.findAllUnPublished = (req, res) => {
    Post.findAll({
        where: { published: false }
    }).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || `tidak ditemukan data yang tidak di publish`
        })
    })
}