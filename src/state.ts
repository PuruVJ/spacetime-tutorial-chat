import { Identity, SpacetimeDBClient } from '@clockworklabs/spacetimedb-sdk';
import { signal } from '@preact/signals';

export const SPACETIME_AUTH_TOKEN = 'spacetime:auth_token';
export const SPACETIME_USERNAME = 'spacetime:username';

export const global_state = signal({
	token: localStorage.getItem(SPACETIME_AUTH_TOKEN) as string | null,
	identity: null as Identity | null,
	name: localStorage.getItem(SPACETIME_USERNAME) as string | null,
	client: null as SpacetimeDBClient | null,
});
