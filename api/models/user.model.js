import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fprofile_3135715&psig=AOvVaw0qZhR_taSogi8cpWVL65V_&ust=1721445331585000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKji9t6RsocDFQAAAAAdAAAAABAW"
    },
}, { timestamps: true }
);
const User = mongoose.model('User', userSchema);

export default User;