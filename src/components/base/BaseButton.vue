<template>
  <button :disabled="disableStatus" class="custom-btn submit-btn" type="button">
    {{ disableStatus }}
    ثبت و ادامه
  </button>
</template>
<script setup>
import {defineProps} from 'vue'

defineProps(['disableStatus'])

</script>
<style scoped>
.submit-btn {
  background: var(--primary-color);
  color: white;
  padding: 12px 96px;
}

button:disabled,
button[disabled] {
  cursor: no-drop;
  background: rgba(0, 191, 165, 0.55);
}
</style>