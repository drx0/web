export async function getRequest(url, options) {
	try	{
		let response = await (await fetch(url, {
			...options
		})).json()
	} catch (e) {
		console.error(e)
	}
}