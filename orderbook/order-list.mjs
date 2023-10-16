export class OrderList {
  constructor() {
    this.orders = []; // array of {price, quantity, type, id, nodeId}
  }

  createOrder(order, rid) {
    console.log(`Creating order ${JSON.stringify(order)}`);

    const newOrder = {
      ...order,
      id: `${Date.now()}-${this.orders.length}-${rid}`,
    };

    this.orders.push(newOrder);

    return newOrder;
  }

  getOrdersAfterId(id) {
    if (!id) {
      return this.orders;
    }

    const index = this.orders.findIndex((order) => order.id === id);

    return this.orders.slice(index + 1);
  }
}
