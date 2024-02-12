import { SpacetimeDBClient } from '@clockworklabs/spacetimedb-sdk';
import Message from './module_bindings/message';
import SendMessageReducer from './module_bindings/send_message_reducer';
import SetNameReducer from './module_bindings/set_name_reducer';
import User from './module_bindings/user';
import { SPACETIME_AUTH_TOKEN } from './state';

SpacetimeDBClient.registerReducers(SendMessageReducer, SetNameReducer);
SpacetimeDBClient.registerTables(Message, User);

const local_auth_token =
	localStorage.getItem(SPACETIME_AUTH_TOKEN) || undefined;

export const stdb_client = new SpacetimeDBClient(
	'wss://testnet.spacetimedb.com',
	'chat',
	local_auth_token
);
