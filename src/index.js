const express = require("express");
const router = require("./routes");
const app = express();
const cors = require("cors");
require("dotenv").config();

const corsOptions = {
	origin: process.env.VUE_APP_FRONTEND_URL, // Ensure this is correct
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials: true,
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Open on: ${PORT}...`);
});

app.use("/characterwritting", router);

app.use((req, res) => {
	res.status(400).json({ error: ["Uknown URL"] });
});
