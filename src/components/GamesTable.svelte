<script>
  import { games } from '../stores/games'; // Import the existing games store

  let editIndex = -1;
  let editField = '';
  let editValue = '';

  const startEdit = (index, field) => {
    editIndex = index;
    editField = field;
    editValue = $games[index][field];
  };

  const saveEdit = (index, field) => {
    games.update(items => {
      items[index][field] = editValue;
      return items;
    });
    editIndex = -1;
    editField = '';
  };

  const cancelEdit = () => {
    editIndex = -1;
    editField = '';
  };

  const addRow = () => {
    games.update(current => [...current, { title: '', price: 0, sold: false }]);
    $games.length - 1;
    // Use $games to get the new length after adding the row
  };

  const removeRow = (index) => {
    games.update(current => current.filter((_, i) => i !== index));
  };

  const handleKeyDown = (event, index, field) => {
    if (event.key === 'Tab') {
      event.preventDefault();

      const nextIndex = field === 'title' ? `price-${index}` : `title-${index + 1}`;
      const nextElement = document.getElementById(nextIndex);

      if (nextElement) {
        nextElement.focus();
      } else {
        addRow();
        setTimeout(() => {
          const newElement = document.getElementById(`title-${$games.length - 1}`);
          if (newElement) {
            newElement.focus();
          }
        }, 0);
      }
    }
  };
</script>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 2rem;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
  .editable {
    cursor: pointer;
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
        <td class="editable" on:click={() => startEdit(index, 'title')}>
          {#if editIndex === index && editField === 'title'}
            <input
              id={`title-${index}`}
              type="text"
              bind:value={editValue}
              on:blur={() => saveEdit(index, 'title')}
              on:keydown={(e) => handleKeyDown(e, index, 'title')}
            />
          {:else}
            {game.title}
          {/if}
        </td>
        <td class="editable" on:click={() => startEdit(index, 'price')}>
          {#if editIndex === index && editField === 'price'}
            <input
              id={`price-${index}`}
              type="number"
              bind:value={editValue}
              on:blur={() => saveEdit(index, 'price')}
              on:keydown={(e) => handleKeyDown(e, index, 'price')}
            />
          {:else}
            ${game.price}
          {/if}
        </td>
        <td>
          <button on:click={() => removeRow(index)} class="delete-button">🗑️</button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
