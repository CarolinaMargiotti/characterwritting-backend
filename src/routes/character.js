const router = require("express").Router();
const { CharacterController } = require("../controllers");
const { create, getCharacter, deleteCharacter, updateCharacter, getAll } =
	new CharacterController();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/create", upload.single("image"), create);

router.get("/get", getCharacter);

router.get("/getall", getAll);

router.delete("/delete", deleteCharacter);

router.put("/update", updateCharacter);
module.exports = router;
