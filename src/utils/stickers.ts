import { jsPDF } from 'jspdf';
import type { Game } from '../types';

export function generateStickers(games: Game[]) {
  const doc = new jsPDF();

  // Your logic to generate stickers using the games data

  doc.save('stickers.pdf');
}
