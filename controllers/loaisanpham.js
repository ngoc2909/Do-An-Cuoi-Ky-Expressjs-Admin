var loaisanphamModel = require('../models/loaisanpham');
var cm = require('../models/loaisanpham');

exports.create = function (req, res) {
    // Create and Save a new celebrity
    loaisanphamModel.create(req.body, function (err,data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.status(201).send();
    })
};

exports.findAll = function (req, res) {
    // Retrieve and return all notes from the database.
    loaisanphamModel.findAll(function (err, data) {
            if (err) {
                res.status(400).send(err);
                return;
            }
            res.send(data);
        }
    );
};
exports.findOne = function (req, res) {
    // Find a single note with a noteId
    var id = req.params.loaisanphamId;
    loaisanphamModel.findOne(id, function (err,data){
        return res.send(data);
    })
};
exports.update = function (req, res) {
    // Update a note identified by the noteId in the request

    var updates = req.body;
    updates.id = req.params.loaisanphamId;
    loaisanphamModel.update(updates, function (err, data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.status(201).send(data);
    })
};

exports.delete = function (req, res) {
    // Delete a note with the specified noteId in the request
    var id = req.params.loaisanphamId;
    loaisanphamModel.delete(id, function (err, data) {
        return res.send(data);
    })

};