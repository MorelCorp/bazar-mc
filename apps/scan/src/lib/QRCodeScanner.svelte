<script lang="ts">
    import { setupI18n, _ } from '@shared/i18n';
    import { onMount, onDestroy } from 'svelte';
    import * as Html5QrcodePkg from 'html5-qrcode';
    import { writable } from 'svelte/store';
  
    import { Icon } from 'svelte-hero-icons';
    import { Camera as CameraIcon } from "svelte-hero-icons"

    ////setupI18n();

    const { Html5Qrcode } = Html5QrcodePkg;
  
    export let onScanComplete: (result: string) => void;
    let qrCodeScanner: InstanceType<typeof Html5Qrcode>;
    let isScanning = writable(false);
    
    ////let isVideoInitialized = writable(false);

    let qrReaderWidth: '300px'; // Set a default width or calculate dynamically

    const toggleScanning = async () => {
      isScanning.update(n => !n);
      if ($isScanning) {
        qrCodeScanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          (decodedText: string) => {
            onScanComplete(decodedText);
            toggleScanning(); // Automatically stop scanning after a successful scan
          },
          (errorMessage: string) => {
            console.error("QR Code scan error:", errorMessage);
          }
        ).then(() => {
          console.log("Scanning started");
        }).catch((err: any) => {
          console.error("Failed to start scanning", err);
        });
      } else {
        qrCodeScanner.stop().then(() => {
          console.log("Scanning stopped");
        }).catch((err: any) => {
          console.error("Failed to stop scanning", err);
        });
      }
    };
  
    onMount(() => {
      qrCodeScanner = new Html5Qrcode("qr-reader");

      const updateDimensions = () => {
        const container = document.querySelector('#qr-reader-container') as HTMLElement;
        if (container) {
          qrReaderWidth = container.offsetWidth * 0.8 + 'px'; // 80% of the container's width
        }
      };

      // Call once on mount
      updateDimensions();

      // Add event listener to call updateDimensions on window resize for responsiveness
      window.addEventListener('resize', updateDimensions);

      // Cleanup event listener on component destroy
      return () => {
        window.removeEventListener('resize', updateDimensions);
      };
    });

    onDestroy(() => {
      if (qrCodeScanner) {
        qrCodeScanner.stop(); // Ensure to stop scanning when the component is destroyed
      }
    });

</script>
  
  <div class="video-view" style="--qr-reader-width: {qrReaderWidth};">
    <div id="qr-reader-container" class="w-full h-auto flex justify-center items-center">
      <div id="qr-reader" style="width: {qrReaderWidth}; height: {qrReaderWidth};">
        {#if $isScanning}
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
  </div>
  
  <div class="flex justify-center m-5">
    <button on:click={toggleScanning} type="button" class="btn-icon variant-filled w-40 h-10">
      <span><Icon src="{CameraIcon}" class="h-6 w-6 mr-2" /></span>
      <span>{$isScanning ? $_('StopScan') : $_('StartScan')}</span>
      <!-- <span><div class={`ml-2 w-2 h-2 rounded-full ${$isScanning ? 'bg-green-500' : 'bg-gray-300'}`}></div></span> -->
    </button>
  </div>
  
  <style>
    .video-view {
      width: var(--qr-reader-width);
      height: var(--qr-reader-width);
      background-color: #f3f4f6; /* Tailwind gray-100 */
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
    }
    #qr-reader-container {
      position: relative;
    }
    #qr-reader {
      position: relative;
      width: 100%;
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
