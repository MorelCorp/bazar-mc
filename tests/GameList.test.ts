import { render, fireEvent } from '@testing-library/svelte';
import GameList from '../src/lib/components/GameList.svelte';

test('renders game list', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(GameList);
    const input = getByPlaceholderText('Game Title');
    await fireEvent.input(input, { target: { value: 'Test Game' } });
    const button = getByText('Add Game');
    await fireEvent.click(button);
    expect(await findByText('Test Game - $0')).toBeInTheDocument();
});
