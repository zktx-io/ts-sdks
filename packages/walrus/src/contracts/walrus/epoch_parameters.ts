// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs } from '@mysten/sui/bcs';
import type { Transaction } from '@mysten/sui/transactions';

import type { RawTransactionArgument } from '../utils/index.js';
import { normalizeMoveArguments } from '../utils/index.js';

export function EpochParams() {
	return bcs.struct('EpochParams', {
		total_capacity_size: bcs.u64(),
		storage_price_per_unit_size: bcs.u64(),
		write_price_per_unit_size: bcs.u64(),
	});
}
export function init(packageAddresses: { walrus: string }) {
	function capacity(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::epoch_parameters::EpochParams`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'epoch_parameters',
				function: 'capacity',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function storage_price(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::epoch_parameters::EpochParams`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'epoch_parameters',
				function: 'storage_price',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function write_price(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::epoch_parameters::EpochParams`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'epoch_parameters',
				function: 'write_price',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function epoch_params_for_testing(options: { arguments: [] }) {
		const argumentsTypes: [] = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'epoch_parameters',
				function: 'epoch_params_for_testing',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return { capacity, storage_price, write_price, epoch_params_for_testing };
}
