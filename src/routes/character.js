const router = require("express").Router();
const { CharacterController } = require("../controllers");
const { create, getCharacter, deleteCharacter } = new CharacterController();

router.post("/create", create);

router.get("/get", getCharacter);

router.delete("/delete", deleteCharacter);
module.exports = router;
