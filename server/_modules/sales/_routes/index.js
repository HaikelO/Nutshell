module.exports = function(app) {
    require('./../index/routes')(app);
    require('./../sale/routes')(app);
    
}