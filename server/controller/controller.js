const Userdb = require('../model/model');

//* Create New-User
exports.create = (req, res) => {
    //Validate
    if (!req.body) {
        return res.status(400).send({ message: "Content cannnot be empty!" });
    }
    //New User
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });
    //Save
    user.save(user).then(data => {
        res.redirect('/add-user');
    }).catch(err => {
        res.status(500).send({ message: err.message || "Some error occured while creating user." });
    });

};

//* Get all or single user
exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id
        Userdb.findById(id).then(user => res.send(user)).catch(err => {
            res.status(500).send({ message: err.message || "Error getting user" });
        });
    } else {
        Userdb.find().then(user => res.send(user)).catch(err => {
            res.status(500).send({ message: err.message || "Error getting user" });
        });
    }
};

//* Update a user
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Content cannnot be empty!" });
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                return res.status(404).send({ message: `Cannot update user with ${id}. Check user id and it's data.` })
            }
            res.send(data);
        }).catch(err => {
            res.status(500).send({ message: err.message || "Error getting user" });
        });
};

//* Delete user by id
exports.delete = (req, res) => {
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({ message: `Cannot delete user with ${id}. Check user id and it's data.` })
            }
            res.send({ message: "Deleted Successfully!" });
        }).catch(err => {
            res.status(500).send({ message: err.message || "Error getting user" });
        });
};