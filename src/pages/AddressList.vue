<template>
  <Loading class="mt-3" v-if="loading"></Loading>
  <section v-else class="widget-holder">
    <div class="widget" :class="containerClass">
      <div class="widget__title">
        <h3>آدرس ها و مشخصات</h3>
      </div>
      <div v-for="address in addresses" :key="address.id" class="widget__content">
        <div class="row widget__row">
          <div class="col-12 col-sm-6 col-md-4 widget__info--full-name-sm">
            <div class="user-info">
              <div class="user-info__title">
                <span>نام و نام خانوادگی</span>
              </div>
              <div class="user-info__content">
                <strong>{{ address.first_name }} {{ address.last_name }}</strong>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-4 widget__info--full-name-md">
            <div class="user-info">
              <div class="user-info__title">
                <span>نام</span>
              </div>
              <div class="user-info__content">
                <strong>{{ address.first_name }}</strong>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-4 widget__info--full-name-md">
            <div class="user-info">
              <div class="user-info__title">
                <span>نام و نام خانوادگی</span>
              </div>
              <div class="user-info__content">
                <strong>{{ address.last_name }}</strong>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-4">
            <div class="user-info">
              <div class="user-info__title">
                <span>جنسیت</span>
              </div>
              <div class="user-info__content">
                <strong>آقا</strong>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-4">
            <div class="user-info">
              <div class="user-info__title">
                <span>شماره تلفن همراه</span>
              </div>
              <div class="user-info__content">
                <strong>{{ address.coordinate_mobile }}</strong>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-4">
            <div class="user-info user-info--phone">
              <div class="user-info__title">
                <span>شماره تلفن ثابت</span>
              </div>
              <div class="user-info__content">
                <strong>{{ address.coordinate_phone_number }}</strong>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-4">
            <div class="user-info--address flex-column">
              <div class="user-info__title">
                <span>آدرس</span>
              </div>
              <div class="user-info__content">
                <strong>{{ address.address }}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import useAddressStore from "@/store/addresses.js";
import {computed, ref, onMounted, onBeforeUnmount} from "vue";
import Loading from "@/components/loadings/Loading.vue";
const loading = ref(false)
const addressStore = useAddressStore()
const addresses = computed(() => addressStore.getAddresses)

const containerClass = ref('container');
const updateContainerClass = () => {
  window.innerWidth >= 768 ? containerClass.value = 'custom-container' : containerClass.value = 'container';
};
onMounted(() => {
  updateContainerClass();
  window.addEventListener('resize', updateContainerClass);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateContainerClass);
});
async function fetchAddresses() {
  loading.value = true
  await addressStore.fetchAddresses()
  loading.value = false
}

fetchAddresses()
</script>

<style scoped>
.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info__title {
  color: #9B9B9B;
  font-size: var(--font-size-md);
  font-weight: 400;
}

.user-info__content {
  color: var(--main-text-color);
  font-size: var(--font-size-md);
}

.widget__info--full-name-md {
  display: none;
}

.user-info--phone {
  border-bottom: 1px solid #E0E0E0;
  padding: 0 0 12px 0;
}

@media screen and (min-width: 768px) {
  .user-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }

  .widget__info--full-name-sm {
    display: none;
  }

  .widget__info--full-name-md {
    display: block;
  }

  .user-info--phone {
    border: none;
    padding: 0;
  }
}
</style>