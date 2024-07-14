const router = require("express").Router();
const { CharacterController } = require("../controllers");
const { create } = new CharacterController();

router.post("/create", create);

module.exports = router;
