import User from '../models/user';
import { IUser } from '../interfaces/IUser';

class AuthRepository {
  async createUser(userData: IUser) {
    const user = new User(userData);
    return await user.save();
  }

  async findUserByEmail(email: string) {
    return await User.findOne({ email });
  }

  async updatePassword(email: string, newPassword: string) {
    return await User.findOneAndUpdate(
      { email },
      { password: newPassword },
      { new: true }
    );
  }
}

export default new AuthRepository();