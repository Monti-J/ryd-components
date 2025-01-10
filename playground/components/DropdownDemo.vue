<template>
    <div class="demo">
      <rydDropdown
        v-model="selected"
        :options="options"
        size="lg"
        :disabled="false"
        text="Selecciona una opción"
        :multiselect="true"
      >
        <template #text>
          <span><span>🔧</span></span>
        </template>
      </rydDropdown>
      <p>Seleccionado: {{ selected }}</p>
    </div>
  </template>

<script setup lang="ts">
import { ref } from "vue";
import rydDropdown from "../../src/components/rydDropdown.vue";

const selected = ref(null);
const options = [
    { label: "Opción 1", value: 1 },
    { label: "Opción 2", value: 2 },
];
</script>

<style scoped>
.demo {
    margin: 20px 0;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
}
</style>