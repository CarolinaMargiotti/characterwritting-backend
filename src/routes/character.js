const router = require("express").Router();
const { CharacterController } = require("../controllers");
const { create, getCharacter, deleteCharacter, updateCharacter, getAll } =
	new CharacterController();

router.post("/create", create);

router.get("/get", getCharacter);

router.get("/getall", getAll);

router.delete("/delete", deleteCharacter);

router.put("/update", updateCharacter);
module.exports = router;
