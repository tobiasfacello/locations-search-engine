import { commercesIndex } from "../lib/algolia";
import { checkReqBody } from "../lib/reqBodyCheck";
import * as express from "express";
import * as cors from "cors";
import * as path from "path";
import * as bodyParser from "body-parser";
const app = express();

//? Settings
const port = process.env.PORT || 3000;

//? Middlewares
app.use(cors());
app.use(bodyParser.json());

//? Models
import { Commerce } from "../db/models/commerce";

//* CRUD

//? Create a commerce
app.post("/commerces", async (req, res) => {
	const { name, lat, lng } = req.body;

	try {
		const newCommerce = await Commerce.create({
			name,
			lat,
			lng,
		});

		await commercesIndex.saveObject({
			objectID: newCommerce.get("id"),
			name,
			_geoloc: {
				lat,
				lng,
			},
		});

		res.send(newCommerce);
	} catch (err) {
		res.send({ Error: err });
	}
});

//? Get all commerces
app.get("/commerces", async (req, res) => {
	const commerces = await Commerce.findAll();
	res.send(commerces);
});

//? Get a commerce
app.get("/commerces/:id", async (req, res) => {
	const id = req.params.id;
	const commerce = await Commerce.findOne({ where: { id } });
	res.status(302).send(commerce);
});

//? Update a commerce
app.put("/commerces/:id", async (req, res) => {
	const id = req.params.id;
	try {
		await Commerce.update(req.body, { where: { id } });

		const indexItem = checkReqBody(req.body);
		await commercesIndex.partialUpdateObject({
			...indexItem,
			objectID: id,
		});

		res.send({
			message: `Instance with ID ${id} updated correctly.`,
		});
	} catch (err) {
		res.send({ Error: err });
	}
});

//? Delete a commerce
app.delete("/commerces/:id", async (req, res) => {
	const id = req.params.id;

	try {
		await Commerce.destroy({ where: { id } });

		await commercesIndex.deleteObject(id);

		res.send({ message: `Instance with ID ${id} deleted correctly.` });
	} catch (err) {
		res.send({ Error: err });
	}
});

//? Get the nearest commerce (from lat&lng)
app.get("/nearest-commerce", async (req, res) => {
	const { lat, lng } = req.query;
	commercesIndex
		.search("", {
			aroundLatLng: `${lat}, ${lng}`,
			aroundRadius: 100000,
		})
		.then(({ hits }) => {
			res.send({ hits });
		});
});

app.use(express.static("dist"));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => {
	console.log("Server is running on port:", port);
});
