import singleSpaSvelte from 'single-spa-svelte';
import myRootSvelteComponent from './App.svelte';

const svelteLifecycles = singleSpaSvelte({
  component: myRootSvelteComponent,
  domElementGetter: () => document.getElementById('svelte'),
  props: { someData: 'data' }
});

export const bootstrap = svelteLifecycles.bootstrap;

export const mount = svelteLifecycles.mount;

export const unmount = svelteLifecycles.unmount;