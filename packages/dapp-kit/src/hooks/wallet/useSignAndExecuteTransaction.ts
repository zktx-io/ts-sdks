// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { Transaction } from '@mysten/sui/transactions';
import type {
	SuiSignAndExecuteTransactionInput,
	SuiSignAndExecuteTransactionOutput,
} from '@mysten/wallet-standard';
import { signAndExecuteTransaction } from '@mysten/wallet-standard';
import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { walletMutationKeys } from '../../constants/walletMutationKeys.js';
import {
	WalletFeatureNotSupportedError,
	WalletNoAccountSelectedError,
	WalletNotConnectedError,
} from '../../errors/walletErrors.js';
import type { PartialBy } from '../../types/utilityTypes.js';
import { useSuiClient } from '../useSuiClient.js';
import { useCurrentAccount } from './useCurrentAccount.js';
import { useCurrentWallet } from './useCurrentWallet.js';
import { useReportTransactionEffects } from './useReportTransactionEffects.js';

type UseSignAndExecuteTransactionArgs = PartialBy<
	Omit<SuiSignAndExecuteTransactionInput, 'transaction'>,
	'account' | 'chain'
> & {
	transaction: Transaction | string;
};

type ExecuteTransactionResult = SuiSignAndExecuteTransactionOutput;

type UseSignAndExecuteTransactionError =
	| WalletFeatureNotSupportedError
	| WalletNoAccountSelectedError
	| WalletNotConnectedError
	| Error;

type UseSignAndExecuteTransactionMutationOptions = Omit<
	UseMutationOptions<
		ExecuteTransactionResult,
		UseSignAndExecuteTransactionError,
		UseSignAndExecuteTransactionArgs,
		unknown
	>,
	'mutationFn'
>;

/**
 * Mutation hook for prompting the user to sign and execute a transaction.
 */
export function useSignAndExecuteTransaction({
	mutationKey,
	...mutationOptions
}: UseSignAndExecuteTransactionMutationOptions = {}): UseMutationResult<
	ExecuteTransactionResult,
	UseSignAndExecuteTransactionError,
	UseSignAndExecuteTransactionArgs
> {
	const { currentWallet, supportedIntents } = useCurrentWallet();
	const currentAccount = useCurrentAccount();
	const client = useSuiClient();
	const { mutate: reportTransactionEffects } = useReportTransactionEffects();

	return useMutation({
		mutationKey: walletMutationKeys.signAndExecuteTransaction(mutationKey),
		mutationFn: async ({
			transaction,
			...signTransactionArgs
		}): Promise<ExecuteTransactionResult> => {
			// Ensure the wallet is connected
			if (!currentWallet) {
				throw new WalletNotConnectedError('No wallet is connected.');
			}

			const signerAccount = signTransactionArgs.account ?? currentAccount;
			if (!signerAccount) {
				throw new WalletNoAccountSelectedError(
					'No wallet account is selected to sign the transaction with.',
				);
			}

			if (
				!currentWallet.features['sui:signTransaction'] &&
				!currentWallet.features['sui:signTransactionBlock']
			) {
				throw new WalletFeatureNotSupportedError(
					"This wallet doesn't support the `signTransaction` feature.",
				);
			}

			const chain = signTransactionArgs.chain ?? signerAccount?.chains[0];

			const result = await signAndExecuteTransaction(currentWallet, {
				...signTransactionArgs,
				transaction: {
					async toJSON() {
						return typeof transaction === 'string'
							? transaction
							: await transaction.toJSON({
									supportedIntents,
									client,
								});
					},
				},
				account: signerAccount,
				chain,
			});

			if (!result.effects) {
				throw new Error('Could not parse effects from transaction result.');
			}

			reportTransactionEffects({
				effects: result.effects,
				account: signerAccount,
				chain,
			});

			return result;
		},
		...mutationOptions,
	});
}
