import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import UnpluginIcons from 'unplugin-icons/vite';

export default defineConfig({
	plugins: [react(), UnpluginIcons({ autoInstall: true, compiler: 'jsx', jsx: 'react' })],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
