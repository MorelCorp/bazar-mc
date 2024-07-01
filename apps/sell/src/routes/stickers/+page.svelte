<script lang="ts">
  import { onMount } from "svelte";
  import Sticker from "../../components/Sticker.svelte";
  import { games } from "@shared/stores/games";
  import { user } from "@shared/stores/user";

  let stickerPages: any[] = [];

  const generateStickerPages = () => {
    let stickersPerPage = 8;
    stickerPages = [];
    for (let i = 0; i < $games.length; i += stickersPerPage) {
      stickerPages.push($games.slice(i, i + stickersPerPage));
    }
  };

  onMount(() => {
    generateStickerPages();
  });

  const printPage = () => {
    window.print();
  };
</script>

<main>
  <header class="no-print">
    <h1>Generated Stickers</h1>
    <button class="btn variant-filled" on:click={printPage}>Print</button>
  </header>
  {#each stickerPages as page, pageIndex}
    <div class="page">
      {#each page as game, index}
        <Sticker
          logoUrl="/logo.png"
          sellerUUID={$user.uuid}
          sellerName={$user.name}
          gameName={game.title}
          price={game.price}
          stickerNumber={pageIndex * 8 + index + 1}
        />
      {/each}
      {#if page.length < 8}
        {#each Array(8 - page.length) as _}
          <div class="sticker-placeholder"></div>
        {/each}
      {/if}
    </div>
  {/each}
</main>

<style>
  .page {
    width: 8.5in;
    height: 11in;
    page-break-after: always;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 0.25in;
    padding: 0.5in;
    box-sizing: border-box;
  }
  .page:last-child {
    page-break-after: avoid;
  }
  :global(.sticker),
  .sticker-placeholder {
    width: 100%;
    height: 100%;
    margin: 0;
    box-sizing: border-box;
    aspect-ratio: 16 / 10;
  }
  @media screen {
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .page {
      margin-bottom: 2rem;
      border: 1px solid #ccc;
    }
  }
  @media print {
    .no-print {
      display: none;
    }
    .page {
      margin: 0;
      padding: 0.25in;
    }
    @page {
      size: letter;
      margin: 0.5in;
    }
  }
</style>
