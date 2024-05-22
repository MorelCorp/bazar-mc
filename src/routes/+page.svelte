<script lang="ts">
    import { onMount } from 'svelte';
    import GameSticker from '../components/GameSticker.svelte';
    import { writable } from 'svelte/store';
  
    interface Sticker {
      logoUrl: string;
      sellerName: string;
      gameName: string;
      price: number;
      stickerNumber: number;
    }
  
    const defaultLogoUrl = '/logo.png'; // Default logo path
    let sellerName = '';
    let gameName = '';
    let price: number = 0;
    let stickerNumber: number = 1;
    let stickers = writable<Sticker[]>([]);
    let userName = writable<string>('');
  
    const addSticker = () => {
      stickers.update((current) => [
        ...current,
        { 
          logoUrl: defaultLogoUrl, // Always use the default logo
          sellerName, 
          gameName, 
          price, 
          stickerNumber: stickerNumber++ 
        }
      ]);
  
      // Reset form fields
      gameName = '';
      price = 0;
    };
  
    const setUserName = (event: Event) => {
      const input = event.target as HTMLInputElement;
      userName.set(input.value);
    };
  
    // Initialize stickers with existing data if any (example purpose)
    onMount(() => {
      stickers.set([]);
    });
  </script>
  
  <main>
    <h1>Bazaar Game Listings</h1>
  
    <section>
      <h2>Enter Seller Name</h2>
      <form on:submit|preventDefault={setUserName}>
        <label>
          Seller Name:
          <input type="text" bind:value={sellerName} placeholder="Enter your name" required />
        </label>
        <button type="submit">Set Name</button>
      </form>
    </section>
    
    <section>
      <h2>Add New Sticker</h2>
      <form on:submit|preventDefault={addSticker}>
        <label>
          Nom du jeu:
          <input type="text" bind:value={gameName} placeholder="Nom du jeu" required />
        </label>
        <label>
          Prix:
          <input type="number" bind:value={price} placeholder="Prix" required />
        </label>
        <button type="submit">Add Sticker</button>
      </form>
    </section>
  
    <div>
      {#each $stickers as sticker (sticker.stickerNumber)}
        <GameSticker
          logoUrl={sticker.logoUrl}
          sellerName={sticker.sellerName}
          gameName={sticker.gameName}
          price={sticker.price}
          stickerNumber={sticker.stickerNumber}
        />
      {/each}
    </div>
  </main>
  
  <style>
    main {
      padding: 1em;
    }
    section {
      margin-bottom: 20px;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    form label {
      display: flex;
      flex-direction: column;
    }
  </style>
  