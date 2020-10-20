import express from "express";
import verify from "./oAuth/verifyToken.js";

const router = express.Router();

/**
 * @openapi
 * /api/posts:
 *   get:
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     summary: List all the posts
 *     responses:
 *       '200':
 *         description: Able to retrive all the posts
 *       '401':
 *         description: Please pass the correct User Access Token
 */
router.get("/", verify, async (req, res) => {
  res.json({
    status: {
      errorCode: "0",
      message: "Successful data Submission done.",
    },
  });
});

export default router;
