import { SpacetimeDBClient } from '@clockworklabs/spacetimedb-sdk';
import { SPACETIME_AUTH_TOKEN } from './state';

const local_auth_token =
	localStorage.getItem(SPACETIME_AUTH_TOKEN) || undefined;

export const stdb_client = new SpacetimeDBClient(
	'wss://testnet.spacetimedb.com',
	'chat',
	local_auth_token
);
