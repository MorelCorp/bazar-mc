<script lang="ts">
    import QRCodeScanner from '../../lib/QRCodeScanner.svelte';
  
    let scanResult = '';
    let saleItems = [];
  
    const handleScanComplete = (result: string) => {
      saleItems.push(result);
      scanResult = result;
      console.log('Scan complete:', result);
    };
  
    const completeSale = () => {
      console.log('Complete sale with items:', saleItems);
      // Logic to complete the sale
    };
  </script>
  
  <h1>Sale Mode</h1>
  <QRCodeScanner onScanComplete={handleScanComplete} />
  <button on:click={() => scanResult = ''}>Cancel</button>
  <p>{scanResult}</p>
  <button on:click={completeSale}>Complete Sale</button>
  <ul>
    {#each saleItems as item}
      <li>{item}</li>
    {/each}
  </ul>
  