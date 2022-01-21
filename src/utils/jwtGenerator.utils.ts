import jwt from 'jsonwebtoken'
import { IUser } from '../database/models/user.model'

export const generateToken = (user: IUser) => {
  try {
    const secret = 'SecretKey'
    const token = jwt.sign(
      {
        data: {
          id_user: user.id_user,
        },
      },
      secret
    )
    return token
  } catch (err) {
    throw { message: 'Failed to create token' }
  }
}
