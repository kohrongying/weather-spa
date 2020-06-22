import { registerApplication, start } from 'single-spa'

registerApplication(
  'svelte', 
  () => import('./src/svelte/main.app.js'),
  () => location.pathname === "/svelte"
);

registerApplication(
  'react',
  () => import('./src/react/main.app.js'),
  () => location.pathname === "/"
);

start();