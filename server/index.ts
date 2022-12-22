import { sequelize } from "../db";

async function main() {
	//? Podemos utilizar Try-Catch en conjunto con funciones asíncronas para manejar errores de código asíncrono (dependiendo del caso).
	// try {
	// 	await sequelize.authenticate();
	// 	console.log("Connection has been established successfully.");
	// } catch (error) {
	// 	console.error("Unable to connect to the database:", error);
	// }

	//* Se sincroniza con la DB, "alter: true" le indica a la misma que haga los cambios "afectando" lo menos posible a los demás datos.
	await sequelize.sync({ alter: true });
}

main();
