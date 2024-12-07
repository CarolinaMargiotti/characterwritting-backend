const router = require("express").Router();
const { MessageController } = require("../controllers");
const { create, getMessage, getAll, deleteMessage, updateMessage } =
	new MessageController();

router.post("/create", create);

router.get("/get", getMessage);

router.get("/getall", getAll);

router.delete("/delete", deleteMessage);

router.put("/update", updateMessage);

module.exports = router;
