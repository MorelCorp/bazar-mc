import QRCode from "qrcode";
import { Game } from "@shared/types";

const maxStringLength = 16;

function shortenString(str: string): string {
  return str.length > maxStringLength ? str.slice(0, maxStringLength) : str;
}

type GameShortForm = {
  n: string;
  p: number;
  i: number;
  su: string;
  sn: string;
};

function gameShortForm(game: Game): GameShortForm{
  return {
    n: shortenString(game.name),
    p: game.price,
    i: game.id,
    su: game.seller.uuid,
    sn: shortenString(game.seller.name),
  };
}

export function decodeGameShortForm(game: GameShortForm): Game {
  return {
    name: game.n,
    price: game.p,
    id: game.i,
    seller: {
      uuid: game.su,
      name: game.sn,
      email: "",
    },
    sold: false,
  };
}

//function to generate QR code from GameShortForm object
export const generateQRCode = (game: Game): Promise<string> => {
  return QRCode.toDataURL(JSON.stringify(gameShortForm(game)));
};

