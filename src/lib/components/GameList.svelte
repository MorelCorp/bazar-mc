<script lang="ts">
    import { games } from '../stores/games';

    let title = '';
    let price = 0;

    const addGame = () => {
        games.update((current: { title: string; price: number; sold: boolean }[]) => [
            ...current,
            { title, price, sold: false }
        ]);
        title = '';
        price = 0;
    };
</script>

<input bind:value={title} placeholder="Game Title" />
<input type="number" bind:value={price} placeholder="Price" />
<button on:click={addGame}>Add Game</button>

<ul>
    {#each $games as game}
        <li>{game.title} - ${game.price}</li>
    {/each}
</ul>
