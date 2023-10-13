import {Orderbook} from "./orderbook.mjs";

export class OrderbookApp {
	constructor() {
		this.orderBook = new Orderbook()
		this.cursor = null
	}

	handleUpdates(updates) {
		for (const update of updates) {
			if (update.type === 'buy') {
				this.orderBook.addBuyOrder(update)
			} else if (update.type === 'sell') {
				this.orderBook.addSellOrder(update)
			}
		}

		this.cursor = updates[updates.length - 1]?.id ?? this.cursor
		this.orderBook.matchOrders()
	}

	getCursor() {
		return this.cursor
	}
}
