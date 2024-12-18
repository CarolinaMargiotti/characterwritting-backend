const { db, ref, set, get, remove, update, push } = require("../database");
const { uploadBase64ToFirebase } = require("../util/imageHandle");

class Character {
	constructor(id, name, color, image) {
		this.id = id;
		this.name = name;
		this.color = color;
		this.image = image;
	}

	static fromSnapshot(snapshot) {
		const data = snapshot.val();
		return new Character(snapshot.key, data.name, data.color, data.image);
	}

	toFirebaseObject() {
		return {
			id: this.id,
			name: this.name,
			color: this.color,
			image: this.image
		};
	}

	static async getById(id) {
		const characterRef = ref(db, `characters/${id}`);
		const snapshot = await get(characterRef);
		if (!snapshot.exists()) {
			throw new Error("Character not found");
		}
		const character =  this.fromSnapshot(snapshot);

		return character;
	}

	static async getAll() {
		const charactersRef = ref(db, `characters`);
		const snapshot = await get(charactersRef);

		if (!snapshot.exists()) {
			throw new Error("No characters found");
		}

		return snapshot.val();
	}

	static async getCharacters(entries) {
		const charactersRef = ref(db, `characters`);

		try {
			const snapshot = await get(query(charactersRef, orderByKey()));

			if (snapshot.exists()) {
				const data = snapshot.val();
				const missingEntries = entries.filter(entry => !(entry in data));
				if (missingEntries.length === 0) {
					return data;
				} else {
					throw new Error("Missing characters: ", missingEntries)
				}
			} else {
				throw new Error("Missing characters: ", missingEntries);
			}
		} catch (error) {
			throw new Error(error.message);
		}
	}

	static async deleteCharacter(id) {
		const characterRef = ref(db, `characters/${id}`);
		await remove(characterRef);
	}

	async save() {
		const characterRef = ref(db, `characters`);
		const newRef = push(characterRef);
		this.id = newRef.key

		if(this.image){
			const downloadUrl = await uploadBase64ToFirebase(
				`characters/${this.id}`,
				this.image.base64,
				this.image.type
			);
			this.image = downloadUrl;
		}

		await set(newRef, this.toFirebaseObject());
	}

	async updateCharacter() {
		const characterRef = ref(db, `characters/${this.id}`);
		await update(characterRef, this.toFirebaseObject());
	}
}
module.exports = Character;
