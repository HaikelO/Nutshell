module.exports = function(app) {
    require('./../index/routes')(app);
    require('./../provider/routes')(app);
    require('./../providers/routes')(app);
    require('./../purchase/routes')(app);
}