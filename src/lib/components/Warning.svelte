<script>
	const { message, t } = $props(); // now also receive t function
  </script>
  
  <div class="p-4 mb-4 bg-purple-700 text-white rounded-md shadow-lg max-w-2xl mx-auto">
	<p class="text-center text-lg font-semibold">{t ? t(message) : message}</p>
  </div>
  