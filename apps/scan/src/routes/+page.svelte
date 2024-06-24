<script lang="ts">
	import { goto } from '$app/navigation';
  
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
	  margin: 1rem;
	  padding: 1rem 2rem;
	  font-size: 1.5rem;
	  cursor: pointer;
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
	<button class="btn" on:click={navigateToRegister}>Register</button>
	<button class="btn" on:click={navigateToSale}>Sale</button>
	<button class="btn" on:click={navigateToCheckout}>Checkout</button>
  </main>
  