const router = require("express").Router();
const { CharacterController } = require("../controllers");
const { create, getCharacter, deleteCharacter, updateCharacter, getAll } =
	new CharacterController();

const { ValidateRequest } = require("../middlewares");
const {validateCharacterAllData, validateId} = ValidateRequest;

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/create", validateCharacterAllData, upload.single("image"), create);

router.get("/get", validateId, getCharacter);

router.get("/getall", getAll);

router.delete("/delete", validateId, deleteCharacter);

router.put("/update", validateCharacterAllData, updateCharacter);
module.exports = router;
