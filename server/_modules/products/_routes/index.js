module.exports = function(app) {
    require('./../index/routes')(app);
    require('./../material/routes')(app);
    require('./../materials/routes')(app);
    require('./../product/routes')(app);
}