import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel } from '../interfaces/IUser';
import bcrypt from 'bcryptjs';

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['attendee', 'host'], required: true }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.method('comparePassword', async function(password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
});

export default model<IUser, UserModel>('User', userSchema);