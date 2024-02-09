import css from './Chat.module.css';

import { useSnapshot } from 'valtio';
import SendIcon from '~icons/mingcute/send-plane-fill';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { global_state } from './state';

export function Chat() {
	const state = useSnapshot(global_state);

	async function handle_submit(e: React.FormEvent<HTMLFormElement>) {
		const form_data = new FormData(e.currentTarget);
		const message = form_data.get('message') as string;
	}

	return (
		<section style={{ display: 'grid', gridTemplateRows: '1fr auto' }}>
			<section>Messages go here</section>
			<section className={css.bottom_area}>
				<form
					style={{ display: 'contents' }}
					onSubmit={(e) => {
						e.preventDefault();
						handle_submit(e);
					}}
				>
					<Input
						className={css.input}
						name="message"
						onInput={({ currentTarget }) => {
							currentTarget.value = filter_emojis(currentTarget.value) ?? '';
						}}
						placeholder="Your emojis here"
					/>
					<Button type="submit">
						<SendIcon />
					</Button>
				</form>
			</section>
		</section>
	);
}

function filter_emojis(input: string) {
	// Regex pattern to match emojis
	const emojiRegex =
		/([\u2700-\u27bf]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;

	// Filter out non-emoji characters
	return input.match(emojiRegex) ? input.match(emojiRegex)?.join('') : '';
}
