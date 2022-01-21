'use strict'

import bcrypt from 'bcrypt'

export const hashPassword = (userPassword: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(process.env.PASSWORD_SALT, (err, salt) => {
      if (err) reject(err)
      bcrypt.hash(userPassword, salt, (err, hash) => {
        if (err) reject(err)
        else resolve(hash)
      })
    })
  })
}

export const comparePassword = async (
  unencryptedUserPassword: string,
  encryptedUserPassword: string
) => {
  const match = await bcrypt.compare(unencryptedUserPassword, encryptedUserPassword)
  return match
}
