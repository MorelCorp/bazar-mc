<script lang="ts">
  import { _ } from "@shared/i18n";
  import QRCode from "qrcode";
  import { onMount } from "svelte";

  export let logoUrl: string = "/logo.png";
  export let sellerUUID: string;
  export let sellerName: string;
  export let gameName: string;
  export let price: number;
  export let stickerNumber: number;

  let qrCodeUrl: string;

  onMount(() => {
    generateQRCode();
  });

  const generateQRCode = () => {
    let content = {
      seller: {
        name: sellerName,
        uuid: sellerUUID,
      },
      game: {
        name: gameName,
        price: price,
        id: stickerNumber,
      },
    };

    QRCode.toDataURL(JSON.stringify(content))
      .then((url) => {
        qrCodeUrl = url;
      })
      .catch((err) => {
        console.error(err);
      });
  };
</script>

<div class="sticker">
  <div class="sticker-header">
    <div class="sticker-number">{stickerNumber}</div>
    <img class="sticker-logo" src={logoUrl} alt="Organizer Logo" />
    <img src={qrCodeUrl} alt="QR Code" class="qr-code" />
  </div>
  <div class="sticker-content">
    <div>
      <strong>{$_("sellerName")}</strong>
      {sellerName}
    </div>
    <div>
      <strong>{$_("gameName")}</strong>
      {gameName}
    </div>
    <div>
      <em>{$_("stickerNote")}</em><br />
      {$_("stickerFee")}
    </div>
  </div>
  <div class="price">{price}$</div>
</div>

<style>
  .sticker {
    border: 2px solid #000;
    border-radius: 15px;
    padding: 10px;
    font-family: Arial, sans-serif;
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .sticker-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .sticker-logo {
    max-height: 30px;
  }

  .sticker-number {
    font-size: 16px;
    font-weight: bold;
  }

  .qr-code {
    width: 60px;
    height: 60px;
  }

  .sticker-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .sticker-content div {
    margin-bottom: 5px;
  }

  .price {
    font-size: 20px;
    font-weight: bold;
    align-self: flex-end;
  }
</style>
