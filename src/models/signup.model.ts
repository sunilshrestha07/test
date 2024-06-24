import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
   username:{ 
            type: String, 
            required: true},
   email:{ 
        type: String, 
        required: true ,
        unique: true},
   password: { 
        type: String, 
        required: true },
   verificationCode: {
        type: String,
        required: true
   },
   verified: {
        type: Boolean,
        default: false
   },
   verificationExpiry:{
        type: Date,
        required: true
   }
},{timestamps: true});

const User = mongoose.models.User || mongoose.model('User', signupSchema);
export default User