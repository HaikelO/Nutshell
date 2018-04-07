var Categorie = require('./../_models/categorie');

module.exports = function (app) {
    return {
        post: post,
        handlePost: handlePost,
        get: get,
        handleGet: handleGet,
        deleteCategorie: deleteCategorie,
        handleDelete: handleDelete,
        update: update,
        handleUpdate: handleUpdate
    }
}

function post(item, callback) {
    if (JSON.stringify(item) !== JSON.stringify({})) {
        var categorie = new Categorie(item);
        return categorie.save(function (err, result) {
            if (err) {
                return callback({ 'ERROR': err });
            }
            return callback({ 'SUCCESS': result });
        });
    } else {
        return callback({ 'WARNING': "INPUT IS MISSING" })
    }
}
function handlePost(req, res) {
    if (req.body) {
        var item = req.body;
        if (JSON.stringify(item) !== JSON.stringify({})) {
            /* if (item !== {}) { */
            return post(item, function (result) {
                res.json(result);
            });
        } else {
            return res.json({ 'WARNING': "INPUT IS MISSING" });
        }
    }
    else {
        return res.json({ 'WARNING': "INPUT IS MISSING" });
    }
}
function get(item, callback) {
    if (item) {
        return Categorie.findOne(item, function (err, data) {
            if (err) {
                return callback({ 'ERROR': err })
            } else {
                return callback({ 'SUCCESS': data });
            }
        });
    } else {
        return callback({ 'WARNING': "ID IS MISSING" });
    }
}
function handleGet(req, res) {
    if (req.body || req.params.id) {
        var item = req.body;
        var id = item._id;
        if (id) {
            return get(id, function (result) {
                return res.json(result);
            });
        } else if (req.params.id) {
            return get(req.params.id, function (result) {
                return res.json(result);
            });
        }
        else {
            return res.json({ 'WARNING': "ID IS MISSING" });
        }
    } else {
        return res.json({ 'WARNING': "INPUT IS MISSING" });
    }
}
function deleteCategorie(id, callback) {
    if (id) {
        Categorie.remove(id, function (err) {
            if (err) {
                return callback({ 'ERROR': err });
            }
        });
    } else {
        return callback({ 'WARNING': "ID IS MISSING" });
    }
}
function handleDelete(req, res) {
    if (req.body) {
        var id = req.params.id
        if (id) {
            return deleteCategorie(id, function (result) {
                return res.json(result);
            });
        } else {
            return res.json({ 'WARNING': "ID IS MISSING" });
        }
    } else {
        return res.json({ 'WARNING': "INPUT IS MISSING" });
    }
}
function update(item, callback) {
    if (JSON.stringify(item) !== JSON.stringify({})) {
        return Categorie.findByIdAndUpdate(item._id, item, { new: true }, function (err, result) {
            if (err) {
                return callback({ 'ERROR': err });
            } else {
                return callback({ 'SUCCESS': result });
            }
        })
    } else {
        return callback({ 'WARNING': "INPUT IS MISSING" });
    }
}
function handleUpdate(req, res) {
    var item = req.body;
    if (JSON.stringify(item) !== JSON.stringify({})) {
        return update(item, function (result) {
            res.json(result);
        });
    } else {
        return res.json({ 'WARNING': "INPUT IS MISSING" });
    }
}