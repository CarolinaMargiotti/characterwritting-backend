const router = require("express").Router();

const characterRoute = require("./character");
const messageRoute = require("./message")
const sceneRoute = require("./scene");

router.use("/character", characterRoute);
router.use("/message", messageRoute);
router.use("/scene", sceneRoute);

router.use((req, res) => {
	res.status(400).json({ error: ["Uknown Operation"] });
});

module.exports = router;
