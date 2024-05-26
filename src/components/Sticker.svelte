<script lang="ts">
    import { PDFPage, rgb, StandardFonts } from 'pdf-lib';
  
    // Export these properties only for external reference
    export let logoUrl: string = '/logo.png'; // Default logo path
    export let sellerName: string;
    export let gameName: string;
    export let price: number;
    export let stickerNumber: number;
  
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
        x: x + 10,
        y: y + 110,
        width: 40,
        height: 40,
      });
  
      // Draw seller name
      page.drawText(`Nom du vendeur: ${seller.name}`, {
        x: x + 60,
        y: y + 130,
        size: 10,
        font,
        color: rgb(0, 0, 0),
      });
  
      // Draw game name
      page.drawText(`Nom du jeu: ${game.title}`, {
        x: x + 10,
        y: y + 90,
        size: 10,
        font,
        color: rgb(0, 0, 0),
      });
  
      // Draw price
      page.drawText(`Prix: $${game.price}`, {
        x: x + 10,
        y: y + 70,
        size: 10,
        font,
        color: rgb(0, 0, 0),
      });
  
      // Draw sticker number
      page.drawText(`#${stickerNumber}`, {
        x: x + 160,
        y: y + 130,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
  
      // Draw notice text
      page.drawText("(Montant arrondi s.v.p.)", {
        x: x + 10,
        y: y + 50,
        size: 8,
        font,
        color: rgb(0, 0, 0),
      });
      page.drawText("2$ sera prélevé de la vente de chacun des jeux au profit de Jeux de Société Qc.", {
        x: x + 10,
        y: y + 40,
        size: 8,
        font,
        color: rgb(0, 0, 0),
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
      justify-content: center; /* Center the content horizontally */
      align-items: center;
      position: relative;
    }
  
    .sticker-header img {
      max-height: 50px;
    }
  
    .sticker-number {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 20px;
      font-weight: bold;
    }
  
    .sticker-content {
      margin-top: 10px;
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
      margin: 10px auto;
    }
  </style>
  
  <div class="sticker">
    <div class="sticker-header">
      <img src={logoUrl} alt="Organizer Logo" />
      <div class="sticker-number">{stickerNumber}</div>
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
      <div class="price">{price}$</div>
      <div>
        <strong>Prix</strong>
      </div>
    </div>
  </div>
  