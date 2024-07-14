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
			console.log(error);
			res.status(400).json({ error: error });
		}
	}
}

module.exports = CharacterController;
