import css from './App.module.css';

import { Identity } from '@clockworklabs/spacetimedb-sdk';
import { useSignal, useSignalEffect } from '@preact/signals';
import LoaderIcon from '~icons/svg-spinners/blocks-wave';
import { Chat } from './Chat';
import { Login } from './Login';
import { stdb_client } from './client';
import User from './module_bindings/user';
import { SPACETIME_AUTH_TOKEN, global_state } from './state';

export function App() {
	const view = useSignal<'loading' | 'login' | 'chat'>('loading');

	useSignalEffect(() => {
		view.value = 'loading';

		stdb_client.connect();

		User.onInsert((user, reducerEvent) => {
			console.log('User.onInsert', user, reducerEvent);
		});

		stdb_client.on('initialStateSync', (...args) => {
			console.log('initialStateSync', args);
		});

		stdb_client.onConnect((token: string, identity: Identity) => {
			global_state.value = {
				...global_state.peek(),
				identity,
				token,
				name: localStorage.getItem('spacetime:username') ?? null,
			};

			localStorage.setItem(SPACETIME_AUTH_TOKEN, token);

			stdb_client.subscribe(['SELECT * FROM User', 'SELECT * FROM Message']);
		});
	});

	useSignalEffect(() => {
		view.value = global_state.value.name ? 'chat' : 'login';
	});

	return (
		<main className={css.root}>
			{view.value === 'loading' ? (
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
			) : view.value === 'login' ? (
				<div>
					<Login />
				</div>
			) : (
				<div>
					<Chat />
				</div>
			)}
		</main>
	);
}
