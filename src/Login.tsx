import { useSnapshot } from 'valtio';
import { Button } from './components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { SPACETIME_AUTH_TOKEN, global_state } from './state';
import User from './module_bindings/user';
import SetNameReducer from './module_bindings/set_name_reducer';

export function Login() {
	const state = useSnapshot(global_state);

	function store_token(e: React.FormEvent<HTMLFormElement>) {
		const { token, identity } = state;
		if (!token) return console.warn('LOGIN: Token not found');

		const form_data = new FormData(e.currentTarget);
		const name = form_data.get('name') as string;

		console.time('User.create');
		SetNameReducer.call(name);
		console.timeEnd('User.create');

		return;

		global_state.name = name;

		localStorage.setItem(SPACETIME_AUTH_TOKEN, token);
		localStorage.setItem('spacetime:username', name);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Login</CardTitle>
				<CardDescription>
					Provide a name to enter the emoji chat 😋
				</CardDescription>
			</CardHeader>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					store_token(e);
				}}
			>
				<CardContent>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="name">Name</Label>
							<Input name="name" placeholder="Your username" />
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button>Join</Button>
				</CardFooter>
			</form>
		</Card>
	);
}
