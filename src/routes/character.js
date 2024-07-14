const router = require("express").Router();
const { CharacterController } = require("../controllers");
const { create, getCharacter } = new CharacterController();

router.post("/create", create);

router.get("/get", getCharacter);

module.exports = router;
