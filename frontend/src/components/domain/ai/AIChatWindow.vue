<template>
  <div class="flex flex-column h-full bg-surface-0 dark:bg-surface-900 border-round-xl overflow-hidden border-1 border-surface-200 dark:border-surface-700">
    <!-- Chat Header -->
    <div class="p-3 border-bottom-1 border-surface-200 dark:border-surface-800 flex justify-content-between align-items-center bg-surface-50 dark:bg-surface-800">
      <div class="flex align-items-center gap-2">
          <Avatar icon="pi pi-sparkles" shape="circle" class="bg-indigo-500 text-white" />
        <span class="font-bold">Gemini AI Assistant</span>
      </div>
      <div class="flex gap-2">
        <Button icon="pi pi-trash" severity="secondary" text rounded @click="clearChat" />
      </div>
    </div>

    <!-- Messages Area -->
    <ScrollPanel class="flex-1 p-4 overflow-auto">
      <div class="flex flex-column gap-4">
        <div v-for="(msg, index) in currentMessages" :key="index" 
             :class="['flex w-full', msg.role === 'user' ? 'justify-content-end' : 'justify-content-start']">
          <div :class="['max-w-80 p-3 border-round-xl shadow-1', 
                        msg.role === 'user' ? 'bg-primary text-white border-round-top-right-none' : 'bg-surface-100 dark:bg-surface-800 text-surface-900 dark:text-surface-100 border-round-top-left-none']">
            <div class="text-sm leading-relaxed" v-html="msg.content"></div>
            <div class="text-[10px] mt-1 opacity-70 text-right" v-if="msg.role === 'user'">
              {{ msg.time }}
            </div>
          </div>
        </div>
        <div v-if="aiStore.isLoading" class="flex justify-content-start">
          <div class="bg-surface-100 dark:bg-surface-800 p-3 border-round-xl border-round-top-left-none shadow-1">
            <div class="flex gap-1">
              <div class="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
              <div class="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
              <div class="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
            </div>
          </div>
        </div>
      </div>
    </ScrollPanel>

    <!-- Input Area -->
    <div class="p-4 border-t border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-800">
      <div class="flex gap-2">
        <InputText 
          v-model="userInput" 
          placeholder="Posez une question sur le document..." 
          class="flex-1" 
          @keyup.enter="sendMessage" 
        />
        <Button icon="pi pi-send" severity="primary" @click="sendMessage" :disabled="aiStore.isLoading || !userInput" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Avatar from '@/components/ui/Avatar.vue';
import InputText from '@/components/ui/InputText.vue';
import Button from '@/components/ui/Button.vue';
import { useAIStore } from '@/stores/ai';

const route = useRoute();
const aiStore = useAIStore();
const docId = route.params.id as string;
const userInput = ref('');

const currentMessages = computed(() => aiStore.messages[docId] || []);

async function sendMessage() {
  if (!userInput.value || aiStore.isLoading) return;

  const text = userInput.value;
  userInput.value = '';
  await aiStore.sendMessage(docId, text);
}

function clearChat() {
  aiStore.clearChat(docId);
}
</script>

<style scoped>
.animate-bounce {
  animation: bounce 1s infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
</style>
