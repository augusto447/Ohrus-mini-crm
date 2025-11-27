Plano de Desenvolvimento por Dias
Dia 1 – UI e Estrutura

Criar o projeto com Vite + Vue 3 + TypeScript.

Instalar Pinia, Vue Router e TailwindCSS.

Criar pastas: components/, pages/, stores/, routers/, mocks/, types/.

Criar layout básico no App.vue com navegação (router-link) e <router-view>.

Criar páginas vazias ActiveClients.vue e ArchivedClients.vue.

Dia 2 – Mock de Dados e Tipagem

Criar mocks/customers.ts com clientes fictícios.

Criar types/client.ts com interface Client.

Importar mock na página ActiveClients.vue.

Testar exibição de clientes na UI.

Dia 3 – Lógica de Clientes Ativos

Implementar lista local de clientes ativos (ref).

Funções:

deleteClient → remover cliente localmente.

archiveClient → enviar cliente para Pinia (ainda criar store).

Testar interação dos botões.

Dia 4 – Pinia e Clientes Arquivados

Criar stores/archivedClients.ts.

Funções:

add(client) → adicionar cliente arquivado.

remove(clientId) → remover cliente arquivado.

Integrar archiveClient da página de clientes ativos com a store.

Criar página ArchivedClients.vue que consome a Pinia.

Dia 5 – Refinamento e Navegação

Testar navegação entre /clientes e /arquivados.

Ajustar estilos com TailwindCSS: botões, listas, cores.

Evitar duplicação de lógica (reaproveitar componente ClientCard.vue se quiser).

Garantir que a UI funcione em diferentes tamanhos de tela.

Dia 6 – Tipagem e Revisão Final

Garantir que todos os arquivos estão tipados com TypeScript.

Revisar imports de tipos (Client) nas páginas, store e componentes.

Testar novamente todas as funcionalidades: deletar, arquivar, remover.

Ajustes finais de UI e limpeza de código.

TESTE ESTA AQUI

Projeto e Tecnologias

Você precisa criar um Mini CRM usando:

Vue 3 com Composition API (sem Options API)

Pinia → gerenciamento do estado global (apenas para clientes arquivados)

Vue Router → navegação entre páginas /clientes e /arquivados

TailwindCSS → estilização

TypeScript → tipagem forte para clientes, stores, props e estados

Vite → para inicializar o projeto com Vue 3

Todos os dados dos clientes já estão em mocks/customers.ts. Não será necessário criar banco de dados; tudo será local ou em Pinia.

2️⃣ Organização Recomendada de Pastas

O layout sugerido é:

src/
├─ components/ # Componentes reutilizáveis (cards, botões, headers)
├─ pages/ # Páginas do app (ClientesAtivos.vue, ClientesArquivados.vue)
├─ stores/ # Pinia stores (clientes arquivados)
├─ routers/ # Configuração de rotas
├─ mocks/ # Dados simulados (customers.ts)
├─ types/ # Tipagens TypeScript (Cliente)
├─ App.vue # Componente principal
├─ main.ts # Inicialização do app, Pinia, Router

Observação: Organização é importante para código limpo e manutenível.

3️⃣ Tipagem TypeScript

Crie um type para clientes. Por exemplo, em types/client.ts:

export interface Client {
id: number; // Identificador único
name: string; // Nome do cliente
email: string; // Email
phone: string; // Telefone
}

Esse type será usado em componentes, stores e props. Evita erros de digitação e facilita autocomplete.

4️⃣ Dados Mocks

Em mocks/customers.ts, por exemplo:

import { Client } from "../types/client";

export const customers: Client[] = [
{ id: 1, name: "Augusto", email: "augusto@email.com", phone: "912345678" },
{ id: 2, name: "Orquídea", email: "orquidea@email.com", phone: "923456789" },
// mais clientes...
];

Esses dados serão usados na página Clientes Ativos.

5️⃣ Store Pinia para Arquivados

Em stores/archivedClients.ts:

import { defineStore } from "pinia";
import { Client } from "../types/client";

export const useArchivedClientsStore = defineStore("archivedClients", {
state: () => ({
clients: [] as Client[]
}),
actions: {
archiveClient(client: Client) {
// Evita duplicação
if (!this.clients.find(c => c.id === client.id)) {
this.clients.push(client);
}
},
removeClient(id: number) {
this.clients = this.clients.filter(c => c.id !== id);
}
}
});

Explicação linha a linha:

defineStore("archivedClients", {...}) → cria a store global com o nome "archivedClients".

