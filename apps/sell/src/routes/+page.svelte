<script lang="ts">
  import Header from "../components/Header.svelte";
  import UserInfo from "../components/UserInfo.svelte";
  import GamesTable from "../components/GamesTable.svelte";
  import { user } from "@shared/stores/user";
  import { games } from "@shared/stores/games";

  const resetAllData = () => {
    if (confirm("Are you sure you want to reset all data?")) {
      localStorage.clear();

      // Reset user store
      user.update((u) => ({ ...u, name: "", email: "" }));

      // Reset games store
      games.set([]);

      // Force a re-render of the component
      user.update((u) => u);
    }
  };

  const openStickersPage = () => {
    window.open("/stickers", "_blank");
  };
</script>

<main>
  <div class="top-right">
    <button class="btn variant-filled" on:click={resetAllData}>Reset</button>
  </div>
  <Header title="Bazaar Entry" />
  <UserInfo />
  <GamesTable />
  <div class="stickers-button-container">
    <button class="btn variant-filled" on:click={openStickersPage}
      >Generate Stickers</button
    >
  </div>
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
  .stickers-button-container {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }
</style>
