<script setup lang="ts">
import { HomeIcon, Inbox, Users } from "lucide-vue-next";
import logo from "../assets/logo.jpeg";

defineProps<{ title: string }>();
</script>

<template>
  <header
    class="bg-gray-700 flex items-center justify-between px-6 py-5 rounded-lg mx-6"
  >
    <div class="flex items-center gap-4">
      <img class="w-13 h-13 rounded-2xl" :src="logo" alt="logo" />

      <div class="flex flex-col">
        <h1 class="text-2xl font-bold text-white">CRM</h1>
        <span class="text-gray-400">Software de Gerenciamento de Clientes</span>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <div class="flex gap-8 items-center cursor-pointer">
        <RouterLink to="/">
          <HomeIcon
            class="w-5 h-5 text-gray-100 cursor-pointer hover:text-gray-500"
          />
        </RouterLink>
        <RouterLink to="/archived">
          <Inbox
            class="w-5 h-5 text-gray-100 cursor-pointer hover:text-gray-500"
          />
        </RouterLink>
      </div>
      <div class="w-px h-6 bg-gray-400"></div>
      <div class="flex items-center gap-2">
        <button
          class="flex gap-2 items-center bg-gray-600 p-2 shadow-2xl rounded-lg hover:bg-gray-500 cursor-pointer"
        >
          <Users class="w-5 h-5 text-white" />
          <span class="text-white">{{ title }}</span>
        </button>
      </div>
    </div>
  </header>
</template>
