import { sequelize } from "../index";
import { Model, DataTypes } from "sequelize-cockroachdb";

//? Model es una abstracción que representa una tabla en la base de datos.
//* Definimos la clase User a partir de Model.
class User extends Model {}

//* Se inicializa User especificando los tipos de datos (DataTypes) que corresponden a las columnas de la tabla.
User.init(
	{
		full_name: DataTypes.STRING,
		email: DataTypes.STRING,
		birth_date: DataTypes.DATE,
	},
	{ sequelize, modelName: "User" }
);

export { User };
