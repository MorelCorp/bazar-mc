<script lang="ts">
    import { writable } from 'svelte/store';
    import * as QRCode from 'qrcode';
  
    const textInput = writable('');
    const qrCodeDataUrl = writable('');
    const errorMessage = writable('');
  
    const generateQRCode = () => {
      textInput.subscribe((text: string) => {
        console.log('Text length:', text.length);
        if (text) {
          QRCode.toDataURL(text)
            .then((url: string) => {
              console.log('Generated QR Code URL:', url);
              qrCodeDataUrl.set(url);
              errorMessage.set(''); // Clear any previous error messages
            })
            .catch((err: Error) => {
              console.error('Error generating QR code:', err);
              errorMessage.set('Error: The amount of data is too big to be stored in a QR Code.');
              qrCodeDataUrl.set(''); // Clear the QR code URL in case of an error
            });
        }
      })();
    };
  </script>
  
  <div class="container">
    <textarea placeholder="Enter text" bind:value={$textInput} maxlength="2953" class="text-area"></textarea>
    <button on:click={generateQRCode} class="generate-button">Generate QR Code</button>
    {#if $errorMessage}
      <div class="error-message">{$errorMessage}</div>
    {/if}
    {#if $qrCodeDataUrl}
      <div>
        <img src={$qrCodeDataUrl} alt="Generated QR Code" />
      </div>
    {/if}
  </div>
  
  <style>
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    .text-area {
      width: 80%;
      height: 200px; /* Ensuring the height is set */
      padding: 10px;
      font-size: 1em;
      margin-bottom: 10px;
      box-sizing: border-box;
    }
    .generate-button {
      padding: 10px;
      font-size: 1em;
      margin-top: 10px; /* Adding margin to ensure spacing */
    }
    .error-message {
      color: red;
      margin-top: 10px;
    }
    img {
      margin-top: 20px;
      border: 1px solid #000;
    }
  </style>
  