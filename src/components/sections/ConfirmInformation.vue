<template>
  <section class="widget-holder">
    <div class="confirm-box-holder">
      <div class="d-flex flex-column align-items-center">
        <div class="confirm-title text-center mb-4">
          <i class="bi bi-check-circle"></i>
          <p>اطلاعات شما با موفقیت ثبت شد</p>
        </div>
        <div class="confirm-action">
          <secondary-button @click="router.push('/address-list')"></secondary-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import router from "@/router";
import SecondaryButton from "@/components/base/SecondaryButton.vue";
</script>

<style scoped>
.confirm-box-holder {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.confirm-title i {
  font-size: 30px;
  color: var(--main-text-color);
}

</style>