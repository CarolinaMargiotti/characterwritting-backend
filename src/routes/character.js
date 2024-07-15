const router = require("express").Router();
const { CharacterController } = require("../controllers");
const { create, getCharacter, deleteCharacter, updateCharacter } =
	new CharacterController();

router.post("/create", create);

router.get("/get", getCharacter);

router.delete("/delete", deleteCharacter);

router.put("/update", updateCharacter);
module.exports = router;
