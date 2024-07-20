<template>
  <button class="button button--submit" type="button">
    {{ disableStatus }}
    ثبت و ادامه
  </button>
</template>
<script setup>
import { defineProps } from "vue";

defineProps(["disableStatus"]);
</script>
<style scoped>
.button--submit {
  background: var(--primary-color);
  color: white;
  padding: 12px 96px;
}
</style>
