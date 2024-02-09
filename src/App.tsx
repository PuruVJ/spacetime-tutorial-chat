import css from './App.module.css';

import Message from '@/module_bindings/message';
import SendMessageReducer from '@/module_bindings/send_message_reducer';
import SetNameReducer from '@/module_bindings/set_name_reducer';
import User from '@/module_bindings/user';
import { SpacetimeDBClient } from '@clockworklabs/spacetimedb-sdk';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import LoaderIcon from '~icons/svg-spinners/blocks-wave';
import { Chat } from './Chat';
import { Login } from './Login';
import { stdb_client } from './client';
import { global_state } from './state';

SpacetimeDBClient.registerReducers(SendMessageReducer, SetNameReducer);
SpacetimeDBClient.registerTables(Message, User);

function App() {
	const [view, set_view] = useState<'loading' | 'login' | 'chat'>('loading');
	const state = useSnapshot(global_state);

	useEffect(() => {
		set_view('loading');

		stdb_client.connect();
		stdb_client.onConnect((token, identity) => {
			global_state.identity = identity;
			global_state.token = token;
			global_state.name = localStorage.getItem('spacetime:username') ?? null;

			stdb_client.on('initialStateSync', (...args) => {
				console.log(args);
				console.log(Message.all());
			});
		});
	}, []);

	useEffect(() => {
		set_view(state.name ? 'chat' : 'login');
	}, [state.name]);

	return (
		<main className={css.root}>
			{view === 'loading' ? (
				<div
					style={{
						width: '100%',
						height: '100%',
						display: 'grid',
						placeItems: 'center',
					}}
				>
					<LoaderIcon fontSize={50} />
				</div>
			) : view === 'login' ? (
				<Login />
			) : (
				<Chat />
			)}
		</main>
	);
}

export default App;
