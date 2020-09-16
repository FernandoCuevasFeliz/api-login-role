import bcrypt from 'bcryptjs';

class Bcrypt {
  // encrypting password
  static async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  // compare the passwords
  static async comparePasswords(
    password: string,
    recivedPassword: string
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, recivedPassword);
    } catch (error) {
      return false;
    }
  }
}

export default Bcrypt;
