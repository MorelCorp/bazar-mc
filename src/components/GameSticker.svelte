<script lang="ts">
    import { games } from '../stores/games';
    import jsPDF from 'jspdf';

    const exportToPDF = () => {
        const doc = new jsPDF();
        $games.forEach((game: { title: string; price: number; sold: boolean }, index: number) => {
            doc.text(`${game.title} - $${game.price}`, 10, 10 + index * 10);
        });
        doc.save('games.pdf');
    };
</script>

<button on:click={exportToPDF}>Export to PDF</button>

<div class="stickers">
    {#each $games as game}
        <div class="sticker">
            <h3>{game.title}</h3>
            <p>${game.price}</p>
        </div>
    {/each}
</div>

<style>
    .stickers {
        display: flex;
        flex-wrap: wrap;
    }
    .sticker {
        border: 1px solid black;
        padding: 10px;
        margin: 5px;
        width: 100px;
    }
</style>
