import { writable } from 'svelte/store';
import { persisted } from 'svelte-local-storage-store';
import type { User } from '@shared/types';

// Function to generate a new UUID
function generateUUID() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Attempt to retrieve an existing user from local storage, or use a default structure
const defaultUser: User = { name: '', email: '', uuid: generateUUID() };
const userStore = persisted('user', defaultUser);

// Check if the user object already has a uuid, if not, generate and set it
userStore.subscribe(($user) => {
  if (!$user.uuid) {
    $user.uuid = generateUUID();
    userStore.set($user); // Persist the newly added UUID
  }
});

export const user = userStore;