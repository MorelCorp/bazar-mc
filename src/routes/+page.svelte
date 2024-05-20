<script lang="ts">
    import GameList from '$lib/components/GameList.svelte';
    import GameSticker from '$lib/components/GameSticker.svelte';
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
