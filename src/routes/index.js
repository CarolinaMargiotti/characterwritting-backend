const router = require("express").Router();

const characterRoute = require("./character");
const messageRoute = require("./message")

router.use("/character", characterRoute);
router.use("/message", messageRoute);

router.use((req, res) => {
	res.status(400).json({ error: ["Uknown Operation"] });
});

module.exports = router;
