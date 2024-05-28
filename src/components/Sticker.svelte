<script lang="ts">
  import { PDFPage, StandardFonts, rgb } from 'pdf-lib';
  import QRCode from 'qrcode';

  export let logoUrl: string = '/logo.png'; // Default logo path
  export let sellerName: string;
  export let gameName: string;
  export let price: number;
  export let stickerNumber: number;

  let qrCodeUrl: string;

  // Generate QR code with vendor name, game name, ID, and price
  QRCode.toDataURL(`${sellerName},${gameName},${stickerNumber},${price}`)
    .then(url => {
      qrCodeUrl = url;
    })
    .catch(err => {
      console.error(err);
    });

  export async function drawSticker(page: PDFPage, x: number, y: number, game: any, seller: any, stickerNumber: number) {
    const font = await page.doc.embedFont(StandardFonts.Helvetica);

    // Draw border
    page.drawRectangle({
      x,
      y,
      width: 200,
      height: 150,
      borderColor: rgb(0, 0, 0),
      borderWidth: 2,
    });

    // Draw logo
    const logoImageBytes = await fetch(logoUrl).then(res => res.arrayBuffer());
    const logoImage = await page.doc.embedPng(logoImageBytes);
    page.drawImage(logoImage, {
      x: x + 80,
      y: y + 110,
      width: 40,
      height: 40,
    });

    // Draw seller name
    page.drawText(`Nom du vendeur: ${seller.name}`, {
      x: x + 10,
      y: y + 130,
      size: 10,
      font,
      color: rgb(0, 0, 0),
    });

    // Draw game name
    page.drawText(`Nom du jeu: ${game.title}`, {
      x: x + 10,
      y: y + 110,
      size: 10,
      font,
      color: rgb(0, 0, 0),
    });

    // Draw price
    page.drawText(`Prix: $${game.price}`, {
      x: x + 10,
      y: y + 90,
      size: 10,
      font,
      color: rgb(0, 0, 0),
    });

    // Draw sticker number
    page.drawText(`#${stickerNumber}`, {
      x: x + 10,
      y: y + 130,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });

    // Draw notice text
    page.drawText("(Montant arrondi s.v.p.)", {
      x: x + 10,
      y: y + 70,
      size: 8,
      font,
      color: rgb(0, 0, 0),
    });
    page.drawText("2$ sera prélevé de la vente de chacun des jeux au profit de Jeux de Société Qc.", {
      x: x + 10,
      y: y + 60,
      size: 8,
      font,
      color: rgb(0, 0, 0),
    });

    // Draw QR code
    const qrImageBytes = await fetch(qrCodeUrl).then(res => res.arrayBuffer());
    const qrImage = await page.doc.embedPng(qrImageBytes);
    page.drawImage(qrImage, {
      x: x + 160,
      y: y + 110,
      width: 40,
      height: 40,
    });
  }
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
      <strong>Nom du vendeur :</strong> {sellerName}
    </div>
    <div>
      <strong>Nom du jeu :</strong> {gameName}
    </div>
    <div>
      <em>(Montant arrondi s.v.p.)</em><br />
      2$ sera prélevé de la vente de chacun des jeux au profit de Jeux de Société Qc.
    </div>
  </div>
  <div class="price">{price}$</div>
</div>
