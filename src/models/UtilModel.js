const { db, ref, get, set } = require("../database");

let lastId = NaN;
const lastIdRef = ref(db, "lastId");

async function initializeLastId() {
	const id = (await get(lastIdRef)).val();

	this.lastId = id;
}
(async () => await initializeLastId())();

async function updateId() {
	this.lastId++;
	console.log(this.lastId);
	await set(lastIdRef, this.lastId);
}

function getLastId() {
	return this.lastId;
}

module.exports = { getLastId, updateId };
