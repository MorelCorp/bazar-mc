<script lang="ts">
  export let form;
  import Header from '../components/Header.svelte';
  import UserInfo from '../components/UserInfo.svelte';
  import GamesTable from '../components/GamesTable.svelte';
  // import { generateStickers } from '../components/GenerateStickers.svelte';
  import Sticker from '../components/Sticker.svelte';
  import { user } from '@shared/stores/user';
  import { games } from '@shared/stores/games';
  



  const resetAllData = () => {
    if (confirm('Are you sure you want to reset all data?')) {
      localStorage.clear();
      user.set({ name: '', email: '' });
      games.set([]);
    }
  };

  // const saveAsPDF = () => {
  //   generateStickers();
  // };

  // Reactive statement to regenerate QR codes when seller name or email changes
  $: regenerateQRCodes();

  function regenerateQRCodes() {

    console.log(`Regenerating QR Code`);

    $games = $games.map((game, index) => ({
      ...game,
      qrCode: `${$user.name},${game.title},${index + 1},${game.price}`
    }));
  }
</script>

<main>


  <div class="top-right">
    <button class="btn variant-filled" on:click={resetAllData}>Reset</button>
    <!-- <button on:click={saveAsPDF}>Save as PDF</button> -->
  </div>
  <Header title="Bazaar Entry" />
  <UserInfo />
  <GamesTable />
  <div class="stickers-container">
    {#each $games as game, index}
      <Sticker
        logoUrl="/logo.png"
        sellerName={$user.name}
        gameName={game.title}
        price={game.price}
        stickerNumber={index + 1}
      />
    {/each}
  </div>
  <input type="hidden" value={form} />
</main>

<style>
  main {
    padding: 2rem;
    position: relative;
  }
  .top-right {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    gap: 1rem;
  }
  .top-right button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
  .stickers-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 1rem;
    margin-top: 2rem;
  }
</style>
