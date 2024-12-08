function validateMessageAllData(req, res, next) {
	const { characterId, message, sceneId, chapterId, bookId } = req.body;

	if (!characterId || !message || !sceneId || !chapterId || !bookId) {
		return res
			.status(400)
			.json({ error: "One or more attributes are missing" });
	}

	next();
}

function validateCharacterAllData(req,res,next){
	let { name, color } = req.body;

	if(!name || !color){
		return res
			.status(400)
			.json({ error: "One or more attributes are missing" });
	}

	next();
}

function validateSceneAllData(req, res, next){
	let { position, chapterId, bookId, characterIds } = req.body;

	if(position===undefined|| position===null || !chapterId || !bookId || !characterIds?.length){
		return res
			.status(400)
			.json({ error: "One or more attributes are missing" });
	}

	next();
}

function validateId(req, res, next){
	let {id} = req.body;

	if(!id){
		return res
			.status(400)
			.json({ error: "id is missing" });
	}

	next();
}

module.exports = {
	validateMessageAllData,
	validateCharacterAllData,
	validateSceneAllData,
	validateId,
};