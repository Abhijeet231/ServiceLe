import {Router} from "express";
import { createCategory, getAllCategories, getIndividualCategory, deleteCategory  } from "../controllers/category.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import { verifyRoles } from "../middleware/verifyRoles.js";
import validate from "../middleware/validation.middleware.js";
import { createServiceCategorySchema } from "../validations/category.validate.js";

const router = Router();

//Create Category
router.post('/',verifyJWT,verifyRoles("admin"),validate(createServiceCategorySchema), createCategory)


// Get all categories
router.get('/', getAllCategories);


// Get Individual Category
router.get('/:categoryId', getIndividualCategory);


// Delete Category
router.delete("/:categoryId",verifyJWT, verifyRoles("admin"), deleteCategory);

export default router;