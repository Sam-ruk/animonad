import { Alchemy, Network } from "alchemy-sdk";

const alchemy = new Alchemy({ 
	apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY, 
	network: Network.MONAD_TESTNET,
	url: process.env.NEXT_PUBLIC_MONAD_WSS
});

export default alchemy; // only 1 export so while importing no braces