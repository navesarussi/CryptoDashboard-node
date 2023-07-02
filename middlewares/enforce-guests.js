module.exports = (req, res, next) => {
    console.log('use111111111111');
    console.log('user',req.user?req.user: "no user");
    console.log('user2',req.db,"10101",req.mongo.connection.readyState );
    if (!(req.user)) {
        return next();
    }
    console.log('user2',req.user);

    res.redirect('/dashboard');
}