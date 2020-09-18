import { BAD_REQUEST, NOT_FOUND } from 'http-status-codes';
import { Model } from 'mongoose';

import User from '../models/User';
import ErrorHandler from '../errors/ErrorHandler';
import Bcrypt from '../utils/Bcrypt';

import InjectModel from '../decorators';
import { StateUser } from '../common/enumerations/state';

class UserService {
  @InjectModel(User)
  private static userModel: Model<IUser>;

  private static notShowField = {
    password: 0,
    facebookId: 0,
    googleId: 0,
    confirmAccount: 0,
    stateUser: 0
  };

  static async getAll() {
    const users = await this.userModel.find(
      { stateUser: StateUser.ACTIVE },
      this.notShowField
    );
    return users;
  }

  static async getOne(id: string) {
    const user = await this.userModel.findOne(
      {
        $and: [{ _id: id }, { stateUser: StateUser.ACTIVE }]
      },
      this.notShowField
    );

    if (!user) throw new ErrorHandler(NOT_FOUND, 'User not found');

    return user;
  }

  static async create(userData: IUserN) {
    const userExist = await this.userModel.findOne({
      $or: [{ username: userData.username }, { email: userData.email }]
    });

    if (userExist) throw new ErrorHandler(BAD_REQUEST, 'User already exist');

    const user = await this.userModel.create({
      ...userData,
      password: await Bcrypt.encryptPassword(userData.password),
      stateUser: StateUser.ACTIVE,
      image: ''
    });

    return user;
  }

  static async logIn(username: string, password: string) {
    const user = await this.userModel.findOne({
      $or: [
        { $and: [{ email: username }, { stateUser: StateUser.ACTIVE }] },
        { $and: [{ username }, { stateUser: StateUser.ACTIVE }] }
      ]
    });

    if (!user) throw new ErrorHandler(NOT_FOUND, 'Invalid credentials');

    const validPassword = await Bcrypt.comparePasswords(password, user.password);

    if (!validPassword) throw new ErrorHandler(BAD_REQUEST, 'Invalid credentials');

    return user;
  }

  static async update(id: string, userData: IUserN) {
    const user = await this.getOne(id);

    if (!user) throw new ErrorHandler(NOT_FOUND, 'Invalid credentials');

    const { firstname, lastname, username, email, image } = user;

    const userUpdate = await this.userModel.findByIdAndUpdate(
      { _id: user.id },
      {
        firstname: userData.firstname || firstname,
        lastname: userData.lastname || lastname,
        username: userData.username || username,
        email: userData.email || email,
        image: userData.image || image
      },
      {
        new: true
      }
    );
    return userUpdate;
  }

  static async delete(id: string) {
    const user = await this.getOne(id);
    if (!user) throw new ErrorHandler(NOT_FOUND, 'User not Found');

    await this.userModel.findOneAndUpdate(
      {
        $and: [{ _id: user._id }, { stateUser: StateUser.ACTIVE }]
      },
      {
        stateUser: StateUser.INACTIVE
      }
    );
  }
}

export default UserService;
