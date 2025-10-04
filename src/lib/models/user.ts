import mongoose from "mongoose";
import bcrypt from "bcryptjs";



// 1-Step interface for model
// --- Main User Interface ---

export interface IUser extends mongoose.Document {
  email: string;
  password: string; 
  firstName?: string;
  lastName?: string;
  phone?: string;
  image?: string;
  role: 'customer' | 'admin' | 'seller'; 
  otp?: string;
  otpExpires?: Date; 
  isVerified: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2-Step User Schema
// --- Mongoose Schema Definition ---

const UserSchema = new mongoose.Schema<IUser>({
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    image: { type: String, trim: true },
    otp: { type: String },
    otpExpires: { type: Date },
    role: { type: String, enum: ['customer', 'admin', 'seller'] , required: true , default: 'customer'},
    isVerified: { type: Boolean, default: false },

}, { timestamps: true });

// 3-Step Password Encryption
// --- Password Hashing ---
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


// 4-Step Password Comparison
// --- Method to Compare Passwords ---
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.User ||mongoose.model<IUser>('User', UserSchema);

export default User;