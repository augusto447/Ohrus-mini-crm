<script setup lang="ts">
import { Inbox } from "lucide-vue-next";
import ClientCard from "../components/ClientCard.vue";
import { useClientsStore } from "../stores/archivedClients";

const store = useClientsStore();
</script>

<template>
  <div class="p-2">
    <div class="flex items-center gap-4 mt-2">
      <button class="bg-pink-50 p-3 rounded">
        <Inbox class="w-5 h-5 text-gray-700" />
      </button>
      <div>
        <h1 class="text-xl font-bold text-gray-800">Clientes Arquivados</h1>
        <span class="text-sm text-gray-600"
          >{{ store.archivedClients.length }} Arquivados</span
        >
      </div>
    </div>

    <section
      v-for="client in store.archivedClients"
      :key="client.id"
      class="mt-10"
    >
      <ClientCard :client="client" />
    </section>
  </div>
</template>
