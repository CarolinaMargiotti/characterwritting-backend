const {CharacterModel} = require("../models")

async function validateCharacterExists(req, res, next){
	const { characterId } = req.body;

    try {
        await CharacterModel.getById(characterId);
        next();
    } catch (error) {
        res.status(400).json({error:"character not found"});
    }
}

module.exports = {validateCharacterExists}