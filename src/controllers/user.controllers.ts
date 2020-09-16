import { OK } from 'http-status-codes';
import UserService from '../services/user.service';
import JWT from '../utils/JWT';

class UserController {
  static getUsers: THandler = async (req, res) => {
    const users = await UserService.getAll();

    return res.status(OK).json({
      statusCode: OK,
      data: users,
      message: 'Ok!'
    });
  };

  static getUser: THandler = async (req, res) => {
    const id = req.params.userId;

    const user = await UserService.getOne(id);

    return res.status(OK).json({
      statusCode: OK,
      data: user,
      message: 'Ok!'
    });
  };

  static createUser: THandler = async (req, res) => {
    const { username, email, firstname, lastname, password } = req.body;

    const userData: IUserN = {
      username,
      email,
      firstname,
      lastname,
      password
    };

    const user = await UserService.create(userData);
    const token = JWT.generateToken({ user: { id: user._id } });

    return res.status(OK).json({
      statusCode: OK,
      data: token,
      message: 'OK!'
    });
  };
}

export default UserController;
