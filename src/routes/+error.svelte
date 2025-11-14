<script>
    export let error;
  </script>
  
  <div class="min-h-screen flex items-center justify-center bg-gray-900 text-white">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">Oops!</h1>
      <p class="text-lg">{error?.message || 'Something went wrong'}</p>
      <a href="/" class="mt-6 inline-block bg-pink-500 px-4 py-2 rounded hover:bg-pink-600">Home</a>
    </div>
  </div>
  