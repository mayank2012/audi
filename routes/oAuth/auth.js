import express from "express";
const router = express.Router();
import User from "../../model/User/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  registerValidation,
  loginValidation,
} from "../../model/validationService/authValidation.js";

/**
 * @openapi
 * /api/user/register:
 *   post:
 *     tags:
 *       - Users oAuth
 *     summary: Register new Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post("/register", async (req, res) => {
  // Data Validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if User Details already exists
  const emailDuplicationCheck = await User.findOne({ email: req.body.email });
  if (emailDuplicationCheck)
    return res.status(400).send("EMail already Exists");

  // Password Hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create New User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ user_id: user._id });
    // console.log(savedUser)
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * @openapi
 * /api/user/login:
 *   post:
 *     tags:
 *       - Users oAuth
 *     summary: User Login
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post("/login", async (req, res) => {
  // Data Validation
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if User Details exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("EMail does not Exists");

  // Password Validation
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Password doesn't match");

  // Create and Assign User JWT Token
  const userToken = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

  res.status(200).send({
    _id: user._id,
    token: userToken,
    message: "Holla! Successful Login...!!",
  });
});

export default router;
