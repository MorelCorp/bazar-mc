<script lang="ts">
  import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
  import { get } from 'svelte/store';
  import { games } from '@shared/stores/games';
  import { user } from '@shared/stores/user';
  import { drawSticker } from './Sticker.svelte';

  export async function generateStickers() {
    try {
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      let page = pdfDoc.addPage([600, 800]);
      let { width, height } = page.getSize();
      let yOffset = height - 50;

      // Add user info
      const userInfo = get(user);
      page.drawText(`Name: ${userInfo.name}`, { x: 50, y: yOffset, size: 12, font, color: rgb(0, 0, 0) });
      yOffset -= 20;
      page.drawText(`Email: ${userInfo.email}`, { x: 50, y: yOffset, size: 12, font, color: rgb(0, 0, 0) });
      yOffset -= 40;

      // Add table headers
      page.drawText("Game Name", { x: 50, y: yOffset, size: 12, font, color: rgb(0, 0, 0) });
      page.drawText("Price", { x: 300, y: yOffset, size: 12, font, color: rgb(0, 0, 0) });
      yOffset -= 20;

      // Add games table
      const gameData = get(games);
      gameData.forEach((game, index) => {
        page.drawText(game.title, { x: 50, y: yOffset, size: 12, font, color: rgb(0, 0, 0) });
        page.drawText(`$${game.price}`, { x: 300, y: yOffset, size: 12, font, color: rgb(0, 0, 0) });
        yOffset -= 20;
        if (yOffset < 50) {
          yOffset = height - 50;
          page = pdfDoc.addPage([600, 800]);
        }
      });

      // Add stickers
      let stickersYOffset = height - 150;
      let stickersXOffset = 50;
      gameData.forEach((game, index) => {
        if (index % 8 === 0 && index !== 0) {
          page = pdfDoc.addPage([600, 800]);
          stickersYOffset = height - 150;
          stickersXOffset = 50;
        }

        drawSticker(page, stickersXOffset, stickersYOffset, game, userInfo, index + 1);

        stickersYOffset -= 160;
        if ((index + 1) % 4 === 0) {
          stickersYOffset = height - 150;
          stickersXOffset += 220;
        }
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'bazaar_stickers.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  }
</script>
