<script>
    import { user } from '../stores/user';
    import { get } from 'svelte/store';
  
    let name = get(user).name;
    let email = get(user).email;
  
    // Update name in the store
    function updateName(event) {
      name = event.target.value;
      user.update(current => ({ ...current, name }));
    }
  
    // Update email in the store
    function updateEmail(event) {
      email = event.target.value;
      user.update(current => ({ ...current, email }));
    }
  
    // Reactively update local variables when store changes
    $: {
      const unsubscribe = user.subscribe(value => {
        name = value.name;
        email = value.email;
      });
    }
  </script>
  
  <div class="user-info">
    <label>
      Name:
      <input type="text" bind:value={name} on:input={updateName} />
    </label>
    <label>
      Email:
      <input type="email" bind:value={email} on:input={updateEmail} />
    </label>
  </div>
  
  <style>
    .user-info {
      display: flex;
      flex-direction: column;
      margin-bottom: 2rem;
    }
    label {
      margin-bottom: 1rem;
    }
  </style>
  