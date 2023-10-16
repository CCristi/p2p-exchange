import Link from "grenache-nodejs-link";
import { PeerRPCServer } from "grenache-nodejs-ws";

export const createService = ({ grape, port, rpcName, pollInterval }) => {
  const link = new Link({
    grape: grape,
  });
  link.start();

  const peer = new PeerRPCServer(link);
  peer.init();

  const service = peer.transport("server");
  service.listen(port);

  setInterval(() => {
    link.announce(rpcName, service.port);
  }, pollInterval);

  return service;
};
