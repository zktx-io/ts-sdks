// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs } from '@mysten/sui/bcs';
import type { Transaction } from '@mysten/sui/transactions';

import * as vec_map from '../deps/0000000000000000000000000000000000000000000000000000000000000002/vec_map.js';
import { normalizeMoveArguments } from '../utils/index.js';
import type { RawTransactionArgument } from '../utils/index.js';

export function WalrusContext() {
	return bcs.struct('WalrusContext', {
		epoch: bcs.u32(),
		committee_selected: bcs.bool(),
		committee: vec_map.VecMap(bcs.Address, bcs.vector(bcs.u16())),
	});
}
export function init(packageAddress: string) {
	function epoch(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [
			'0000000000000000000000000000000000000000000000000000000000000000::walrus_context::WalrusContext',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'walrus_context',
				function: 'epoch',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function committee_selected(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [
			'0000000000000000000000000000000000000000000000000000000000000000::walrus_context::WalrusContext',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'walrus_context',
				function: 'committee_selected',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function committee(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [
			'0000000000000000000000000000000000000000000000000000000000000000::walrus_context::WalrusContext',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'walrus_context',
				function: 'committee',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}

	return { epoch, committee_selected, committee };
}
