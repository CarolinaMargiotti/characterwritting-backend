const router = require("express").Router();

const { MessageController } = require("../controllers");
const {ValidateDataExists,ValidateMessageRequest} = require("../middlewares")
const {validateMessageRequestAllData} = ValidateMessageRequest;
const { validateCharacterExists } = ValidateDataExists;

const { create, getMessage, getAll, deleteMessage, updateMessage } =
	new MessageController();

router.post(
	"/create",
	validateMessageRequestAllData,
	validateCharacterExists,
	create
);

router.get("/get", getMessage);

router.get("/getall", getAll);

router.delete("/delete", deleteMessage);

router.put(
	"/update",
	validateMessageRequestAllData,
	validateCharacterExists,
	updateMessage
);

module.exports = router;
