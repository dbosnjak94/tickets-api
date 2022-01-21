'use strict'

import express from 'express'
import swaggerUI from 'swagger-ui-express'
import { generateDocumentation } from '../../swagger'

import auth from './auth/router'
import ticket from './ticket/router'
import user from './user/router'

const router = express.Router()
router.use('/', swaggerUI.serve)
router.use('/auth', auth)
router.use('/ticket', ticket)
router.use('/user', user)

const documentation = generateDocumentation()
router.get('/api-docs', swaggerUI.setup(documentation))
router.get('/swagger', (_req: any, res: any) => {
  return res.send(JSON.stringify(documentation), null, 2)
})

export default router
