const { CharacterModel } = require("../models");

class CharacterController {
	async create(req, res) {
		let { name, color,image } = req.body;

		try {
			const newCharacter = new CharacterModel(
				null,
				name,
				color,
				image||null
			);

			await newCharacter.save();
			res.status(200).json("saved successfully");
		} catch (error) {
			res.status(402).json({ error: error.message });
		}
	}

	async getCharacter(req, res) {
		let { id } = req.body;

		try {
			const character = await CharacterModel.getById(id);
			res.status(200).json(character);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}

	async getAll(req, res) {
		try {
			const characters = await CharacterModel.getAll();

			res.status(200).json(characters);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}

	async deleteCharacter(req, res) {
		let { id } = req.body;

		try {
			await CharacterModel.deleteCharacter(id);
			res.status(200).json("deleted successfuly");
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}

	async updateCharacter(req, res) {
		let { id, name, color, image } = req.body;

		try {
			const characterUpdated = new CharacterModel(
				id,
				name,
				color,
				image
			);
			await characterUpdated.updateCharacter();
			res.status(200).json("updated successfully");
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}
}

module.exports = CharacterController;
