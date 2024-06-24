<script lang="ts">
	import { goto } from '$app/navigation';
	import { _ } from '@shared/i18n';
  
	const navigateToRegister = () => goto('/register');
	const navigateToSale = () => goto('/sale');
	const navigateToCheckout = () => goto('/checkout');
  </script>
  
  <style>
	main {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  height: 100vh;
	  text-align: center;
	}
	.btn {
		@apply w-10/12 px-8 py-4 m-4 text-4xl cursor-pointer;
	}
	.bazaar-btn {
	  position: absolute;
	  top: 1rem;
	  right: 1rem;
	}
  </style>
  
  <main>
	<button class="bazaar-btn" on:click={() => console.log('Open bazaar selection')}>Bazaar</button>
	<h1>Welcome to Bazaar Scanner App</h1>
	<button type="button" class="btn variant-filled" on:click={navigateToRegister}>{$_('Register')}</button>
	<button type="button" class="btn variant-filled" on:click={navigateToSale}>{$_('Sale')}</button>
	<button type="button" class="btn variant-filled" on:click={navigateToCheckout}>{$_('Checkout')}</button>
  </main>
  