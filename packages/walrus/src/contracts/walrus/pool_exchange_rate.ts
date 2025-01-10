// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs } from '@mysten/sui/bcs';
import type { Transaction } from '@mysten/sui/transactions';

import type { RawTransactionArgument } from '../utils/index.js';
import { normalizeMoveArguments } from '../utils/index.js';

export function PoolExchangeRate() {
	return bcs.struct('PoolExchangeRate', {
		wal_amount: bcs.u128(),
		pool_token_amount: bcs.u128(),
	});
}
export function init(packageAddresses: { walrus: string }) {
	function empty(options: { arguments: [] }) {
		const argumentsTypes: [] = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'pool_exchange_rate',
				function: 'empty',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}

	function get_wal_amount(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = [
			`${packageAddresses.walrus}::pool_exchange_rate::PoolExchangeRate`,
			'u64',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'pool_exchange_rate',
				function: 'get_wal_amount',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function get_token_amount(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = [
			`${packageAddresses.walrus}::pool_exchange_rate::PoolExchangeRate`,
			'u64',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'pool_exchange_rate',
				function: 'get_token_amount',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return { empty, get_wal_amount, get_token_amount };
}
