import { sequelize } from "../index";
import { Model, DataTypes } from "sequelize-cockroachdb";

class Commerce extends Model {}

Commerce.init(
	{
		name: DataTypes.STRING,
		lat: DataTypes.DECIMAL,
		lng: DataTypes.DECIMAL,
	},
	{ sequelize, modelName: "Commerce" }
);

export { Commerce };
