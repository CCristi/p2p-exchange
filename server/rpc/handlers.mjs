export const createHandlers = ({ ctx, orderList }) => ({
  async sell({ price, quantity }, { rid }) {
    if (!ctx.isLeader) {
      return;
    }

    return orderList.createOrder(
      {
        type: "sell",
        price: price,
        quantity,
      },
      rid,
    );
  },
  async buy({ price, quantity }, { rid }) {
    if (!ctx.isLeader) {
      return;
    }

    return orderList.createOrder(
      {
        type: "buy",
        price: price,
        quantity,
      },
      rid,
    );
  },
  async pull_updates({ cursor }) {
    if (!ctx.isLeader) {
      return [];
    }

    return orderList.getOrdersAfterId(cursor);
  },
});
