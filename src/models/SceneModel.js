const { db, ref, set, get, remove, update, push } = require("../database");

class Scene {
	constructor(id, position, chapterId, bookId, characterIds) {
		this.id = id;
        this.position = position;
        this.characterIds = characterIds;
		this.chapterId = chapterId;
		this.bookId = bookId;
	}

	static fromSnapshot(snapshot) {
		const data = snapshot.val();
		return new Scene(
			snapshot.key,
            data.position,
            data.characterIds,
			data.chapterId,
			data.bookId
		);
	}

	toFirebaseObject() {
		return {
			id: this.id,
            position: this.position,
            characterIds: this.characterIds,
			chapterId: this.chapterId,
			bookId: this.bookId,
		};
	}

	scenePath() {
		return `book/${this.bookId}/chapter/${this.chapterId}/scene`;
	}

	scenePathId(id) {
		return `${this.messagePath()}/${id}`;
	}

	static async getById(id) {
		const sceneRef = ref(db, this.scenePathId(id));
		const snapshot = await get(sceneRef);
		if (!snapshot.exists()) {
			throw new Error("Scene not found");
		}
		const scene = this.fromSnapshot(snapshot);

		return scene;
	}

	async getAll() {
		const sceneRef = ref(db, this.scenePath());
		const snapshot = await get(sceneRef);

		if (!snapshot.exists()) {
			throw new Error("No scene found");
		}

		return snapshot.val();
	}

	static async deleteScene(id) {
		const sceneRef = ref(db, this.scenePathId(id));
		await remove(sceneRef);
	}

	async save() {
		const sceneRef = ref(db, this.scenePath());
		const newRef = push(sceneRef);
		this.id = newRef.key;

		await set(newRef, this.toFirebaseObject());
	}

	async updateScene() {
		const sceneRef = ref(db, this.messagePathId(this.id));
		await update(sceneRef, this.toFirebaseObject());
	}
}
module.exports = Scene;
