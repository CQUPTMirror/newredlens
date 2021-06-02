<template>
  <div style="text-align: center;">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>
      Recommended IDE setup:
      <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
      +
      <a
        href="https://marketplace.visualstudio.com/items?itemName=octref.vetur"
        target="_blank">Vetur</a>
      or
      <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
      (if using
      <code>&lt;script setup&gt;</code>)
    </p>

    <p>See <code>README.md</code> for more information.</p>

    <p>
      <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Docs</a> |
      <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
    </p>

    <button @click="count++">
      count is: {{ count }}
    </button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test hot module replacement.
    </p>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'HelloWorld',
  setup: () => {
    const count = ref(0)
    return { count }
  }
})

// If you use script setup syntax, your code will look like this, it's simpler.
// But webstorm(2021.1 and below version) can't support it, you can use vscode + volar
//
// You must use: <script setup lang="ts">
// Then..
//
// import { ref } from 'vue'
//
// const name = 'HelloWorld'
// const count = ref(0)

// Even script setup + ref sugar..
// const name = 'HelloWorld'
// ref: count = 0
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
