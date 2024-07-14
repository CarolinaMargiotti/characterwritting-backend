const router = require("express").Router();

const characterRoute = require("./character");

router.use("/character", characterRoute);

router.use((req, res) => {
	res.status(400).json({ error: ["Uknown Operation"] });
});

module.exports = router;
