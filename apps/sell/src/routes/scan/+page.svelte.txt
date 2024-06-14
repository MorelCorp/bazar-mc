<script lang="ts">
  import Scanner from '../../components/Scanner.svelte';
  import { writable } from 'svelte/store';

  let qrCodeMessage = writable('');
  
  const handleScanComplete = (result: string) => {
    qrCodeMessage.set(result);
  };
</script>

<main>
  <h1>Scan QR Code</h1>
  <Scanner onScanComplete={handleScanComplete} />
  {#if $qrCodeMessage}
    <p>QR Code Content: {$qrCodeMessage}</p>
  {/if}
</main>

<style>
  main {
    padding: 1em;
  }
</style>
