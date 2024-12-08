const router = require("express").Router();

const { MessageController } = require("../controllers");
const {ValidateDataExists,ValidateRequest} = require("../middlewares")
const { validateMessageAllData,validateId } = ValidateRequest;
const { validateCharacterExists } = ValidateDataExists;

const { create, getMessage, getAll, deleteMessage, updateMessage } =
	new MessageController();

router.post("/create", validateMessageAllData, validateCharacterExists, create);

router.get("/get", validateId, getMessage);

router.get("/getall", getAll);

router.delete("/delete", validateId, deleteMessage);

router.put(
	"/update",
	validateMessageAllData,
	validateCharacterExists,
	updateMessage
);

module.exports = router;
