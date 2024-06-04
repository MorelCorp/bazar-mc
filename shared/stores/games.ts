import { writable } from 'svelte/store';
import { persisted } from 'svelte-local-storage-store';
import type { Game } from '@shared/types';

const initialGames: Game[] = [];

export const games = persisted('games', initialGames);
