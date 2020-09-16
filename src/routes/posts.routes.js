import {Router} from 'express'
const router = Router()

import * as postsCtrl from '../controllers/posts.controller'
import { authJwt } from '../middlewares'

router.post('/', [authJwt.verifyToken, authJwt.isUser ], postsCtrl.createPost)
router.get('/', postsCtrl.getPosts)
router.get('/:postId', postsCtrl.getPostById)
router.put('/:postId', [authJwt.verifyToken, authJwt.isUser ], postsCtrl.updatePostById)
router.delete('/:postId', [authJwt.verifyToken, authJwt.isUser ], postsCtrl.deletePostById)

export default router;