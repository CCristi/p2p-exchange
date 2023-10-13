# P2P Exchange Node.js Application

## Description

P2P Exchange is a decentralized peer-to-peer exchange platform developed using Node.js. It allows users to exchange cryptocurrencies directly with each other without the need for intermediaries. This application enables secure and transparent transactions between users on the blockchain network.

## Getting Started

To run the P2P Exchange application, follow these simple steps:

1. **Clone the repository:**
   ```
   git clone <repository_url>
   cd p2p-exchange
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Start the application:**
   ```
   npm run start
   ```

   This command will launch the P2P Exchange node.js application.

4. **Start a secondary node:**
   ```
   npm run start:secondary
   ```

   Use this command to start a secondary node for increased network reliability and scalability.

## Improvements

1. Right now application does not support leader node election, therefore it is not fault tolerant. If the leader node goes down, the application will stop working. This can be fixed by implementing a leader election algorithm such as Raft or Paxos.
2. Also, the application does not check if secondary node accepts leader order book. This can be fixed by implementing a consensus algorithm which is going to be used to validate if 1/2 + 1 of nodes are in agreement. 

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make changes and commit them to your branch
4. Submit a pull request with a clear description of your changes

---

Feel free to reach out if you have any questions or concerns. Happy exchanging! 🚀
