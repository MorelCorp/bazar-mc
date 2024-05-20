import { writable } from 'svelte/store';
import { persisted } from 'svelte-local-storage-store';

interface Game {
    title: string;
    price: number;
    sold: boolean;
}

const initialGames: Game[] = [];

export const games = persisted('games', initialGames);
