const API_BASE_URL = "http://localhost:3000";

const state = {
	data: {},
	getState() {
		return this.data;
	},

	setState(newState: any) {
		this.data = newState; //? Sobreescribe la data.
		for (const callback of this.listeners) {
			callback(); //? Ejecuta los listeners suscritos a los cambios en el state.
		}
		//? Almacena en localStorage una copia de los datos actualizados.
		localStorage.setItem("state-cache", JSON.stringify(newState));
	},

	async getNearestCommerce(params: { lat: number; lng: number }) {
		const res = await fetch(
			`${API_BASE_URL}/nearest-commerce?lat=${params.lat}&lng=${params.lng}`,
			{
				method: "GET",
			}
		);
		return { response: res.json(), status: res.status };
	},
};

export { state };
