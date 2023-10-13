import {createHandlers} from "./server/rpc/handlers.mjs";
import {createService} from "./server/index.mjs";
import {OrderList} from "./orderbook/order-list.mjs";
import {rpcSchema} from "./server/rpc/schema.mjs";
import {createClient} from "./client/index.mjs";
import {generateBuys, generateSells} from "./client/mocks.mjs";
import {envConfig} from "./config/env.js";
import {OrderbookApp} from "./orderbook/orderbook-app.js";

const config = envConfig()
const orderList = new OrderList()

const startServer = async () => {
	const service = createService({
		grape: config.grape,
		port: config.port,
		rpcName: config.rpcName,
		pollInterval: 1000
	})

	const handlers = createHandlers({
		orderList,
		ctx: config,
	})

	service.on('request', async (rid, key, payload, handler) => {
		const {method, params} = rpcSchema.parse(JSON.parse(payload))
		const response = await handlers[method](params, {rid})

		handler.reply(null, JSON.stringify(response))
	})

	await new Promise((resolve) => setTimeout(resolve, 3000))

	console.log(`Service is listening on port ${service.port}`)
}

const startClient = () => {
	const orderbookApp = new OrderbookApp()
	const client = createClient({
		grape: config.grape,
		rpcName: config.rpcName
	})

	const pullUpdates = async () => {
		try {
			const allUpdates = await client.sendAll({
				method: 'pull_updates',
				params: {last_id: orderbookApp.cursor}
			})

			orderbookApp.handleUpdates(allUpdates.flat())
		} catch (e) {
			console.error(`Error while pulling updates: ${e.message}`)
		}
	}

	setInterval(pullUpdates, 1000)

	void generateBuys(client)
	void generateSells(client)
}

void startServer().then(() => {
	startClient()
})
