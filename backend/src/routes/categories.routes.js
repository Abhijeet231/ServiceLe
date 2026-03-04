import {Router} from "express";
import { createCategory, getAllCategories, getIndividualCategory,  } from "../controllers/category.controller";



const router = Router();

//Create Category
router.post('/api/v1/categories')


// Get all categories
router.get('/api/v1/categories');


// Get Individual Category
router.get('/api/v1/categories/:categoryId');


// Delete Category
router.delete("/api/v1/categories/:categoryId")