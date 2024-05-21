<script lang="ts">
    import GameList from '../components/GameList.svelte';
    import GameSticker from '../components/GameSticker.svelte';
</script>

<main>
    <h1>Bazaar Game Listings</h1>
    <GameList />
    <GameSticker />
</main>

<style>
    main {
        padding: 1em;
    }
</style>
