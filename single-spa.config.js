import { registerApplication, start } from 'single-spa'

registerApplication(
  'svelte', 
  () => import('./src/svelte/main.app.js'),
  () => location.pathname === "/react" ? false : true
);

registerApplication(
  'react',
  () => import('./src/react/main.app.js'),
  () => location.pathname === "/svelte"  ? false : true
);

start();