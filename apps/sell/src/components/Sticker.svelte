<script lang="ts">
  import { _ } from '@shared/i18n';
  import QRCode from 'qrcode';
  
  export let logoUrl: string = '/logo.png';
  export let sellerName: string;
  export let gameName: string;
  export let price: number;
  export let stickerNumber: number;

  let qrCodeUrl: string;

  const generateQRCode = () => {
    QRCode.toDataURL(`${sellerName},${gameName},${stickerNumber},${price}`)
      .then(url => {
        qrCodeUrl = url;
      })
      .catch(err => {
        console.error(err);
      });
  };

  // Regenerate QR code when inputs change
  $: generateQRCode();
</script>

<style>
  .sticker {
    border: 2px solid #000;
    border-radius: 15px;
    padding: 20px;
    width: 400px; /* Increased width */
    height: 250px; /* Decreased height */
    font-family: Arial, sans-serif;
    position: relative;
    box-sizing: border-box;
  }

  .sticker-header {
    display: flex;
    justify-content: space-between; /* Adjust to space-between for ID and QR code */
    align-items: center;
    position: relative;
    top: 15px;
  }

  .sticker-logo {
    max-height: 50px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .sticker-number {
    font-size: 20px;
    font-weight: bold;
    position: absolute;
    left: 10px;
  }

  .qr-code {
    width: 80px; /* Adjust size to match the price circle */
    height: 80px; /* Adjust size to match the price circle */
    position: absolute;
    top: -1px;
    right: -8px;
  }

  .sticker-content {
    margin-top: 60px; /* Adjust to make room for the header */
    padding-bottom: 90px; /* Reserve space for the price circle */
    padding-right: 90px; /* Reserve space for the price circle */
  }

  .sticker-content div {
    margin-bottom: 10px;
  }

  .price {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    border: 2px solid #000;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    position: absolute;
    bottom: 10px; /* Adjust to ensure it stays within the boundary */
    right: 10px; /* Adjust to ensure it stays within the boundary */
  }
</style>

<div class="sticker">
  <div class="sticker-header">
    <div class="sticker-number">{stickerNumber}</div>
    <img class="sticker-logo" src={logoUrl} alt="Organizer Logo" />
    <img src={qrCodeUrl} alt="QR Code" class="qr-code" />
  </div>
  <div class="sticker-content">
    <div>
      <strong>{$_('sellerName')}</strong> {sellerName}
    </div>
    <div>
      <strong>{$_('gameName')}</strong> {gameName}
    </div>
    <div>
      <em>{$_('stickerNote')}</em><br />
      {$_('stickerFee')}
    </div>
  </div>
  <div class="price">{price}$</div>
</div>
