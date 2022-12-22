import { sequelize } from "../index";
import { Model, DataTypes } from "sequelize-cockroachdb";

class Auth extends Model {}

Auth.init(
	{
		user_id: DataTypes.INTEGER,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
	},
	{ sequelize, modelName: "Auth" }
);

export { Auth };
