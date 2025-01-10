// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs } from '@mysten/sui/bcs';
import type { Transaction } from '@mysten/sui/transactions';

import * as balance from '../deps/0000000000000000000000000000000000000000000000000000000000000002/balance.js';
import * as object from '../deps/0000000000000000000000000000000000000000000000000000000000000002/object.js';
import type { RawTransactionArgument } from '../utils/index.js';
import { normalizeMoveArguments } from '../utils/index.js';
import * as blob from './blob.js';

export function SharedBlob() {
	return bcs.struct('SharedBlob', {
		id: object.UID(),
		blob: blob.Blob(),
		funds: balance.Balance(),
	});
}
export function init(packageAddress: string) {
	function fund(options: {
		arguments: [RawTransactionArgument<string>, RawTransactionArgument<string>];
	}) {
		const argumentsTypes = [
			'0000000000000000000000000000000000000000000000000000000000000000::shared_blob::SharedBlob',
			'0000000000000000000000000000000000000000000000000000000000000002::coin::Coin<0000000000000000000000000000000000000000000000000000000000000000::wal::WAL>',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'shared_blob',
				function: 'fund',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	function extend(options: {
		arguments: [
			RawTransactionArgument<string>,
			RawTransactionArgument<string>,
			RawTransactionArgument<number>,
		];
	}) {
		const argumentsTypes = [
			'0000000000000000000000000000000000000000000000000000000000000000::shared_blob::SharedBlob',
			'0000000000000000000000000000000000000000000000000000000000000000::system::System',
			'u32',
		];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddress,
				module: 'shared_blob',
				function: 'extend',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return { fund, extend };
}
