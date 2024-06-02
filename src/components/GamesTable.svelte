<script lang="ts">
  import { games } from '../stores/games';

  import { setupI18n, _ } from '../i18n';
  
  // Initialize i18n
  setupI18n();

  let editIndex = -1;
  let editField = '';
  let editValue = '';

  const startEdit = (index: number, field: string) => {
    editIndex = index;
    editField = field;
    editValue = $games[index][field]; // Access the store directly with $games

    setTimeout(() => {
      const inputElement = document.getElementById(`${field}-${index}`) as HTMLInputElement;
      if (inputElement) {
        inputElement.focus();
        inputElement.select();
      }
    }, 0);
  };

  const saveEdit = (index: number, field: string, value: string | number) => {
    games.update(items => {
      items[index][field] = value;
      return items;
    });
  };

  const addRow = () => {
    games.update(current => [...current, { title: '', price: 0, sold: false }]);
  };

  const removeRow = (index: number) => {
    games.update(current => current.filter((_, i) => i !== index));
  };

  const handleKeyDown = (event: KeyboardEvent, index: number, field: string) => {
    if (event.key === 'Tab') {
      event.preventDefault();

      if (field === 'title') {
        if (event.shiftKey) {
          const prevElement = document.getElementById(`price-td-${index - 1}`);
          if (prevElement) {
            prevElement.click();
          }
        } else {
          const nextElement = document.getElementById(`price-td-${index}`);
          if (nextElement) {
            nextElement.click();
          }
        }
      } else if (field === 'price') {
        if (event.shiftKey) {
          const prevElement = document.getElementById(`title-td-${index}`);
          if (prevElement) {
            prevElement.click();
          }
        } else {
          if (index === $games.length - 1) {
            addRow();
            setTimeout(() => {
              const newElement = document.getElementById(`title-td-${$games.length - 1}`);
              if (newElement) {
                newElement.click();
              }
            }, 0);
          } else {
            const nextElement = document.getElementById(`title-td-${index + 1}`);
            if (nextElement) {
              nextElement.click();
            }
          }
        }
      }
    }
  };

  const handleBlur = (event: FocusEvent, index: number, field: string) => {
    saveEdit(index, field, (event.target as HTMLInputElement).value);
  };
</script>

<style>
  table {
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    border-collapse: collapse;
    margin-bottom: 2rem;
  }
  th, td {
    border: 1px solid #999;
    padding: 0;
    text-align: left;
    position: relative;
    height: 30px;
  }
  th {
    background-color: black;
    color: white;
    text-align: center;
  }
  th.game-name-column, td.game-name-column {
    width: 80%;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  th.price-column, td.price-column {
    width: 10ch;
    text-align: center;
    white-space: nowrap;
  }
  td:first-child, th:first-child {
    border: none;
    background: none;
  }
  td.id-column {
    width: 30px;
    height: 30px;
    text-align: center;
    color: white;
    background-color: darkgray;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8em; /* Adjust font size as needed */
    margin: 0 auto; /* Center the circle within the cell */
  }
  .editable {
    cursor: pointer;
    padding: 0;
  }
  .editable input {
    width: 100%;
    height: 100%;
    border: none;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-size: inherit;
    font-family: inherit;
  }
  .editable input:focus {
    outline: 2px solid #0078d7;
  }
  .delete-column {
    text-align: center;
    width: 40px;
  }
  .delete-button {
    opacity: 0;
    transition: opacity 0.2s;
    border: none;
    background: none;
  }
  tr:hover .delete-button {
    opacity: 1;
  }
  td:hover .delete-button {
    font-size: 1.2em; /* Adjust font size as needed */
  }
  tr:hover td {
    font-weight: bold;
  }
  tr:hover .id-column {
    background-color: #333; /* Very dark color */
    font-size: 1em;
  }
  .add-row {
    text-align: center;
  }
  .add-row button {
    width: calc(100% - 40px);
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
  td:last-child, th:last-child {
    border: none;
    background: none;
  }
</style>

<table>
  <thead>
    <tr>
      <th></th>
      <th class="game-name-column">{$_('gameName')}</th>
      <th class="price-column">{$_('price')}</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {#each $games as game, index (index)}
      <tr>
        <td class="id-column">{index + 1}</td>
        <td id={`title-td-${index}`} class="editable game-name-column" on:click={() => startEdit(index, 'title')}>
          {#if editIndex === index && editField === 'title'}
            <input
              id={`title-${index}`}
              type="text"
              bind:value={editValue}
              on:blur={(e) => handleBlur(e, index, 'title')}
              on:keydown={(e) => handleKeyDown(e, index, 'title')}
            />
          {:else}
            {game.title}
          {/if}
        </td>
        <td id={`price-td-${index}`} class="editable price-column" on:click={() => startEdit(index, 'price')}>
          {#if editIndex === index && editField === 'price'}
            <input
              id={`price-${index}`}
              type="number"
              bind:value={editValue}
              on:blur={(e) => handleBlur(e, index, 'price')}
              on:keydown={(e) => handleKeyDown(e, index, 'price')}
            />
          {:else}
            ${game.price}
          {/if}
        </td>
        <td class="delete-column">
          <button on:click={() => removeRow(index)} class="delete-button">🗑️</button>
        </td>
      </tr>
    {/each}
    <tr>
      <td colspan="3" class="add-row">
        <button on:click={addRow}>➕</button>
      </td>
    </tr>
  </tbody>
</table>
