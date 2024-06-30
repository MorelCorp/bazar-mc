<script lang="ts">
  import { user } from "@shared/stores/user";
  import { get } from "svelte/store";

  import { _ } from "@shared/i18n";

  let name = get(user).name;

  let email = get(user).email;
  let emailValid = true;

  // Function to validate email format
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  $: emailValid = validateEmail(email);

  // Update name in the store
  function updateName(event: Event) {
    name = (event.target as HTMLInputElement).value;
    user.update((current) => ({ ...current, name }));
  }

  // Update email in the store
  function updateEmail(event: Event) {
    email = (event.target as HTMLInputElement).value;
    user.update((current) => ({ ...current, email }));
  }

  // Reactively update local variables when store changes
  $: {
    const unsubscribe = user.subscribe((value) => {
      name = value.name;
      email = value.email;
    });
  }
</script>

<div class="card p-4">
  <div class="user-info-block">
    <p>{$_("sellerName")}</p>
    <div class="input-group input-group-divider grid-cols-[1fr_auto]">
      <input
        class="input"
        title={$_("sellerName")}
        bind:value={name}
        on:input={updateName}
        type="text"
        placeholder={$_("sellerName")}
      />
    </div>
  </div>

  <div class="user-info-block">
    <p>{$_("email")}</p>
    <div
      class="input-group input-group-divider grid-cols-[1fr_auto] {emailValid
        ? ''
        : 'error'}"
    >
      <input
        class="input"
        title={$_("email")}
        bind:value={email}
        on:input={updateEmail}
        type="email"
        placeholder={$_("email")}
      />
      {#if !emailValid && email.length > 0}
        <button title="Invalid email format.">❗</button>
      {/if}
    </div>
  </div>
</div>

<style>
  .card {
    margin-bottom: 2rem;
  }

  .user-info-block {
    margin-bottom: 1rem;
  }

  .error {
    border: 4px solid red;
  }
</style>
