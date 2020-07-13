import express from 'express'
import FileRouter from './FileRouter'
/**
 *
 * @var router Router
 */
const apiRouter = express.Router();
apiRouter.use('/',FileRouter)
// router.use('/users', checkAuth,  chat)// auth.required,
// router.use('/files', checkAuth,  survey)// auth.required,
export default apiRouter;