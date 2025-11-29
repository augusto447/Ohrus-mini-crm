<script setup lang="ts">
import { Mail, Phone, Inbox, Trash2 } from "lucide-vue-next";
import type { Client } from "../types/clients";
import { useClientsStore } from "../stores/archivedClients";

const props = defineProps<{ client: Client }>();
const store = useClientsStore();

function archive() {
  store.archiveClient(props.client.id);
}

function remove() {
  store.deleteClient(props.client.id);
}

const isArchived = props.client.archived;
</script>

<template>
  <div
    class="bg-white p-4 rounded-xl flex items-center justify-between border border-gray-300"
  >
    <div class="flex gap-4 items-center">
      <img
        class="w-20 h-20 rounded-2xl object-cover"
        :src="props.client.photo"
        alt="foto"
      />
      <div class="flex items-center gap-16">
        <div>
          <h2 class="text-lg font-semibold text-gray-900 mb-4">
            {{ props.client.name }}
          </h2>
          <div class="flex gap-2 text-gray-600 items-center">
            <Mail class="w-4 h-4" />
            <span class="text-sm">{{ props.client.email }}</span>
          </div>
        </div>
        <div class="flex items-center gap-6">
          <div class="w-px h-10 bg-gray-400 mt-8"></div>
          <div class="flex items-center gap-2 text-gray-600 mt-1">
            <Phone class="w-4 h-4 mt-8" />
            <p class="text-sm mt-8">{{ props.client.phone }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex gap-3">
      <button
        v-if="!isArchived"
        @click="archive"
        class="flex items-center gap-2 bg-pink-50 hover:bg-pink-100 text-gray-800 px-3 py-2 rounded-lg transition cursor-pointer"
      >
        <Inbox class="w-4 h-4" />
        <span>Arquivar</span>
      </button>

      <button
        v-else
        class="flex items-center gap-2 bg-yellow-50 text-gray-600 px-3 py-2 rounded-lg cursor-default hover:bg-yellow-100"
        disabled
      >
        <Inbox class="w-4 h-4 text-yellow-500" />
        <span class="text-yellow-500 font-bold cursor-pointer">Arquivado</span>
      </button>

      <button
        v-if="!isArchived"
        @click="remove"
        class="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg transition cursor-pointer"
      >
        <Trash2 class="w-4 h-4 text-red-600" />
        <span>Eliminar</span>
      </button>
    </div>
  </div>
</template>
