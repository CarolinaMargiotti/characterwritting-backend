const { CharacterModel } = require("../models");

class CharacterController {
	async create(req, res) {
		let { id, name, age, color, image } = req.body;
		try {
			const newCharacter = new CharacterModel(
				id,
				name,
				age,
				color,
				image
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
}

module.exports = CharacterController;
