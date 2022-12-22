function checkReqBody(body) {
	const res: any = {};
	if (body.name) {
		res.name = body.name;
	}
	if (body.lat && body.lng) {
		res._geoloc = {
			lat: body.lat,
			lng: body.lng,
		};
	}
	return res;
}

export { checkReqBody };
