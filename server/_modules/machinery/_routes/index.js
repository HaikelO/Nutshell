module.exports = function(app) {
    require('./../index/routes')(app);
    require('./../machine/routes')(app);
    require('./../mold/routes')(app);
    require('./../molds/routes')(app);
}