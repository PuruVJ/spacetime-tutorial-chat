import css from './App.module.css';

import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import LoaderIcon from '~icons/svg-spinners/blocks-wave';
import { Chat } from './Chat';
import { Login } from './Login';
import { stdb_client } from './client';
import User from './module_bindings/user';
import { SPACETIME_AUTH_TOKEN, global_state } from './state';
import { Identity } from '@clockworklabs/spacetimedb-sdk';

function App() {
	const [view, set_view] = useState<'loading' | 'login' | 'chat'>('loading');
	const state = useSnapshot(global_state);

	useEffect(() => {
		set_view('loading');

		stdb_client.connect();

		User.onInsert((user, reducerEvent) => {
			console.log('User.onInsert', user, reducerEvent);
		});

		stdb_client.on('initialStateSync', (...args) => {
			console.log('initialStateSync', args);
		});

		stdb_client.onConnect((token: string, identity: Identity) => {
			global_state.identity = identity;
			global_state.token = token;
			global_state.name = localStorage.getItem('spacetime:username') ?? null;

			localStorage.setItem(SPACETIME_AUTH_TOKEN, token);

			stdb_client.subscribe(['SELECT * FROM User', 'SELECT * FROM Message']);
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
