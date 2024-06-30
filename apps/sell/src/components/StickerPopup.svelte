<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { games } from "@shared/stores/games";
  import { user } from "@shared/stores/user";
  import Sticker from "./Sticker.svelte";

  const dispatch = createEventDispatcher();

  const closePopup = () => {
    dispatch("close");
  };
</script>

<div class="popup">
  <div class="popup-content">
    <div class="popup-header">
      <h2>Generated Stickers</h2>
      <button class="btn variant-filled close-btn" on:click={closePopup}
        >X</button
      >
    </div>
    <div class="stickers-container">
      {#each $games as game, index}
        <Sticker
          logoUrl="/logo.png"
          sellerUUID={$user.uuid}
          sellerName={$user.name}
          gameName={game.title}
          price={game.price}
          stickerNumber={index + 1}
        />
      {/each}
    </div>
  </div>
</div>

<style>
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .popup-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 80%;
    max-height: 80%;
    overflow: auto;
    position: relative;
  }
  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  .close-btn {
    background: red;
    color: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-size: 1.5rem;
    line-height: 1;
  }
  .stickers-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 2rem;
  }
</style>
