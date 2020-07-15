import express from 'express'
import FileRouter from './FileRouter'
import AuthRouter from './AuthRouter'
import UserRouter from './UserRouter'
import Authorization from "@routes/Authorization";

/**
 *
 * @var router Router
 */
const apiRouter = express.Router();
apiRouter.use('/auth', AuthRouter)// auth.required,
apiRouter.use('/files', FileRouter)
apiRouter.use('/users', UserRouter)// auth.required,
export default apiRouter;