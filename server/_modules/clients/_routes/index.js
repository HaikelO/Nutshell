module.exports = function(app) {
    require('./../index/routes')(app);
    require('./../client/routes')(app);
}