<script>
	import { enhance } from "$app/forms";
	import Warning from "$lib/components/Warning.svelte";
	import { t } from 'svelte-i18n';
	export let form;
  </script>
  
  <div class="min-h-screen bg-gray-900 flex items-center justify-center px-4">
	<form
	  action="?/login"
	  method="POST"
	  use:enhance
	  class="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
	>
	  <h2 class="text-2xl font-bold text-white text-center">{$t('login')}</h2>
  
	  <div>
		<label for="email" class="block text-sm text-gray-300 mb-1">{$t('email')}</label>
		<input
		  type="text"
		  name="email"
		  id="email"
		  required
		  class="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
		/>
	  </div>
  
	  <div>
		<label for="password" class="block text-sm text-gray-300 mb-1">{$t('password')}</label>
		<input
		  type="password"
		  name="password"
		  id="password"
		  required
		  class="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
		/>
	  </div>
  
	  <button
		type="submit"
		class="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-md transition"
	  >
		{$t('login')}
	  </button>
  
	  {#if form}
		<Warning message={form.message} />
	  {/if}
	</form>
  </div>
  <div>
	
  </div>
  