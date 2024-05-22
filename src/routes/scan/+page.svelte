<script lang="ts">
  import { onMount } from 'svelte';
  import * as Html5QrcodePkg from 'html5-qrcode';

  const { Html5Qrcode } = Html5QrcodePkg;
  
  let qrCodeMessage: string = '';
  let qrCodeScanner: InstanceType<typeof Html5Qrcode>;
  let isScanning: boolean = false;

  const startScanning = () => {
    isScanning = true;
    qrCodeScanner.start(
      { facingMode: "environment" }, // Use environment camera (or "user" for front camera)
      { fps: 10, qrbox: 250 },
      (decodedText: string) => {
        qrCodeMessage = decodedText;
        qrCodeScanner.stop().catch((err: any) => console.error("Unable to stop scanning", err));
        isScanning = false;
      },
      (errorMessage: string) => {
        console.error("QR Code scan error:", errorMessage);
      }
    ).catch((err: any) => {
      console.error("Unable to start scanning", err);
      isScanning = false;
    });
  };

  const stopScanning = () => {
    qrCodeScanner.stop().catch((err: any) => console.error("Unable to stop scanning", err));
    isScanning = false;
  };

  onMount(() => {
    qrCodeScanner = new Html5Qrcode("qr-reader");
  });
</script>

<main>
  <h1>Scan QR Code</h1>
  <button on:click={startScanning} disabled={isScanning}>Start Scanning</button>
  <button on:click={stopScanning} disabled={!isScanning}>Stop Scanning</button>
  <div id="qr-reader-container">
    <div id="qr-reader"></div>
    {#if isScanning}
      <div class="overlay">
        <div class="dotted-border">
          <div class="chevron top-left"></div>
          <div class="chevron top-right"></div>
          <div class="chevron bottom-left"></div>
          <div class="chevron bottom-right"></div>
          <div class="cross"></div>
        </div>
      </div>
    {/if}
  </div>
  {#if qrCodeMessage}
    <p>QR Code Content: {qrCodeMessage}</p>
  {/if}
</main>

<style>
  main {
    padding: 1em;
  }
  #qr-reader-container {
    position: relative;
    width: 300px;
    height: 300px;
  }
  #qr-reader {
    width: 100%;
    height: 100%;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none; /* Allow clicks to pass through */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dotted-border {
    position: absolute;
    width: 180px; /* Adjusted size to fit within video */
    height: 180px; /* Adjusted size to fit within video */
    border: 2px dotted #aaa; /* Light dotted border */
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .chevron {
    width: 24px; /* Increased size */
    height: 24px; /* Increased size */
    border: 4px solid red; /* Increased thickness */
    position: absolute;
    box-sizing: border-box;
  }
  .chevron.top-left {
    top: -2px;
    left: -2px;
    border-right: none;
    border-bottom: none;
  }
  .chevron.top-right {
    top: -2px;
    right: -2px;
    border-left: none;
    border-bottom: none;
  }
  .chevron.bottom-left {
    bottom: -2px;
    left: -2px;
    border-right: none;
    border-top: none;
  }
  .chevron.bottom-right {
    bottom: -2px;
    right: -2px;
    border-left: none;
    border-top: none;
  }
  .cross {
    position: absolute;
    width: 20px;
    height: 20px;
  }
  .cross::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background: red;
  }
  .cross::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 2px;
    height: 100%;
    background: red;
  }
</style>
