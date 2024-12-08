const { SceneModel } = require("../models");

class MessageController {
	async create(req, res) {
		let { characterIds, position, chapterId, bookId } = req.body;

		try {
			const newScene = new SceneModel(
				null,
				position,
				chapterId,
				bookId,
				characterIds,
			);

			await newScene.save();
			res.status(200).json("saved successfully");
		} catch (error) {
			res.status(402).json({ error: error.message });
		}
	}

	async getScene(req, res) {
		let { id } = req.body;

		try {
			const scene = await SceneModel.getById(id);
			res.status(200).json(scene);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}

	async getAll(req, res) {
		try {
			const { chapterId, bookId } = req.query;

			const getScenes = new SceneModel(
				null,
				0,
				chapterId,
				bookId,
                []
			);
			const scenes = await getScenes.getAll();

			res.status(200).json(scenes);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}

	async deleteScene(req, res) {
		let { id } = req.body;

		try {
			await SceneModel.deleteScene(id);
			res.status(200).json("deleted successfuly");
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}

	async updateScene(req, res) {
		let { id, position, chapterId, bookId, characterIds } = req.body;

		try {
			const messageUpdated = new SceneModel(
				id,
				position,
				chapterId,
				bookId,
				characterIds,
			);
			await messageUpdated.updateScene();
			res.status(200).json("updated successfully");
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}
}

module.exports = MessageController;