state: () => ({ clients: [] }) → estado inicial: lista de clientes arquivados.

actions → funções que manipulam o estado.

archiveClient(client) → adiciona cliente à lista, evitando duplicados.

removeClient(id) → remove cliente pelo id.

6️⃣ Router (Vue Router)

Em routers/index.ts:

import { createRouter, createWebHistory } from "vue-router";
import ClientesAtivos from "../pages/ClientesAtivos.vue";
import ClientesArquivados from "../pages/ClientesArquivados.vue";

const routes = [
{ path: "/clientes", component: ClientesAtivos },
{ path: "/arquivados", component: ClientesArquivados },
{ path: "/:pathMatch(.*)*", redirect: "/clientes" } // fallback
];

export const router = createRouter({
history: createWebHistory(),
routes
});

Explicação:

createRouter → cria o roteamento.

createWebHistory → usa histórico do navegador (sem hash #).

routes → define caminho e componente a renderizar.

/:pathMatch(._)_ → redireciona qualquer rota inválida para /clientes.

No main.ts:

import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./routers";
import { createPinia } from "pinia";
import "./index.css"; // Tailwind

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");

7️⃣ Componentes Reutilizáveis
Exemplo: components/ClientCard.vue
<template>

  <div class="p-4 border rounded shadow flex justify-between items-center">
    <div>
      <p class="font-bold">{{ client.name }}</p>
      <p>{{ client.email }}</p>
      <p>{{ client.phone }}</p>
    </div>
    <div class="flex gap-2">
      <button @click="$emit('archive', client)" class="bg-blue-500 text-white px-2 py-1 rounded">Arquivar</button>
      <button @click="$emit('delete', client.id)" class="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Client } from "../types/client";
defineProps<{ client: Client }>();
</script>

Explicação:

props → recebe um cliente (Client).

@click="$emit('archive', client)" → emite evento para o componente pai arquivar.

$emit('delete', client.id) → emite evento para excluir.

Isso evita duplicar lógica em cada página.

8️⃣ Página Clientes Ativos

Em pages/ClientesAtivos.vue:

<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Clientes Ativos</h1>
    <ClientCard
      v-for="client in clients"
      :key="client.id"
      :client="client"
      @archive="archiveClient"
      @delete="deleteClient"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { customers } from "../mocks/customers";
import { Client } from "../types/client";
import ClientCard from "../components/ClientCard.vue";
import { useArchivedClientsStore } from "../stores/archivedClients";

const clients = ref<Client[]>([...customers]);
const archivedStore = useArchivedClientsStore();

function archiveClient(client: Client) {
  archivedStore.archiveClient(client);
  clients.value = clients.value.filter(c => c.id !== client.id);
}

function deleteClient(id: number) {
  clients.value = clients.value.filter(c => c.id !== id);
}
</script>

Detalhes:

clients → estado local dos clientes ativos.

archivedStore → store Pinia para arquivar clientes.

archiveClient(client) → envia para Pinia e remove da lista local.

deleteClient(id) → remove cliente localmente.

Aqui o estado não usa Pinia, só local, como o requisito pediu.

9️⃣ Página Clientes Arquivados

Em pages/ClientesArquivados.vue:

<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Clientes Arquivados</h1>
    <ClientCard
      v-for="client in archivedClients"
      :key="client.id"
      :client="client"
      @delete="removeClient"
    />
  </div>
</template>

<script lang="ts" setup>
import ClientCard from "../components/ClientCard.vue";
import { useArchivedClientsStore } from "../stores/archivedClients";

const archivedStore = useArchivedClientsStore();
const archivedClients = archivedStore.clients;

function removeClient(id: number) {
  archivedStore.removeClient(id);
}
</script>

Detalhes:

Usa diretamente a store Pinia.

A lógica é similar à de ativos, mas todos os dados estão no estado global.

🔟 Navegação

No App.vue, você pode criar um header simples:

<template>
  <nav class="bg-gray-800 p-4 text-white flex gap-4">
    <router-link to="/clientes" class="hover:underline">Clientes Ativos</router-link>
    <router-link to="/arquivados" class="hover:underline">Clientes Arquivados</router-link>
  </nav>
  <router-view />
</template>

router-view → onde a página atual será renderizada.

Claves do Teste

Composition API → usamos ref, setup() e funções ao invés de data e methods.

Pinia apenas para arquivados → ativos ficam locais.

Reutilização de componentes → ClientCard evita repetir código.

TailwindCSS → classes utilitárias para estilização rápida.

TypeScript → tipagem para clientes, stores e props.

Router → navegação entre páginas.
