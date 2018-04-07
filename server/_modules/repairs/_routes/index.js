module.exports = function (app) {
    require('./../index/routes')(app);
    require('./../repair/routes')(app);
}