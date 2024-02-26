<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {UserApiService} from '../services/user/user_api.services';
import type User from '../services/models/UserRepresentation';

const users = ref([] as User[]);

onMounted(async () => {
  try {
    // Fetch users when the component is mounted
    users.value = await UserApiService.getAllUsers();
  } catch (error) {
    console.error('Error fetching users:', error);
  }
});
</script>

<template>
  <div class="my-8">
    <!-- Display user data in a responsive and styled table -->
    <div class="overflow-hidden rounded-lg border p-4">
      <h1 class="mb-4 text-2xl font-semibold">User Table</h1>
      <table class="min-w-full border border-gray-300 bg-white">
        <!-- Table headers -->
        <thead class="bg-gray-100">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              ID
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Username
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Email
            </th>
            <!-- Add more table headers as needed -->
          </tr>
        </thead>
        <!-- Table body with user data -->
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id" :class="{ 'bg-gray-50': index % 2 === 0 }">
            <td class="whitespace-nowrap px-6 py-4">{{ user.id }}</td>
            <td class="whitespace-nowrap px-6 py-4">{{ user.username }}</td>
            <td class="whitespace-nowrap px-6 py-4">{{ user.email }}</td>
            <!-- Display additional user properties in corresponding cells -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.odd:bg-gray-100 {
  background-color: #f3f4f6;
}

.even:bg-white {
  background-color: #ffffff;
}
</style>
