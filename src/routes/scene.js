const router = require("express").Router();

const { SceneController } = require("../controllers");
const { ValidateDataExists, ValidateRequest } = require("../middlewares");
const { validateSceneAllData, validateId } =
	ValidateRequest;
const { validateCharactersExists } = ValidateDataExists;

const { create, getScene, getAll, deleteScene, updateScene } =
	new SceneController();

router.post(
	"/create",
	validateSceneAllData,
	validateCharactersExists,
	create
);

router.get("/get", validateId, getScene);

router.get("/getall", getAll);

router.delete("/delete", validateId, deleteScene);

router.put(
	"/update",
	validateId,
	validateSceneAllData,
	validateCharactersExists,
	updateScene
);

module.exports = router;
