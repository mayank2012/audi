import express from "express";
import axios from "axios";

const router = express.Router();

/**
 * @openapi
 * /api/githubJobs/fetch
 *   get:
 *     tags:
 *       - Github
 *     security:
 *       - bearerAuth: []
 *     summary: List all the posts
 *     responses:
 *       '200':
 *         description: Able to retrive all the posts
 *       '401':
 *         description: Please pass the correct User Access Token
 */
router.get("/fetch", verify, async (req, res) => {
    var restResonse = [];

    var config = {
        method: "get",
        url: "https://jobs.github.com/positions.json",
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    };

    axios(config)
        .then(function (response) {
            restResponse = JSON.stringify(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

    // res.json({
    //     status: {
    //         errorCode: "0",
    //         message: "Successfully up and Running.",
    //         discription:
    //             "Go on for the API Documentation mentioned at https://explore.postman.com/templates/13195/smauthserver  or reach at <Host-Url>/api-docs/",
    //     },
    // });
});

export default router;
