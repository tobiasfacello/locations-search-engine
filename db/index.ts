import { Sequelize } from "sequelize-cockroachdb";
import "dotenv/config";

//* Se realiza la conexión a la base de datos en la nube.

const sequelize = new Sequelize(process.env.DB_URL, {
	dialect: "postgres",
	ssl: true,
});

export { sequelize };
