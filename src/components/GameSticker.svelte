<script lang="ts">
    export let logoUrl: string = '/logo.png'; // Default logo path
    export let sellerName: string;
    export let gameName: string;
    export let price: number;
    export let stickerNumber: number;
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
  