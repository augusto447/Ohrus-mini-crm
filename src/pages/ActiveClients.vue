<script setup lang="ts">
import { Users } from "lucide-vue-next";
import ClientCard from "../components/ClientCard.vue";
import { useClientsStore } from "../stores/archivedClients";

const store = useClientsStore();
</script>
<template>
  <div class="p-2">
    <div class="flex items-center gap-4 mb-10">
      <button class="bg-pink-50 p-3 rounded-2xl">
        <Users class="w-5 h-5 text-gray-700" />
      </button>

      <div>
        <h1 class="text-xl font-bold text-gray-800">Clientes Ativos</h1>

        <span class="text-sm text-gray-600">
          {{ store.clients.length }} Clientes Cadastrados
          <span v-if="store.archivedClients.length > 0">
            · {{ store.archivedClients.length }} Arquivado<span
              v-if="store.archivedClients.length > 1"
              >s</span
            >
          </span>
        </span>
      </div>
    </div>

    <section
      v-for="client in store.activeClients"
      :key="client.id"
      class="mt-5"
    >
      <ClientCard :client="client" />
    </section>
  </div>
</template>
