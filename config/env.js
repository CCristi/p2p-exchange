export const envConfig = () => ({
  port: Number(process.env.PORT),
  isLeader: process.env.LEADER === "true",
  grape: "http://127.0.0.1:30001",
  rpcName: "orderbook_rpc",
});
