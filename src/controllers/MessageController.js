const { MessageModel } = require("../models");

class MessageController {
	async create(req, res) {
		let { characterId, message, sceneId, chapterId, bookId } = req.body;
		if (
			!characterId ||
			!message ||
			!sceneId ||
			!chapterId ||
			!bookId
		)
			res.status(400).json({ error: "attribute/s missing" });

		try {
			const newMessage = new MessageModel(
				null,
				characterId,
                message,
                1,
                1,
                1
			);

			await newMessage.save();
			res.status(200).json("saved successfully");
		} catch (error) {
			res.status(402).json({ error: error.message });
		}
	}

	async getMessage(req, res) {
		let { id } = req.body;
		if (!id) res.status(400).json({ error: "id missing" });

		try {
			const message = await MessageModel.getById(id);
			res.status(200).json(message);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}

	async getAll(req, res) {
		try {
			const messages = await MessageModel.getAll();

			res.status(200).json(messages);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}

	async deleteMessage(req, res) {
		let { id } = req.body;
		if (!id) res.status(400).json({ error: "id missing" });

		try {
			await MessageModel.deleteMessage(id);
			res.status(200).json("deleted successfuly");
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}

	async updateMessage(req, res) {
		let { messageId, characterId, message, sceneId, chapterId, bookId } = req.body;
		if (!messageId || !characterId || !message || !sceneId || !chapterId || !bookId) res.status(400).json({ error: "attribute/s missing" });

		try {
			const messageUpdated = new MessageModel(
				messageId,
				characterId,
				message,
				1,
				1,
				1
			);
			await messageUpdated.updateMessage();
			res.status(200).json("updated successfully");
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}
}

module.exports = MessageController;
