import {Router} from "express";
import { createCategory, getAllCategories, getIndividualCategory, deleteCategory  } from "../controllers/category.controller";



const router = Router();

//Create Category
router.post('/', createCategory)


// Get all categories
router.get('/', getAllCategories);


// Get Individual Category
router.get('/:categoryId', getIndividualCategory);


// Delete Category
router.delete("/:categoryId", deleteCategory);

export default router;