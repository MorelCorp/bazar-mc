<script lang="ts">
  import { onMount } from "svelte";
  import Sticker from "../../components/Sticker.svelte";
  import { games } from "@shared/stores/games";
  import { user } from "@shared/stores/user";

  let stickerPages: any[] = [];

  const generateStickerPages = () => {
    let stickersPerPage = 8;
    let pageCount = Math.ceil($games.length / stickersPerPage);
    stickerPages = Array.from({ length: pageCount }, (_, pageIndex) =>
      $games.slice(
        pageIndex * stickersPerPage,
        (pageIndex + 1) * stickersPerPage
      )
    );
  };

  onMount(() => {
    generateStickerPages();
  });

  const printPage = () => {
    window.print();
  };
</script>

<main>
  <header>
    <h1>Generated Stickers</h1>
    <button class="btn variant-filled" on:click={printPage}>Print</button>
  </header>
  {#each stickerPages as page}
    <div class="page">
      {#each page as game, index}
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
  {/each}
</main>

<style>
  .page {
    width: 8.5in;
    height: 11in;
    page-break-after: always;
  }
  .page:last-child {
    page-break-after: avoid;
  }
  :global(.sticker) {
    width: calc(50% - 1rem);
    margin: 0.5rem;
    box-sizing: border-box;
    float: left;
  }
  @media print {
    .page {
      margin: 0;
      padding: 0;
      page-break-after: always;
    }
    :global(.sticker) {
      float: none;
    }
  }
</style>
