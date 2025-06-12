import jwt from 'jsonwebtoken';
import config from '../config/env.config';
import AuthRepository from '../repositories/auth.repository';
import { IUser } from '../interfaces/IUser';

class AuthService {
  async register(userData: IUser) {
    return await AuthRepository.createUser(userData);
  }

  async login(email: string, password: string) {
    const user = await AuthRepository.findUserByEmail(email);
    if (!user) throw new Error('User not found');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = this.generateToken(user);
    return { user, token };
  }

  async forgotPassword(email: string) {
    const user = await AuthRepository.findUserByEmail(email);
    if (!user) throw new Error('User not found');
    
    // In a real app, you would send a password reset email here
    const token = this.generateToken(user, '15m');
    return { message: 'Password reset link sent to email', token };
  }

  async resetPassword(email: string, newPassword: string) {
    return await AuthRepository.updatePassword(email, newPassword);
  }

 private generateToken(user: IUser, expiresIn?: string): string {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    config.JWT_SECRET,
    { expiresIn: expiresIn  }
  );
}


}

export default new AuthService();