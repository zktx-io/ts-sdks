// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { bcs } from '@mysten/sui/bcs';
import type { Transaction } from '@mysten/sui/transactions';

import { normalizeMoveArguments } from '../utils/index.js';
import type { RawTransactionArgument } from '../utils/index.js';

export function WAL() {
	return bcs.struct('WAL', {
		dummy_field: bcs.bool(),
	});
}
export function init(packageAddresses: { wal: string }) {
	function init(options: { arguments: [RawTransactionArgument<string>] }) {
		const argumentsTypes = [`${packageAddresses.wal}::wal::WAL`];
		return (tx: Transaction) =>
			tx.moveCall({
				package: packageAddresses.wal,
				module: 'wal',
				function: 'init',
				arguments: normalizeMoveArguments(options.arguments, argumentsTypes),
			});
	}
	return { init };
}
