// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs } from '@mysten/sui/bcs';
import type { Transaction } from '@mysten/sui/transactions';

import * as object from '../deps/0000000000000000000000000000000000000000000000000000000000000002/object.js';
import type { RawTransactionArgument } from '../utils/index.js';
import { normalizeMoveArguments } from '../utils/index.js';

export function System() {
	return bcs.struct('System', {
		id: object.UID(),
		version: bcs.u64(),
	});
}
export function init(packageAddresses: { walrus: string; wal: string }) {
	function create_empty(options: { arguments: [RawTransactionArgument<number>] }) {
		const argumentsTypes = ['u32'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'system',
				function: 'create_empty',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function invalidate_blob_id(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number[]>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddresses.walrus}::system::System`,
			'vector<u8>',
			'vector<u16>',
			'vector<u8>',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'system',
				function: 'invalidate_blob_id',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function certify_event_blob(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<number | bigint>,
			RawTransactionArgument<number | bigint>,
			RawTransactionArgument<number | bigint>,
			RawTransactionArgument<number>,
			RawTransactionArgument<number | bigint>,
			RawTransactionArgument<number>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddresses.walrus}::system::System`,
			`${packageAddresses.walrus}::storage_node::StorageNodeCap`,
			'u256',
			'u256',
			'u64',
			'u8',
			'u64',
			'u32',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'system',
				function: 'certify_event_blob',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function reserve_space(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<number | bigint>,
			RawTransactionArgument<number>,
			RawTransactionArgument<string>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddresses.walrus}::system::System`,
			'u64',
			'u32',
			`0000000000000000000000000000000000000000000000000000000000000002::coin::Coin<${packageAddresses.wal}::wal::WAL>`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'system',
				function: 'reserve_space',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function register_blob(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<number | bigint>,
			RawTransactionArgument<number | bigint>,
			RawTransactionArgument<number | bigint>,
			RawTransactionArgument<number>,
			RawTransactionArgument<boolean>,
			RawTransactionArgument<string>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddresses.walrus}::system::System`,
			`${packageAddresses.walrus}::storage_resource::Storage`,
			'u256',
			'u256',
			'u64',
			'u8',
			'bool',
			`0000000000000000000000000000000000000000000000000000000000000002::coin::Coin<${packageAddresses.wal}::wal::WAL>`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'system',
				function: 'register_blob',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function certify_blob(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number[]>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddresses.walrus}::system::System`,
			`${packageAddresses.walrus}::blob::Blob`,
			'vector<u8>',
			'vector<u16>',
			'vector<u8>',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'system',
				function: 'certify_blob',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function delete_blob(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddresses.walrus}::system::System`,
			`${packageAddresses.walrus}::blob::Blob`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'system',
				function: 'delete_blob',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function extend_blob_with_resource(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddresses.walrus}::system::System`,
			`${packageAddresses.walrus}::blob::Blob`,
			`${packageAddresses.walrus}::storage_resource::Storage`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'system',
				function: 'extend_blob_with_resource',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function extend_blob(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<number>,
			RawTransactionArgument<string>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddresses.walrus}::system::System`,
			`${packageAddresses.walrus}::blob::Blob`,
			'u32',
			`0000000000000000000000000000000000000000000000000000000000000002::coin::Coin<${packageAddresses.wal}::wal::WAL>`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'system',
				function: 'extend_blob',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function epoch(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::system::System`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'system',
				function: 'epoch',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function total_capacity_size(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::system::System`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'system',
				function: 'total_capacity_size',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function used_capacity_size(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::system::System`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'system',
				function: 'used_capacity_size',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function n_shards(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::system::System`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'system',
				function: 'n_shards',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function committee(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::system::System`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'system',
				function: 'committee',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function advance_epoch(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddresses.walrus}::system::System`,
			`${packageAddresses.walrus}::bls_aggregate::BlsCommittee`,
			`${packageAddresses.walrus}::epoch_parameters::EpochParams`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'system',
				function: 'advance_epoch',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function inner_mut(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::system::System`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'system',
				function: 'inner_mut',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function inner(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::system::System`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'system',
				function: 'inner',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return {
		create_empty,
		invalidate_blob_id,
		certify_event_blob,
		reserve_space,
		register_blob,
		certify_blob,
		delete_blob,
		extend_blob_with_resource,
		extend_blob,
		epoch,
		total_capacity_size,
		used_capacity_size,
		n_shards,
		committee,
		advance_epoch,
		inner_mut,
		inner,
	};
}
