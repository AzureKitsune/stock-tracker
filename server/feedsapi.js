import {Router} from "express";
const router = Router();
router.use("/feeds", (req, res) => {
    res.send("feeds");
});

export default router;