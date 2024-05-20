import { games } from '../src/lib/stores/games';
import { get } from 'svelte/store';

test('adds a game', () => {
    games.set([]);
    games.update((current: { title: string; price: number; sold: boolean }[]) => [
        ...current,
        { title: 'Test Game', price: 20, sold: false }
    ]);
    const allGames = get(games) as { title: string; price: number; sold: boolean }[];
    expect(allGames.length).toBe(1);
    expect(allGames[0].title).toBe('Test Game');
});
