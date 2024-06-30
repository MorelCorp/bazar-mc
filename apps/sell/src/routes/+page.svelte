<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import Header from "../components/Header.svelte";
  import UserInfo from "../components/UserInfo.svelte";
  import GamesTable from "../components/GamesTable.svelte";
  import Sticker from "../components/Sticker.svelte";
  import StickerPopup from "../components/StickerPopup.svelte";
  import { user } from "@shared/stores/user";
  import { games } from "@shared/stores/games";

  const showStickersPopup = writable(false);

  const resetAllData = () => {
    if (confirm("Are you sure you want to reset all data?")) {
      localStorage.clear();
      user.set({ name: "", email: "" });
      games.set([]);
    }
  };

  function regenerateQRCodes() {
    console.log(`Regenerating QR Code`);
    $games = $games.map((game, index) => ({
      ...game,
      qrCode: `${$user.name},${game.title},${index + 1},${game.price}`,
    }));
  }

  const toggleStickersPopup = () => {
    if ($showStickersPopup) {
      showStickersPopup.set(false);
    } else {
      regenerateQRCodes();
      showStickersPopup.set(true);
    }
  };

  onMount(() => {
    regenerateQRCodes();
  });
</script>

<main>
  <div class="top-right">
    <button class="btn variant-filled" on:click={resetAllData}>Reset</button>
  </div>
  <Header title="Bazaar Entry" />
  <UserInfo />
  <GamesTable />
  <div class="generate-stickers">
    <button class="btn variant-filled" on:click={toggleStickersPopup}
      >Generate Stickers</button
    >
  </div>
  {#if $showStickersPopup}
    <StickerPopup on:close={toggleStickersPopup} />
  {/if}
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
  .generate-stickers {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }
</style>
