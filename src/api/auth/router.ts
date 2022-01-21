'use strict'

import express from 'express'
import { IAuthController } from './interfaces'
import { AuthController } from './controllers'

const router = express.Router()
const authController: IAuthController = new AuthController()

router.post('/signUp', authController.signUp)
router.post('/signin', authController.signIn)

export default router
