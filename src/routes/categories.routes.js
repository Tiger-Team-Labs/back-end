import {Router} from 'express'
const router = Router()

import * as categoriesCtrl from '../controllers/categories.controller'
import { authJwt } from '../middlewares'

router.post('/', [authJwt.verifyToken, authJwt.isAdmin], categoriesCtrl.createCategory)
router.get('/', categoriesCtrl.getCategories)
router.get('/:categoryId', categoriesCtrl.getCategoryById)
router.put('/:categoryId', [authJwt.verifyToken, authJwt.isAdmin], categoriesCtrl.updateCategoryById)
router.delete('/:categoryId', [authJwt.verifyToken, authJwt.isAdmin], categoriesCtrl.deleteCategoryById)

export default router;