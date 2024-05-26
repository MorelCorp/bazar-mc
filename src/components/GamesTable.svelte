<script>
  import { games } from '../stores/games'; // Import the existing games store

  let editIndex = -1;
  let editField = '';
  let editValue = '';

  const startEdit = (index, field) => {
    editIndex = index;
    editField = field;
    editValue = $games[index][field];

    setTimeout(() => {
      const inputElement = document.getElementById(`${field}-${index}`);
      if (inputElement) {
        inputElement.focus();
      }
    }, 0);
  };

  const saveEdit = (index, field) => {
    games.update(items => {
      items[index][field] = editValue;
      return items;
    });
    editIndex = -1;
    editField = '';
  };

  const addRow = () => {
    games.update(current => [...current, { title: '', price: 0, sold: false }]);
  };

  const removeRow = (index) => {
    games.update(current => current.filter((_, i) => i !== index));
  };

  const handleKeyDown = (event, index, field) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      console.log(`Tab pressed in field: ${field}, index: ${index}`);
      
      let nextElement;
      if (field === 'title') {
        nextElement = document.getElementById(`price-td-${index}`);
      } else if (field === 'price') {
        if (index === $games.length - 1) {
          addRow();
          setTimeout(() => {
            const newElement = document.getElementById(`title-td-${$games.length - 1}`);
            if (newElement) {
              newElement.click();
            }
          }, 0);
          return;
        } else {
          nextElement = document.getElementById(`title-td-${index + 1}`);
        }
      }

      if (nextElement) {
        nextElement.click();
      }
    }
  };

  const handleFocus = (event, index, field) => {
    startEdit(index, field);
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
  .add-row button {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  .add-row button:hover {
    background-color: #f2f2f2;
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
        <td id={`title-td-${index}`} class="editable" on:click={() => startEdit(index, 'title')}>
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
        <td id={`price-td-${index}`} class="editable" on:click={() => startEdit(index, 'price')}>
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
    <tr>
      <td colspan="3" class="add-row">
        <button on:click={addRow}>➕ Add Row</button>
      </td>
    </tr>
  </tbody>
</table>
