import { Identity } from '@clockworklabs/spacetimedb-sdk';
import { useSignalEffect } from '@preact/signals';
import SetNameReducer from './module_bindings/set_name_reducer';
import {
	SPACETIME_AUTH_TOKEN,
	SPACETIME_USERNAME,
	global_state,
} from './state';

export function Login() {
	function store_token(e: SubmitEvent) {
		if (!global_state.value.token)
			return console.warn('LOGIN: Token not found');

		const form_data = new FormData(e.currentTarget as HTMLFormElement);
		const name = form_data.get('name') as string;

		console.time('User.create');
		SetNameReducer.call(name);
		console.timeEnd('User.create');

		global_state.value.name = name;
	}

	useSignalEffect(() => {
		// untracked(() => {
		SetNameReducer.on((reducerEvent, reducerArgs) => {
			if (
				global_state.value.identity &&
				reducerEvent.callerIdentity.isEqual(
					global_state.value.identity as Identity
				)
			) {
				if (reducerEvent.status === 'failed') {
					// appendToSystemMessage(`Error setting name: ${reducerEvent.message} `);
				} else if (reducerEvent.status === 'committed') {
					global_state.value.name = reducerArgs[0];
					localStorage.setItem(
						SPACETIME_AUTH_TOKEN,
						global_state.value.token ?? ''
					);
					localStorage.setItem(
						SPACETIME_USERNAME,
						global_state.value.name ?? ''
					);
				}
			}
		});
		// });
	});

	return (
		<div className="card w-96 bg-base-100 shadow-xl">
			<div className="card-header">
				<h2 className="card-title">Login</h2>
				<p>Provide a name to enter the emoji chat 😋</p>
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					store_token(e);
				}}
			>
				<div className="card-body">
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<label className="form-control w-full max-w-xs">
								<div className="label">
									<span className="label-text">What is your name?</span>
									<span className="label-text-alt">Top Right label</span>
								</div>
								<input
									type="text"
									placeholder="Type here"
									className="input input-bordered w-full max-w-xs"
								/>
								<div className="label">
									<span className="label-text-alt">Bottom Left label</span>
									<span className="label-text-alt">Bottom Right label</span>
								</div>
							</label>
						</div>
					</div>
				</div>
				<div className="card-actions">
					<button type="submit" className="btn btn-primary">
						Join
					</button>
				</div>
			</form>
		</div>
	);
}
