const { db, ref, set, get, remove, update } = require("../database");
const { getLastId, updateId } = require("./UtilModel");
const { uploadSingleImage } = require("../util/imageHandle");

class Character {
	lastId = NaN;
	constructor(id, name, color, age, image) {
		this.id = id;
		this.name = name;
		this.color = color;
		this.age = age;
		this.image = image;
	}

	static fromSnapshot(snapshot) {
		const data = snapshot.val();
		return new Character(snapshot.key, data.name, data.color, data.age);
	}

	toFirebaseObject() {
		return {
			name: this.name,
			color: this.color,
			age: this.age,
		};
	}

	static async getById(id) {
		const characterRef = ref(db, `characters/${id}`);
		const snapshot = await get(characterRef);
		if (!snapshot.exists()) {
			throw new Error("Character not found");
		}
		return Character.fromSnapshot(snapshot);
	}

	static async getAll() {
		const charactersRef = ref(db, `characters`);
		const snapshot = await get(charactersRef);

		if (!snapshot.exists()) {
			throw new Error("No characters found");
		}

		const characters = [];
		snapshot.forEach((childSnapshot) => {
			characters.push(Character.fromSnapshot(childSnapshot));
		});
		return characters;
	}

	static async deleteCharacter(id) {
		const characterRef = ref(db, `characters/${id}`);
		await remove(characterRef);
	}

	async save() {
		updateId();
		const id = getLastId();
		const characterRef = ref(db, `characters/${id}`);
		await set(characterRef, this.toFirebaseObject());
		await uploadSingleImage(this.image, id, "characters");
	}

	async updateCharacter() {
		const characterRef = ref(db, `characters/${this.id}`);
		await update(characterRef, this.toFirebaseObject());
	}
}
module.exports = Character;
