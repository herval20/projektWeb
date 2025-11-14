<script>
	import '../app.css';
	import { locale } from '$lib/i18n';
	import { onMount } from 'svelte';
  
	const languages = [
	  { code: 'en', label: 'English' },
	  { code: 'sq', label: 'Shqip' },
	  { code: 'de', label: 'Deutsch' },
	  { code: 'zh', label: '中文' }
	];
  
	function changeLanguage(code) {
	  locale.set(code);
	}
  
	let { children } = $props();
  
	// SSR-safe: ensure initial locale is set
	onMount(() => {
	  if (!locale) locale.set('en');
	});
  </script>
  
  <header class="bg-gray-800 p-4 flex justify-center gap-3">
	{#each languages as lang}
	  <button
		class="bg-pink-600 hover:bg-pink-700 text-white px-3 py-1 rounded-md transition"
		onclick={() => changeLanguage(lang.code)}
	  >
		{lang.label}
	  </button>
	{/each}
  </header>
  
  <main>
	{@render children()}
  </main>
  