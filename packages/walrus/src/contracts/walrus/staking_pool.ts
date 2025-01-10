// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs } from '@mysten/sui/bcs';
import type { Transaction } from '@mysten/sui/transactions';

import * as balance from '../deps/0000000000000000000000000000000000000000000000000000000000000002/balance.js';
import * as object from '../deps/0000000000000000000000000000000000000000000000000000000000000002/object.js';
import * as table from '../deps/0000000000000000000000000000000000000000000000000000000000000002/table.js';
import type { RawTransactionArgument } from '../utils/index.js';
import { normalizeMoveArguments } from '../utils/index.js';
import * as pending_values from './pending_values.js';
import * as storage_node from './storage_node.js';

export function VotingParams() {
	return bcs.struct('VotingParams', {
		storage_price: bcs.u64(),
		write_price: bcs.u64(),
		node_capacity: bcs.u64(),
	});
}
export function StakingPool() {
	return bcs.struct('StakingPool', {
		id: object.UID(),
		state: PoolState(),
		voting_params: VotingParams(),
		node_info: storage_node.StorageNodeInfo(),
		activation_epoch: bcs.u32(),
		latest_epoch: bcs.u32(),
		wal_balance: bcs.u64(),
		pool_token_balance: bcs.u64(),
		pending_pool_token_withdraw: pending_values.PendingValues(),
		commission_rate: bcs.u64(),
		exchange_rates: table.Table(),
		pending_stake: pending_values.PendingValues(),
		rewards_pool: balance.Balance(),
	});
}
export function PoolState() {
	return bcs.enum('PoolState', {
		New: null,
		Active: null,
		Withdrawing: bcs.u32(),
		Withdrawn: null,
	});
}
export function init(packageAddresses: { walrus: string; wal: string }) {
	function set_withdrawing(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddresses.walrus}::staking_pool::StakingPool`,
			`${packageAddresses.walrus}::walrus_context::WalrusContext`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'set_withdrawing',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function stake(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddresses.walrus}::staking_pool::StakingPool`,
			`0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${packageAddresses.wal}::wal::WAL>`,
			`${packageAddresses.walrus}::walrus_context::WalrusContext`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'stake',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function request_withdraw_stake(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddresses.walrus}::staking_pool::StakingPool`,
			`${packageAddresses.walrus}::staked_wal::StakedWal`,
			`${packageAddresses.walrus}::walrus_context::WalrusContext`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'request_withdraw_stake',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function withdraw_stake(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddresses.walrus}::staking_pool::StakingPool`,
			`${packageAddresses.walrus}::staked_wal::StakedWal`,
			`${packageAddresses.walrus}::walrus_context::WalrusContext`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'withdraw_stake',
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
			`${packageAddresses.walrus}::staking_pool::StakingPool`,
			`0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${packageAddresses.wal}::wal::WAL>`,
			`${packageAddresses.walrus}::walrus_context::WalrusContext`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'advance_epoch',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function process_pending_stake(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddresses.walrus}::staking_pool::StakingPool`,
			`${packageAddresses.walrus}::walrus_context::WalrusContext`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'process_pending_stake',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function set_next_commission(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = [`${packageAddresses.walrus}::staking_pool::StakingPool`, 'u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'set_next_commission',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function set_next_storage_price(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = [`${packageAddresses.walrus}::staking_pool::StakingPool`, 'u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'set_next_storage_price',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function set_next_write_price(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = [`${packageAddresses.walrus}::staking_pool::StakingPool`, 'u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'set_next_write_price',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function set_next_node_capacity(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<number | bigint>];
	}) {
		const argumentsTypes = [`${packageAddresses.walrus}::staking_pool::StakingPool`, 'u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'set_next_node_capacity',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function set_next_public_key(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<number[]>,
			RawTransactionArgument<number[]>,
			RawTransactionArgument<string>,
		];
	}) {
		const argumentsTypes = [
			`${packageAddresses.walrus}::staking_pool::StakingPool`,
			'vector<u8>',
			'vector<u8>',
			`${packageAddresses.walrus}::walrus_context::WalrusContext`,
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'set_next_public_key',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function set_name(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddresses.walrus}::staking_pool::StakingPool`,
			'0000000000000000000000000000000000000000000000000000000000000001::string::String',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'set_name',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function set_network_address(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			`${packageAddresses.walrus}::staking_pool::StakingPool`,
			'0000000000000000000000000000000000000000000000000000000000000001::string::String',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'set_network_address',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function set_network_public_key(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<number[]>];
	}) {
		const argumentsTypes = [`${packageAddresses.walrus}::staking_pool::StakingPool`, 'vector<u8>'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'set_network_public_key',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function destroy_empty(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::staking_pool::StakingPool`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'destroy_empty',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function exchange_rate_at_epoch(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<number>];
	}) {
		const argumentsTypes = [`${packageAddresses.walrus}::staking_pool::StakingPool`, 'u32'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'exchange_rate_at_epoch',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function wal_balance_at_epoch(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<number>];
	}) {
		const argumentsTypes = [`${packageAddresses.walrus}::staking_pool::StakingPool`, 'u32'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'wal_balance_at_epoch',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function commission_rate(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::staking_pool::StakingPool`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'commission_rate',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function rewards_amount(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::staking_pool::StakingPool`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'rewards_amount',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function wal_balance(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::staking_pool::StakingPool`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'wal_balance',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function storage_price(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::staking_pool::StakingPool`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'storage_price',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function write_price(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::staking_pool::StakingPool`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'write_price',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function node_capacity(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::staking_pool::StakingPool`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'node_capacity',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function activation_epoch(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::staking_pool::StakingPool`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'activation_epoch',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function node_info(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::staking_pool::StakingPool`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'node_info',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function is_new(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::staking_pool::StakingPool`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'is_new',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function is_active(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::staking_pool::StakingPool`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'is_active',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function is_withdrawing(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::staking_pool::StakingPool`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'is_withdrawing',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function is_empty(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.walrus}::staking_pool::StakingPool`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.walrus,
				module: 'staking_pool',
				function: 'is_empty',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return {
		set_withdrawing,
		stake,
		request_withdraw_stake,
		withdraw_stake,
		advance_epoch,
		process_pending_stake,
		set_next_commission,
		set_next_storage_price,
		set_next_write_price,
		set_next_node_capacity,
		set_next_public_key,
		set_name,
		set_network_address,
		set_network_public_key,
		destroy_empty,
		exchange_rate_at_epoch,
		wal_balance_at_epoch,
		commission_rate,
		rewards_amount,
		wal_balance,
		storage_price,
		write_price,
		node_capacity,
		activation_epoch,
		node_info,
		is_new,
		is_active,
		is_withdrawing,
		is_empty,
	};
}
