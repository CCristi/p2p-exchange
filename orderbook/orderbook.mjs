export class Orderbook {
	constructor() {
		this.buys = []; // array of {price, quantity}
		this.sells = []; // array of {price, quantity}
	}

	addBuyOrder(order) {
		console.log(`Adding buy order ${JSON.stringify(order)}`);

		this.buys.push(order);
		this.buys.sort((a, b) => b.price - a.price);
	}

	addSellOrder(order) {
		console.log(`Adding sell order ${JSON.stringify(order)}`);

		this.sells.push(order);
		this.sells.sort((a, b) => a.price - b.price);
	}

	matchOrders() {
		while (this.buys.length > 0 && this.sells.length > 0) {
			const buy = this.buys[0];
			const sell = this.sells[0];

			if (buy.price >= sell.price) {
				const quantity = Math.min(buy.quantity, sell.quantity);
				const price = sell.price;

				this.buys[0].quantity -= quantity;
				this.sells[0].quantity -= quantity;

				if (this.buys[0].quantity === 0) {
					this.buys.shift();
				}

				if (this.sells[0].quantity === 0) {
					this.sells.shift();
				}

				console.log(`Matched ${JSON.stringify({price, quantity})})`);
			} else {
				break;
			}
		}
	}
}
