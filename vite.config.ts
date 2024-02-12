import path from 'path';
import preact from '@preact/preset-vite';
import { defineConfig } from 'vite';
import UnpluginIcons from 'unplugin-icons/vite';

export default defineConfig({
	plugins: [
		preact({}),
		UnpluginIcons({ autoInstall: true, compiler: 'jsx', jsx: 'preact' }),
	],
	optimizeDeps: {
		include: ['preact'],
	},
});
