// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs, fromBase64, toBase64 } from '@mysten/bcs';

const MerkleNode = bcs.enum('MerkleNode', {
	Empty: null,
	Digest: bcs.bytes(32),
});

const SliverPairMetadata = bcs.struct('SliverPairMetadata', {
	primary_hash: MerkleNode,
	secondary_hash: MerkleNode,
});

const EncodingType = bcs.enum('EncodingType', {
	RedStuff: null,
});

export const BlobMetadataV1 = bcs.struct('BlobMetadataV1', {
	encoding_type: EncodingType,
	unencoded_length: bcs.u64(),
	hashes: bcs.vector(SliverPairMetadata),
});

export const BlobMetadata = bcs.enum('BlobMetadata', {
	V1: BlobMetadataV1,
});

export const BlobId = bcs.bytes(32).transform({
	input: (blobId: string | Iterable<number>) =>
		typeof blobId === 'string' ? blobIdToBytes(blobId) : blobId,
	output: (bytes: Uint8Array) => blobIdFromBytes(bytes),
});

export function blobIdFromBytes(blobId: Uint8Array): string {
	return toBase64(blobId).replace(/=*$/, '').replaceAll('+', '-').replaceAll('/', '_');
}

export function blobIdToBytes(blobId: string): Uint8Array {
	return fromBase64(blobId.replaceAll('-', '+').replaceAll('_', '/'));
}

export const BlobMetadataWithId = bcs.struct('BlobMetadataWithId', {
	blob_id: BlobId,
	metadata: BlobMetadata,
});

const Symbols = bcs.struct('Symbols', {
	data: bcs.vector(bcs.u8()),
	symbol_size: bcs.u16(),
});

export const SliverData = bcs.struct('SliverData', {
	symbols: Symbols,
	index: bcs.u16(),
});

export const Sliver = bcs.enum('Sliver', {
	Primary: SliverData,
	Secondary: SliverData,
});
