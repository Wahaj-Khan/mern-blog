import bcryptjs from "bcryptjs";
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const updateUser = async (req, res, next) => {

    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this user'));
    }
    const updateData = {};
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, 'Password must be at least 6 characters'));
        }
        req.body.password = await bcryptjs.hash(req.body.password, 10);
        updateData.password = req.body.password;
    }
    if (req.body.username) {
        const userName = req.body.username.replace(/\s+/g, '').toLowerCase()

        if (userName.length < 7 || userName.length > 20) {
            return next(errorHandler(400, 'Username must be between 7 and 20 characters'));
        }
        if (userName.match(/[^a-zA-Z0-9]/)) {
            return next(errorHandler(400, 'Username can only contain letters and numbers'));
        }
        updateData.username = userName;
    }
    if (req.body.email) {
        if (!req.body.email.includes('@') || !req.body.email.includes('.')) {
            return next(errorHandler(400, 'Invalid email'));
        }
        updateData.email = req.body.email;
    }
    if (req.body.profilePicture) {
        updateData.profilePicture = req.body.profilePicture;
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, 
            { $set: updateData },
            { new: true });
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    }
    catch (error) {
        next(error);
    }
}

