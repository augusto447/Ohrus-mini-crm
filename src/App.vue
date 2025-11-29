<script setup lang="ts">
import Header from "./components/Header.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div class="mt-6">
    <Header
      :title="
        route.path === '/'
          ? 'Clientes'
          : route.path === '/archived'
          ? 'Arquivados'
          : ''
      "
    />

    <main class="p-4">
      <router-view />
    </main>
  </div>
</template>
