<script lang="ts">
  import { _ } from '@shared/i18n';
  import QRCodeScanner from '$lib/QRCodeScanner.svelte';

  const handleScanComplete = (result: string) => {
    alert(`QR Code Scanned: ${result}`);
  };

  let onScanComplete: (result: string) => void;
</script>

<main>
  <h1>Scanner App</h1>
  <QRCodeScanner {onScanComplete} />
</main>

<style>

</style>
  