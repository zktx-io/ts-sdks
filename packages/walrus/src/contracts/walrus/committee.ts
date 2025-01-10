// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs } from '@mysten/sui/bcs';
import type { Transaction } from '@mysten/sui/transactions';

import * as vec_map from '../deps/0000000000000000000000000000000000000000000000000000000000000002/vec_map.js';
import type { RawTransactionArgument } from '../utils/index.js';
import { normalizeMoveArguments } from '../utils/index.js';

export function Committee() {
	return bcs.struct('Committee', {
		pos0: vec_map.VecMap(bcs.Address, bcs.vector(bcs.u16())),
	});
}
export function init(packageAddresses: { walrus: string }) {
	function empty(options: { arguments: [] }) {
		const argumentsTypes: [] = [];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'committee',
				function: 'empty',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function initialize(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [
			'0000000000000000000000000000000000000000000000000000000000000002::vec_map::VecMap<0000000000000000000000000000000000000000000000000000000000000002::object::ID, u16>',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'committee',
				function: 'initialize',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function transition(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddresses.walrus}::committee::Committee`,
			'0000000000000000000000000000000000000000000000000000000000000002::vec_map::VecMap<0000000000000000000000000000000000000000000000000000000000000002::object::ID, u16>',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'committee',
				function: 'transition',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function shards(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddresses.walrus}::committee::Committee`,
			'0000000000000000000000000000000000000000000000000000000000000002::object::ID',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'committee',
				function: 'shards',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function size(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::committee::Committee`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'committee',
				function: 'size',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function inner(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::committee::Committee`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'committee',
				function: 'inner',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function to_inner(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::committee::Committee`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'committee',
				function: 'to_inner',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return { empty, initialize, transition, shards, size, inner, to_inner };
}
