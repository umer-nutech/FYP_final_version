import express from "express";
import { requireSignIn } from "../../fyp/middlewares/authMiddleware.js";
import {
  singleCategoryController,
  categoryControlller,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/categoryController.js";
import { isAdmin } from "../../fyp/middlewares/authMiddleware.js";
const router = express.Router();

//routes
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//get all categories
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
