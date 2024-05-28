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
        inputElement.select(); // Ensure the text is selected for editing
      }
    }, 0);
  };

  const saveEdit = (index, field, value) => {
    games.update(items => {
      items[index][field] = value;
      return items;
    });
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

  const handleBlur = (event, index, field) => {
    saveEdit(index, field, event.target.value);
  };
</script>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 2rem;
    table-layout: fixed;
  }
  th, td {
    border: 1px solid #999; /* Darker border */
    padding: 0;
    text-align: left;
    position: relative;
    height: 30px; /* Adjusted height */
  }
  th {
    background-color: #f2f2f2;
  }
  th:last-child, td:last-child, th:first-child {
    border: none; /* No border for the last column */
  }
  td.id-column {
    width: 30px; /* Adjust the width to fit 3 characters */
    text-align: center;
    color: #777; /* Medium gray color */
    font-size: 0.9em; /* Slightly smaller font size */
    white-space: nowrap; /* Ensure no line breaks */
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
  .delete-button {
    opacity: 0;
    transition: opacity 0.2s;
    border: none; /* Remove border from the button */
    background: none; /* Remove background from the button */
  }
  tr:hover .delete-button {
    opacity: 1;
  }
  tr:hover td {
    font-weight: bold;
  }
  .add-row {
    text-align: center;
  }
  .add-row button {
    width: calc(100% - 40px); /* Adjust width to exclude the trashcan column */
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
      <th></th>
      <th>Game Name</th>
      <th>Price</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {#each $games as game, index (index)}
      <tr>
        <td class="id-column">{index + 1}</td>
        <td id={`title-td-${index}`} class="editable" on:click={() => startEdit(index, 'title')}>
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
        <td id={`price-td-${index}`} class="editable" on:click={() => startEdit(index, 'price')}>
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
