module.exports = function(app){
    // req = request -> information about the request
    // res = response -> our resposne to our users
    // next -> mostly for error handling
    app.get('/', function(req, res, next){
        res.send(['waterbottle', 'phone', 'paper']);
    });
}