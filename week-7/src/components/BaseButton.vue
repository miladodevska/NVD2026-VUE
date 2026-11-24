<template>
  <!-- attributes such as type, disabled and @click fall through to the <button> -->
  <button class="base-button">
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  white-space: nowrap;
}

.base-button:disabled {
  cursor: default;
  opacity: 0.6;
}
</style>
