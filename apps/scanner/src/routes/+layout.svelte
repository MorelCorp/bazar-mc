<script>
    import { onMount } from 'svelte';
    import { auth, provider, signInWithPopup } from '$lib/firebase';
    import { user } from '$lib/stores';
  
    onMount(() => {
      auth.onAuthStateChanged((u) => {
        user.set(u ? { uid: u.uid, displayName: u.displayName, email: u.email } : null);
      });
    });
  
    const login = async () => {
      try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.error('Login failed:', error);
      }
    };
  
    const logout = async () => {
      try {
        await auth.signOut();
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };
  </script>
  
  <slot />
  
  {#if $user}
    <button on:click={logout}>Logout</button>
  {:else}
    <button on:click={login}>Login with Google</button>
  {/if}
  