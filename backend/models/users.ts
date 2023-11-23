import {model,Document, Schema } from "mongoose"
interface IUser extends Document{
    fullname : string;
    username: string;
    email: string;
    password: string;
    contact : number;
}

const UserSchema = new Schema<IUser>({
    fullname : {
        type: String,
        required: true
    },
    username:{
        type:String,
        required:true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    contact:{
        type:Number,
        required: true,
    }
})

const User = model<IUser>("User", UserSchema)
export {IUser, User}
