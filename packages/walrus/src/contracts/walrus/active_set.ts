// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs } from '@mysten/sui/bcs';
import type { Transaction } from '@mysten/sui/transactions';

import type { RawTransactionArgument } from '../utils/index.js';
import { normalizeMoveArguments } from '../utils/index.js';

export function ActiveSetEntry() {
	return bcs.struct('ActiveSetEntry', {
		node_id: bcs.Address,
		staked_amount: bcs.u64(),
	});
}
export function ActiveSet() {
	return bcs.struct('ActiveSet', {
		max_size: bcs.u16(),
		threshold_stake: bcs.u64(),
		nodes: bcs.vector(ActiveSetEntry()),
		total_stake: bcs.u64(),
	});
}
export function init(packageAddresses: { walrus: string }) {
	function insert_or_update(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<number | bigint>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddresses.walrus}::active_set::ActiveSet`,
			'0000000000000000000000000000000000000000000000000000000000000002::object::ID',
			'u64',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'active_set',
				function: 'insert_or_update',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function update(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<number | bigint>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddresses.walrus}::active_set::ActiveSet`,
			'0000000000000000000000000000000000000000000000000000000000000002::object::ID',
			'u64',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'active_set',
				function: 'update',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function insert(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<number | bigint>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddresses.walrus}::active_set::ActiveSet`,
			'0000000000000000000000000000000000000000000000000000000000000002::object::ID',
			'u64',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'active_set',
				function: 'insert',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function remove(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddresses.walrus}::active_set::ActiveSet`,
			'0000000000000000000000000000000000000000000000000000000000000002::object::ID',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'active_set',
				function: 'remove',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function max_size(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::active_set::ActiveSet`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'active_set',
				function: 'max_size',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function size(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::active_set::ActiveSet`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'active_set',
				function: 'size',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function active_ids(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::active_set::ActiveSet`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'active_set',
				function: 'active_ids',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function active_ids_and_stake(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::active_set::ActiveSet`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'active_set',
				function: 'active_ids_and_stake',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function threshold_stake(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::active_set::ActiveSet`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'active_set',
				function: 'threshold_stake',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function total_stake(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::active_set::ActiveSet`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'active_set',
				function: 'total_stake',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return {
		insert_or_update,
		update,
		insert,
		remove,
		max_size,
		size,
		active_ids,
		active_ids_and_stake,
		threshold_stake,
		total_stake,
	};
}
