import { defineStore } from "pinia";
import type { Client } from "../types/clients";
import { customers } from "../mocks/costumers";
import { computed, ref, watch } from "vue";

export const useClientsStore = defineStore("clients", () => {
  const clients = ref<Client[]>(
    JSON.parse(localStorage.getItem("clients") || "null") || customers
  );

  const activeClients = computed(() =>
    clients.value.filter((c) => !c.archived)
  );

  const archivedClients = computed(() =>
    clients.value.filter((c) => c.archived === true)
  );

  function archiveClient(id: number) {
    const client = clients.value.find((c) => c.id === id);
    if (client) client.archived = true;
  }

  function deleteClient(id: number) {
    clients.value = clients.value.filter((c) => c.id !== id);
  }

  watch(
    clients,
    (newClients) => {
      localStorage.setItem("clients", JSON.stringify(newClients));
    },
    { deep: true }
  );

  return {
    clients,
    activeClients,
    archivedClients,
    archiveClient,
    deleteClient,
  };
});
