const { MessageModel } = require("../models");

class MessageController {
	async create(req, res) {
		let { characterId, message, sceneId, chapterId, bookId } = req.body;

		try {
			const newMessage = new MessageModel(
				null,
				characterId,
				message,
				sceneId,
				chapterId,
				bookId
			);

			await newMessage.save();
			res.status(200).json("saved successfully");
		} catch (error) {
			res.status(402).json({ error: error.message });
		}
	}

	async getMessage(req, res) {
		let { id } = req.body;

		try {
			const message = await MessageModel.getById(id);
			res.status(200).json(message);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}

	async getAll(req, res) {
		try {
			const {sceneId, chapterId, bookId} = req.query;
			const getMessages = new MessageModel(
				null,
				null,
				null,
				sceneId,
				chapterId,
				bookId
			);
			const messages = await getMessages.getAll();

			res.status(200).json(messages);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}

	async deleteMessage(req, res) {
		let { id } = req.body;

		try {
			await MessageModel.deleteMessage(id);
			res.status(200).json("deleted successfuly");
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}

	async updateMessage(req, res) {
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
