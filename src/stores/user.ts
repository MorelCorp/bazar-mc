import { writable } from 'svelte/store';
import { persisted } from 'svelte-local-storage-store';
import type { User } from '../types';

const initialUser: User = {
  name: '',
  email: '',
};

export const user = persisted('user', initialUser);
