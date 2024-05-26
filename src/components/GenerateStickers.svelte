<script>
    import { writable } from 'svelte/store';
    import { PDFDocument, rgb } from 'pdf-lib';
    import { get } from 'svelte/store';
    import { games } from './GamesTable.svelte'; // Ensure the games store is exported from GamesTable
  
    const generateStickers = async () => {
      const pdfDoc = await PDFDocument.create();
      let page = pdfDoc.addPage([600, 800]);
      const { width, height } = page.getSize();
  
      const gameData = get(games);
      let yOffset = height - 50;
  
      gameData.forEach((game, index) => {
        if (index % 8 === 0 && index !== 0) {
          page = pdfDoc.addPage([600, 800]);
          yOffset = height - 50;
        }
  
        page.drawText(`${game.name} - $${game.price}`, {
          x: 50,
          y: yOffset,
          size: 12,
          color: rgb(0, 0, 0),
        });
        yOffset -= 100; // Adjust spacing between stickers
      });
  
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'stickers.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  </script>
  
  <button on:click={generateStickers}>Generate Stickers</button>
  