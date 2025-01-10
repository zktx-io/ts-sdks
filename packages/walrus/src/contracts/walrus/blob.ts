// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs } from '@mysten/sui/bcs';
import type { Transaction } from '@mysten/sui/transactions';

import * as object from '../deps/0000000000000000000000000000000000000000000000000000000000000002/object.js';
import { normalizeMoveArguments } from '../utils/index.js';
import type { RawTransactionArgument } from '../utils/index.js';
import * as storage_resource from './storage_resource.js';

export function Blob() {
	return bcs.struct('Blob', {
		id: object.UID(),
		registered_epoch: bcs.u32(),
		blob_id: bcs.u256(),
		size: bcs.u64(),
		encoding_type: bcs.u8(),
		certified_epoch: bcs.option(bcs.u32()),
		storage: storage_resource.Storage(),
		deletable: bcs.bool(),
	});
}
export function BlobIdDerivation() {
	return bcs.struct('BlobIdDerivation', {
		encoding_type: bcs.u8(),
		size: bcs.u64(),
		root_hash: bcs.u256(),
	});
}
export function init(packageAddress: string) {
	function registered_epoch(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [
			'0000000000000000000000000000000000000000000000000000000000000000::blob::Blob',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'blob',
				function: 'registered_epoch',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function blob_id(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [
			'0000000000000000000000000000000000000000000000000000000000000000::blob::Blob',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'blob',
				function: 'blob_id',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function size(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [
			'0000000000000000000000000000000000000000000000000000000000000000::blob::Blob',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'blob',
				function: 'size',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function encoding_type(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [
			'0000000000000000000000000000000000000000000000000000000000000000::blob::Blob',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'blob',
				function: 'encoding_type',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function certified_epoch(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [
			'0000000000000000000000000000000000000000000000000000000000000000::blob::Blob',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'blob',
				function: 'certified_epoch',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function storage(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [
			'0000000000000000000000000000000000000000000000000000000000000000::blob::Blob',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'blob',
				function: 'storage',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function encoded_size(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<number>];
	}) {
		const argumentsTypes = [
			'0000000000000000000000000000000000000000000000000000000000000000::blob::Blob',
			'u16',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'blob',
				function: 'encoded_size',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function storage_mut(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [
			'0000000000000000000000000000000000000000000000000000000000000000::blob::Blob',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'blob',
				function: 'storage_mut',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function end_epoch(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [
			'0000000000000000000000000000000000000000000000000000000000000000::blob::Blob',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'blob',
				function: 'end_epoch',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function assert_certified_not_expired(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<number>];
	}) {
		const argumentsTypes = [
			'0000000000000000000000000000000000000000000000000000000000000000::blob::Blob',
			'u32',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'blob',
				function: 'assert_certified_not_expired',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function derive_blob_id(options: {
		arguments: [
			RawTransactionArgument<number | bigint>,
			RawTransactionArgument<number>,
			RawTransactionArgument<number | bigint>,
		];
	}) {
		const argumentsTypes = ['u256', 'u8', 'u64'];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'blob',
				function: 'derive_blob_id',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}

	function certify_with_certified_msg(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<number>,
			RawTransactionArgument<string>,
		];
	}) {
		const argumentsTypes = [
			'0000000000000000000000000000000000000000000000000000000000000000::blob::Blob',
			'u32',
			'0000000000000000000000000000000000000000000000000000000000000000::messages::CertifiedBlobMessage',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'blob',
				function: 'certify_with_certified_msg',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}

	function burn(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [
			'0000000000000000000000000000000000000000000000000000000000000000::blob::Blob',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'blob',
				function: 'burn',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function extend_with_resource(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<number>,
		];
	}) {
		const argumentsTypes = [
			'0000000000000000000000000000000000000000000000000000000000000000::blob::Blob',
			'0000000000000000000000000000000000000000000000000000000000000000::storage_resource::Storage',
			'u32',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'blob',
				function: 'extend_with_resource',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function emit_certified(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<boolean>];
	}) {
		const argumentsTypes = [
			'0000000000000000000000000000000000000000000000000000000000000000::blob::Blob',
			'bool',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'blob',
				function: 'emit_certified',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function add_metadata(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			'0000000000000000000000000000000000000000000000000000000000000000::blob::Blob',
			'0000000000000000000000000000000000000000000000000000000000000000::metadata::Metadata',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'blob',
				function: 'add_metadata',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function take_metadata(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [
			'0000000000000000000000000000000000000000000000000000000000000000::blob::Blob',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'blob',
				function: 'take_metadata',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function metadata(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [
			'0000000000000000000000000000000000000000000000000000000000000000::blob::Blob',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'blob',
				function: 'metadata',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function insert_or_update_metadata_pair(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
		];
	}) {
		const argumentsTypes = [
			'0000000000000000000000000000000000000000000000000000000000000000::blob::Blob',
			'0000000000000000000000000000000000000000000000000000000000000001::string::String',
			'0000000000000000000000000000000000000000000000000000000000000001::string::String',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'blob',
				function: 'insert_or_update_metadata_pair',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function remove_metadata_pair(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			'0000000000000000000000000000000000000000000000000000000000000000::blob::Blob',
			'0000000000000000000000000000000000000000000000000000000000000001::string::String',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'blob',
				function: 'remove_metadata_pair',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return {
		registered_epoch,
		blob_id,
		size,
		encoding_type,
		certified_epoch,
		storage,
		encoded_size,
		storage_mut,
		end_epoch,
		assert_certified_not_expired,
		derive_blob_id,
		certify_with_certified_msg,
		burn,
		extend_with_resource,
		emit_certified,
		add_metadata,
		take_metadata,
		metadata,
		insert_or_update_metadata_pair,
		remove_metadata_pair,
	};
}
