import { connection } from '../index'
import { IUser } from '../models/user.model'

import { IAuthRepository } from '../../api/auth/interfaces'

export class AuthRepository implements IAuthRepository {
  async createUser(user: IUser) {
    await connection.query(
      `INSERT INTO user (first_name, last_name, email, password, created_at)
                    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP());`,
      [user.first_name, user.last_name, user.email, user.password]
    )

    // const result: any[] = await connection.query(`SELECT * FROM user WHERE email = ?`, user.email);
    // return result.length ? result[0] : false;
  }

  async getUserByEmail(email: string): Promise<IUser> {
    const [result]: any[] = await connection.query(`SELECT * FROM user WHERE email = ?`, email)
    return result ? result[0] : false
  }
}
