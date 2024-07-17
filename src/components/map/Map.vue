<template>
  <ConfirmInformation v-if="passStatus"></ConfirmInformation>
  <!--  اگر وضعیت عبور تایید شد به صفحه تایید اطلاعات میرود-->
  <section v-else class="widget-holder ">
    <div class="widget" :class="containerClass">
      <div class="widget-title">
        <i @click="goBack" class="bi-arrow-right"></i>
        <h3>انتخاب آدرس</h3>
      </div>
      <div class="widget-content">
        <div class="map-title">
          <div class="map-title-back">
            <i @click="goBack" class="bi-arrow-right"></i>
          </div>
          <div class="map-title-text">
            <strong>انتخاب موقعیت</strong>
          </div>
        </div>
        <div class="">
          <p class="form-title mb-3">لطفا مشخصات و آدرس خود را وارد کنید</p>
        </div>
        <div ref="mapContainer" class="map-container"></div>
      </div>
    </div>
    <footer class="widget-footer">
      <div class="row">
        <div class="col-12">
          <div class="widget-submit">
            <LoadingButton v-if="loading"></LoadingButton>
            <base-button v-else @click="addAddress"></base-button>
          </div>
        </div>
      </div>
    </footer>
  </section>
</template>
<script setup>
import useAddressStore from "@/store/addresses.js";
import {onBeforeUnmount, onMounted, ref} from 'vue';
import BaseButton from "@/components/base/BaseButton.vue";
import LoadingButton from "@/components/base/LoadingButton.vue";
import ConfirmInformation from "@/components/sections/ConfirmInformation.vue";

const addressStore = useAddressStore()
const passStatus = ref(addressStore.getPassStatus)
const currentAddress = ref(addressStore.getNewAddress) //مضخصات یوزری که در صفحه قبل ثبت شده است
const loading = ref(false)
const goBack = () => {
  history.back()
}
const addAddress = async () => {
  if (currentAddress.value.lat) { //اگر یوزر موقعیت را روی صفحه مشخص کرده بود
    loading.value = true;
    await addressStore.setNewAddress(currentAddress.value)
    loading.value = false;
  }
}
const containerClass = ref('container'); //برای سفارشی سازی و حذف کلاس کانتینر در سایز های مختلف
const updateContainerClass = () => {
  if (window.innerWidth >= 768) {
    containerClass.value = 'custom-container';
  } else {
    containerClass.value = 'container';
  }
};

//کتابخانه مربوط به دریافت نقشه
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const mapContainer = ref(null);
const map = ref(null);
const currentMarker = ref(null);
onMounted(() => {
  updateContainerClass();
  window.addEventListener('resize', updateContainerClass);
  if (mapContainer.value) {
    map.value = L.map(mapContainer.value).setView([35.6892, 51.3890], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map.value);
    map.value.on('click', function (e) {
      const {lat, lng} = e.latlng;
      currentAddress.value.lat = lat;
      currentAddress.value.lng = lng;
      if (currentMarker.value) map.value.removeLayer(currentMarker.value);
      currentMarker.value = L.marker([lat, lng]).addTo(map.value);
    });
  }
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateContainerClass);
});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  position: absolute;
}

.map-title {
  display: flex;
  padding: 9px 18px;
  background: rgb(255 255 255 / 79%);
  position: absolute;
  z-index: 10000;
  left: 0;
  right: 0;
}

.widget-title {
  display: none;
  gap: 8px;
  align-items: center;
  font-size: var(--font-size-lg);
}

.map-title-back {
  position: absolute;
}

.map-title-text {
  margin: 0 auto;
}

.form-title {
  display: none;
  padding: 15px 15px 0 0;
}

.widget-content {
  padding: 0;
}

@media screen and (max-width: 576px) {
  .widget {
    margin: 0;
    padding: 0 !important;
  }
}

@media screen and (min-width: 576px) {
  .widget-title {
    display: flex;
  }

  .map-title {
    display: none;
  }

  .form-title {
    display: block;
  }

  .map-container {
    height: 50vh;
    position: relative;
  }
}

@media screen and (min-width: 992px) {

}
</style>