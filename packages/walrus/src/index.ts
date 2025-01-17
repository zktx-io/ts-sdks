// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { getFullnodeUrl } from '@mysten/sui/client';

import { WalrusClient } from './client.js';

const walrusClient = new WalrusClient({
	suiRpcUrl: getFullnodeUrl('testnet'),
	packageConfig: {
		packageId: '0x9f992cc2430a1f442ca7a5ca7638169f5d5c00e0ebc3977a65e9ac6e497fe5ef',
		systemObjectId: '0x50b84b68eb9da4c6d904a929f43638481c09c03be6274b8569778fe085c1590d',
		stakingPoolId: '0x37c0e4d7b36a2f64d51bba262a1791f844cfd88f31379f1b7c04244061d43914',
		exchangeIds: ['0x0e60a946a527902c90bbc71240435728cd6dc26b9e8debc69f09b71671c3029b'],
	},
});

async function main() {
	const systemState = await walrusClient.systemState();
	const stakingState = await walrusClient.stakingState();
	console.log(systemState);
	console.log(stakingState);
}

main().catch(console.error);
