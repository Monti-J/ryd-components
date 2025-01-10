<template>
  <div id="app">
    <header>
      <h1>Playground - Mi Librería</h1>
      <p>Prueba todos los componentes en una sola página.</p>
    </header>
    <main>
      <h2>Dropdown</h2>
      <DropdownDemo />
    </main>
  </div>
</template>

<script setup lang="ts">
import DropdownDemo from "./components/DropdownDemo.vue";
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 20px;
}

main {
  max-width: 800px;
  margin: 0 auto;
}
</style>
