module.exports = function(app) {
    require('./../index/routes')(app);
    require('./../bill/routes')(app);
}
