import express from "express";
const router = express.Router();

router.delete("path", (req, res) => {});

/**
 * @swagger
 * /api/test/patch/{id}:
 *   patch:
 *     tags:
 *       - Test URLs
 *     summary: Test Pach Implementation
 *     parameters:
 *       - name: id
 *         in: path
 *         type: string
 *         required: true
 *       - name: reqBody
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             patchInfo:
 *               type: string
 *           required:
 *             - patchInfo
 *     responses:
 *       '200':
 *         description: Successful
 *         content: application/json
 */
router.patch("/patch/:id", express.json(), (req, res) => {
  res.status(200).json({
    patchId: req.params.id,
    patchInfo: req.body.patchInfo,
  });
});

/**
 * @swagger
 * /api/test/put/{id}:
 *   put:
 *     tags:
 *       - Test URLs
 *     summary: Test Put Implementation
 *     parameters:
 *       - name: id
 *         in: path
 *         type: string
 *         required: true
 *       - name: reqBody
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             patchInfo:
 *               type: string
 *           required:
 *             - patchInfo
 *     responses:
 *       '200':
 *         description: Successful
 *         content: application/json
 */
router.put("/put/:id", express.json(), (req, res) => {
  res.status(200).json({
    patchId: req.params.id,
    patchInfo: req.body.patchInfo,
  });
});

/**
 * @swagger
 * /api/test/delete/{id}:
 *   delete:
 *     tags:
 *       - Test URLs
 *     summary: Test Delete Implementation
 *     parameters:
 *       - name: id
 *         in: path
 *         type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: Successful
 *         content: application/json
 */
router.delete("/delete/:id", express.json(), (req, res) => {
  res.status(200).json({
    deleteId: req.params.id,
  });
});

export default router;
