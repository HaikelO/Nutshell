module.exports = function (app) {
    require('./../index/routes')(app);
    require('./../categorie/routes')(app);
}