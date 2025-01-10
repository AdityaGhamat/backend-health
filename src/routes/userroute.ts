import { Router } from "express";
import { signup, login } from "../controllers/usercontroller";

const router = Router();

// User Signup
router.post("/signup", signup);

// User Login
router.post("/login", login);

export default router;
