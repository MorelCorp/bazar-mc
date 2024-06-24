<script lang="ts">
    import QRCodeScanner from '$lib/QRCodeScanner.svelte';
  
    const handleScanComplete = (result: string) => {
      alert(`QR Code Scanned: ${result}`);
    };
  </script>
  
  <main>
    <h1>Scanner App</h1>
    <QRCodeScanner {onScanComplete} />
  </main>
  
  <style>
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background-color: #f0f0f0;
    }
  </style>
  