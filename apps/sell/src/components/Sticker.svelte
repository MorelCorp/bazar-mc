<script lang="ts">
  import { _ } from "@shared/i18n";

  import { generateQRCode } from "@shared/lib/qrCode";
  import type { Game } from "@shared/types";

  import { onMount } from "svelte";

  export let logoUrl: string = "/logo.png";

  let qrCodeUrl: string;
  export let game: Game;

  onMount(async () => {
    console.log("Generating sticker for", game);

    // Generate QR Code for the game handling errors as needed
    try {
      qrCodeUrl = await generateQRCode(game);
    } catch (error) {
      console.error("Failed to generate QR Code", error);
    }
  });
</script>

<div class="sticker">
  <div class="sticker-header">
    <div class="sticker-number">{game.id}</div>
    <img class="sticker-logo" src={logoUrl} alt="Organizer Logo" />
    <img src={qrCodeUrl} alt="QR Code" class="qr-code" />
  </div>
  <div class="sticker-content">
    <div>
      <strong>{$_("sellerName")}</strong>
      {game.seller.name}
    </div>
    <div>
      <strong>{$_("gameName")}</strong>
      {game.name}
    </div>
    <div>
      <em>{$_("stickerNote")}</em><br />
      {$_("stickerFee")}
    </div>
  </div>
  <div class="price">{game.price}$</div>
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
