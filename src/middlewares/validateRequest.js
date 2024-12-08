function validateMessageRequestAllData(req, res, next) {
	const { characterId, message, sceneId, chapterId, bookId } = req.body;

	if (!characterId || !message || !sceneId || !chapterId || !bookId) {
		return res
			.status(400)
			.json({ error: "One or more attributes are missing" });
	}

	next();
}

module.exports = { validateMessageRequestAllData };