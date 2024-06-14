<script lang="ts">
    import { onMount } from 'svelte';
    import * as Html5QrcodePkg from 'html5-qrcode';
    import { writable } from 'svelte/store';
  
    const { Html5Qrcode } = Html5QrcodePkg;
  
    export let onScanComplete: (result: string) => void;
    let qrCodeScanner: InstanceType<typeof Html5Qrcode>;
    let isScanning = writable(false);
    let isVideoInitialized = writable(false);
  
    const startScanning = () => {
      isScanning.set(true);
      qrCodeScanner.start(
        { facingMode: "environment" }, // Use environment camera (or "user" for front camera)
        { fps: 10, qrbox: 200 }, // Adjusted to fit within video
        (decodedText: string) => {
          onScanComplete(decodedText);
          qrCodeScanner.stop().catch((err: any) => console.error("Unable to stop scanning", err));
          isScanning.set(false);
        },
        (errorMessage: string) => {
          console.error("QR Code scan error:", errorMessage);
        }
      ).then(() => {
        isVideoInitialized.set(true);
      }).catch((err: any) => {
        console.error("Unable to start scanning", err);
        isScanning.set(false);
        isVideoInitialized.set(false);
      });
    };
  
    const stopScanning = () => {
      qrCodeScanner.stop().catch((err: any) => console.error("Unable to stop scanning", err));
      isScanning.set(false);
      isVideoInitialized.set(false);
    };
  
    onMount(() => {
      qrCodeScanner = new Html5Qrcode("qr-reader");
    });
  </script>
  
  <div>
    <button on:click={startScanning} disabled={$isScanning}>Start Scanning</button>
    <button on:click={stopScanning} disabled={!$isScanning}>Stop Scanning</button>
    <div id="qr-reader-container">
      <div id="qr-reader"></div>
      {#if $isScanning && $isVideoInitialized}
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
  </div>
  
  <style>
    #qr-reader-container {
      position: relative;
      width: 300px;
      height: 225px; /* Adjusted to match the real video height */
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
      width: 160px; /* Adjusted size to fit within video */
      height: 160px; /* Adjusted size to fit within video */
      border: 2px dotted #aaa; /* Light dotted border */
      box-sizing: border-box;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
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
      top: 50%;
      left: 50%;
      width: 20px;
      height: 20px;
      transform: translate(-50%, -50%); /* Center the cross */
    }
    .cross::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 2px;
      background: red;
      transform: translateY(-50%);
    }
    .cross::after {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      width: 2px;
      height: 100%;
      background: red;
      transform: translateX(-50%);
    }
  </style>
  