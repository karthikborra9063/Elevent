import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15d' });

        res.cookie('jwt', token, {
            maxAge: 15 * 24 * 60 * 60 * 1000, 
            httpOnly: true,                  
            sameSite: 'strict',              
            secure: process.env.NODE_ENV !== 'development', 
        });
        res.user
    } catch (err) {
        console.error(`Error has occurred in generateTokenAndSetCookie:`, err);
        return res.status(500).json({ error: `Internal error - ${err.message}` });
    }
};

export default generateTokenAndSetCookie;
