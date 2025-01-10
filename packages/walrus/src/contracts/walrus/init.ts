// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs } from '@mysten/sui/bcs';
import type { Transaction } from '@mysten/sui/transactions';

import * as object from '../deps/0000000000000000000000000000000000000000000000000000000000000002/object.js';
import type { RawTransactionArgument } from '../utils/index.js';
import { normalizeMoveArguments } from '../utils/index.js';

export function InitCap() {
	return bcs.struct('InitCap', {
		id: object.UID(),
	});
}
export function init(packageAddresses: { walrus: string }) {
	function init(options: { arguments: [] }) {
		const argumentsTypes: [] = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'init',
				function: 'init',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function initialize_walrus(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<number | bigint>,
			RawTransactionArgument<number | bigint>,
			RawTransactionArgument<number>,
			RawTransactionArgument<number>,
			RawTransactionArgument<string>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddresses.walrus}::init::InitCap`,
			'u64',
			'u64',
			'u16',
			'u32',
			'0000000000000000000000000000000000000000000000000000000000000002::clock::Clock',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'init',
				function: 'initialize_walrus',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function destroy(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::init::InitCap`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'init',
				function: 'destroy',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return { init, initialize_walrus, destroy };
}
