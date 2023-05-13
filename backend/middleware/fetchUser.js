const jwt = require('jsonwebtoken');

const JWT_SECRET = 'FuckThemAll';

const fetchUser = (req ,res ,next ) =>
{
    // get the user frrom the token and add id to the request object
    const token = req.header('auth-token');
    if(!token)
    {
        return res.status(401).json({error : ' authenticate the use of valid token'});
    }
    try {
        const data = jwt.verify(token ,JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).json({error : ' authenticate the use of valid token'});
    }
    
}

module.exports = fetchUser;