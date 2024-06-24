<script lang="ts">
  import { _ } from '@shared/i18n';
  import QRCodeScanner from '../../lib/QRCodeScanner.svelte';
  
  let scanResult = '';

  const handleScanComplete = (result: string) => {
    scanResult = result;
    console.log('Scan complete:', result);
    // Logic to checkout the game
  };
</script>

<h1>Checkout Mode</h1>
<QRCodeScanner onScanComplete={handleScanComplete} />
<button on:click={() => scanResult = ''}>Cancel</button>
<p>{scanResult}</p>
