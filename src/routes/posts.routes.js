import {Router} from 'express'
const router = Router()

import * as postsCtrl from '../controllers/posts.controller'

router.post('/', postsCtrl.createPost)
router.get('/', postsCtrl.getPosts)
router.get('/:postId', postsCtrl.getPostById)
router.put('/:postId', postsCtrl.updatePostById)
router.delete('/:postId', postsCtrl.deletePostById)

export default router;