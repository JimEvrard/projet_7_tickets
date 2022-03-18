import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: String,
    mail: String,
    pseudo: String,
    mdp: String,
});

const User = mongoose.model('User', userSchema);

export default User;
