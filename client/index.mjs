import {PeerRPCClient} from "grenache-nodejs-ws";
import Link from "grenache-nodejs-link";

export const createClient = ({grape, rpcName}) => {
	const link = new Link({
		grape

	})
	link.start()

	const client =  new PeerRPCClient(link, {})

	client.init()

	return {
		sendAll: ({method, params}) => {
			return new Promise((resolve, reject) => {
				client.map(rpcName, JSON.stringify({
					method,
					params
				}), {timeout: 10000}, (err, data) => {
					if (err) {
						reject(err)
						return;
					}

					resolve(data.filter(item => Boolean(item)).map((item) => JSON.parse(item.toString())))
				})
			})
		},
	}
}


