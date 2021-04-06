import express from "express";
import axios from "axios";
const router = express.Router();

/**
 * @openapi
 * /api/githubJobs/fetch:
 *   get:
 *     tags:
 *       - Github
 *     security:
 *       - bearerAuth: []
 *     summary: List all github listed jobs
 *     responses:
 *       '200':
 *         description: Able to retrive all the posts
 *       '400':
 *         description: Unable to parse the data
 */
router.get("/fetch", async (req, res) => {
    var config = {
        method: "get",
        url: "https://jobs.github.com/positions.json",
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    };

    axios(config)
        .then(function (response) {
            // console.log(JSON.stringify(response.data));
            res.send(response.data);
        })
        .catch(function (error) {
            res.sendStatus(400).send(error);
        });
});

export default router;
