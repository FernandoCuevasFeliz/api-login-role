import jwt from 'jsonwebtoken';

class JWT {
  private static secretKey = process.env.SECRET_KEY || 'secretkey';

  static generateToken(payload: IPayload, expiresIn: number | string = '24h') {
    const token = jwt.sign(payload, this.secretKey, {
      expiresIn
    });
    return token;
  }

  static verifyToken(token: string) {
    const payload = jwt.verify(token, this.secretKey) as IPayload;
    return payload;
  }
}

export default JWT;
