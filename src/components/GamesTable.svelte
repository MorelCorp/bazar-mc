<script>
    import { writable } from 'svelte/store';
  
    let games = writable([
      { name: '', price: '' },
      // Add initial 10 rows
      { name: '', price: '' },
      { name: '', price: '' },
      { name: '', price: '' },
      { name: '', price: '' },
      { name: '', price: '' },
      { name: '', price: '' },
      { name: '', price: '' },
      { name: '', price: '' },
      { name: '', price: '' },
    ]);
  
    const addRow = () => {
      games.update(current => [...current, { name: '', price: '' }]);
    };
  
    const removeRow = (index) => {
      games.update(current => current.filter((_, i) => i !== index));
    };
  </script>
  
  <table>
    <thead>
      <tr>
        <th>Game Name</th>
        <th>Price</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {#each $games as game, index (index)}
        <tr>
          <td><input type="text" bind:value={game.name} /></td>
          <td><input type="text" bind:value={game.price} /></td>
          <td>
            <button on:click={() => removeRow(index)} class="delete-button">
              🗑️
            </button>
          </td>
        </tr>
      {/each}
      <tr>
        <td colspan="3" class="add-row">
          <button on:click={addRow}>➕ Add Row</button>
        </td>
      </tr>
    </tbody>
  </table>
  
  <style>
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 2rem;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
    }
    .delete-button {
      opacity: 0.5;
      transition: opacity 0.2s;
    }
    .delete-button:hover {
      opacity: 1;
    }
    .add-row {
      text-align: center;
    }
  </style>
  