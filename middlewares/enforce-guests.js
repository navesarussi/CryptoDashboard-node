module.exports = (req, res, next) => {
    console.log('user',req.user);
    if (!(req.user)) {
        return next();
    }
    console.log('user2',req.user);

    res.redirect('/dashboard');
}