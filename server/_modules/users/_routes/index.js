module.exports = function(app) {
    require('./../index/routes')(app);
    require('./../user/routes')(app);
}