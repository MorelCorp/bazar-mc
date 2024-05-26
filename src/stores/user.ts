import { writable } from 'svelte/store';
import { persisted } from 'svelte-local-storage-store';

interface User {
  name: string;
  email: string;
}

const initialUser: User = {
  name: '',
  email: '',
};

export const user = persisted('user', initialUser);
