import {random} from "../utils/number.mjs";

export const generateBuys = async (client) => {
	while (true) {
		try {
			await client.sendAll({
				method: 'buy',
				params: {
					price: random(1, 100),
					quantity: random(1, 100)
				}
			})
		} catch(e) {
			console.error(`Error while sending buy: ${e.message}`)
		}

		await new Promise((resolve) => setTimeout(resolve, random(1000, 10000)))
	}
}

export const generateSells = async (client) => {
	while (true) {
		try {
			await client.sendAll({
				method: 'sell',
				params: {
					price: random(1, 100),
					quantity: random(1, 100)
				}
			})
		} catch (e) {
			console.error(`Error while sending sell: ${e.message}`)
		}

		await new Promise((resolve) => setTimeout(resolve, random(1000, 10000)))
	}
}
