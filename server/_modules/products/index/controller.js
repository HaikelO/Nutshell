var Product = require('./../_models/product');

module.exports = function (app) {
    return {
        get: get,
        handleGet: handleGet
    }
}

function get(callback) {
    return Product.find({}, function (err, data) {
        if (err) {
            return callback({ 'ERROR': err });
        } else {
            return callback({ 'SUCCESS': data });
        }
    });
}
function handleGet(req, res) {
    get(function (products) {
        res.json(products);
    });
}