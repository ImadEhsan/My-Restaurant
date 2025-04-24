import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate:{
            validator: email=> /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email),
            message: props => `${props.value}: must be a valid email address`
        }
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
    },
    cart: {
        items: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            }
            }]},
           role:{
            type:String,
            enum:['admin','user', 'manager, '],
            default:'user'
           }
})

const User = mongoose.model('User', userSchema);

export default User;