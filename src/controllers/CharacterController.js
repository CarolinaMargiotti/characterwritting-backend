const { CharacterModel } = require("../models");

class CharacterController {
	async create(req, res) {
		let { name, age, color } = req.body;
		const file = req.file;
		try {
			const newCharacter = new CharacterModel(
				null,
				name,
				color,
				age,
				file
			);
			await newCharacter.save();
			res.status(200).json("salvo com sucesso");
		} catch (error) {
			res.status(400).json({ error: error.message });
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
			const charactersDictionary = {};

			characters.forEach((item) => {
				charactersDictionary[item.id] = item;
			});

			res.status(200).json(charactersDictionary);
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
		let { id, name, age, color, image } = req.body;
		try {
			const characterUpdated = new CharacterModel(
				id,
				name,
				color,
				age,
				image
			);
			await characterUpdated.updateCharacter();
			res.status(200).json("atualizado com sucesso");
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}
}

module.exports = CharacterController;
