<script>
    import { locale } from 'svelte-i18n';
    
    const languages = [
      { code: 'en', label: 'English' },
      { code: 'sq', label: 'Shqip' },
      { code: 'de', label: 'Deutsch' },
      { code: 'it', label: 'Italiano' },
      { code: 'zh', label: '中文' }
    ];
  
    const changeLocale = (event) => {
      locale.set(event.target.value);
    };
  </script>
  
  <select on:change={changeLocale} class="bg-gray-700 text-white px-3 py-1 rounded-md">
    {#each languages as lang}
      <option value={lang.code}>{lang.label}</option>
    {/each}
  </select>
  