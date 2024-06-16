<script lang="ts">
  import type { Game } from '@shared/types';
  import { games } from '@shared/stores/games';
  import { setupI18n, _ } from '@shared/i18n';
  import { onMount } from 'svelte';

  // Initialize i18n
  setupI18n();

  let editIndex = -1;
  let editField: keyof Game = 'title';
  let editValue: string | number | boolean = '';

  const startEdit = (index: number, field: keyof Game) => {
    editIndex = index;
    editField = field;
    editValue = $games[index][field] as string | number | boolean;
    
    setTimeout(() => {
      const inputElement = document.getElementById(`${field}-${index}`) as HTMLInputElement;
      if (inputElement) {
        inputElement.focus();
        inputElement.select();
      }
    }, 0);
  };

  const saveEdit = (index: number, field: keyof Game, value: Game[keyof Game]) => {
    games.update((items: Game[]) => {
      (items[index][field] as typeof value) = value;
      return items;
    });
  };

  const addRow = () => {
    games.update(current => [...current, { title: '', price: 0, sold: false }]);
  };

  const removeRow = (index: number) => {
    games.update(current => current.filter((_, i) => i !== index));
  };

  const handleKeyDown = (event: KeyboardEvent, index: number, field: keyof Game) => {
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

  const handleBlur = (event: FocusEvent, index: number, field: keyof Game) => {
    const value = (event.target as HTMLInputElement).value;
    const typedValue: Game[keyof Game] = field === 'price' ? Number(value) : (value as Game[keyof Game]);
    saveEdit(index, field, typedValue);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const clickedInside = (event.target as HTMLElement).closest('.table-container');
    if (!clickedInside) {
      editIndex = -1;
    }
  };

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>


<style>
  .table {
    table-layout: fixed;
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
  }

  td {
    height: auto; /* Ensure cells are auto height */
    vertical-align: middle; /* Center text vertically */
  }

  tr {
    height: auto; /* Ensure rows are auto height */
  }

  .input-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .input-field {
    flex: 1;
    height: auto;
    width: 100%;
    box-sizing: border-box;
    padding: 2px; /* Add minimal padding to make it a bit taller than the text */
    border: none;
    outline: none;
  }

  .id-column-wrapper {
    text-align: center;
    vertical-align: middle;
  }

  .id-column {
    width: 30px; /* Set a fixed width for the ID column */
    height: 30px; /* Ensure it is round */
    text-align: center;
    color: white;
    background-color: darkgray;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto; /* Center the ID column within the cell */
  }

  .table tbody td {
    padding: 4px;
}


</style>

<div class="table-container">
  <table class="table table-interactive">
    <colgroup>
      <col style="width: 40px;" />  <!-- Fixed width for ID column -->
      <col style="width: auto;" />  <!-- Flexible width for name column -->
      <col style="width: 100px;" /> <!-- Fixed width for price column -->
      <col style="width: 40px;" />  <!-- Fixed width for delete column -->
    </colgroup>
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
          <td class="id-column-wrapper">
            <div class="id-column">{index + 1}</div>
          </td>
          <td id={`title-td-${index}`} class="editable game-name-column" on:click={() => startEdit(index, 'title')}>
            {#if editIndex === index && editField === 'title'}
              <div class="input-wrapper">
                <input
                  class="input-field"
                  id={`title-${index}`}
                  type="text"
                  bind:value={editValue}
                  on:blur={(e) => handleBlur(e, index, 'title')}
                  on:keydown={(e) => handleKeyDown(e, index, 'title')}
                />
              </div>
            {:else}
              {game.title}
            {/if}
          </td>
          <td id={`price-td-${index}`} class="editable price-column" on:click={() => startEdit(index, 'price')}>
            {#if editIndex === index && editField === 'price'}
              <div class="input-wrapper">
                <input
                  class="input-field"
                  id={`price-${index}`}
                  type="number"
                  bind:value={editValue}
                  on:blur={(e) => handleBlur(e, index, 'price')}
                  on:keydown={(e) => handleKeyDown(e, index, 'price')}
                />
              </div>
            {:else}
              ${game.price}
            {/if}
          </td>
          <td class="delete-column">
            <button on:click={() => removeRow(index)} class="btn p-0 delete-button">🗑️</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <div class="add-row">
    <button class="btn" on:click={addRow}>➕</button>
  </div>
</div>
