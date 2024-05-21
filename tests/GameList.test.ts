import { render, fireEvent } from '@testing-library/svelte';
import type { SvelteComponent } from 'svelte';
import GameList from '../src/lib/components/GameList.svelte';

test('renders game list and adds a new game', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(GameList as unknown as typeof SvelteComponent);
    const inputTitle = getByPlaceholderText('Game Title');
    const inputPrice = getByPlaceholderText('Price');
    
    await fireEvent.input(inputTitle, { target: { value: 'Test Game 2' } });
    await fireEvent.input(inputPrice, { target: { value: '30' } });
    
    const button = getByText('Add Game');
    await fireEvent.click(button);
    
    expect(await findByText('Test Game 1 - $20')).toBeInTheDocument();
    expect(await findByText('Test Game 2 - $30')).toBeInTheDocument();
});
