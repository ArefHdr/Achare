<template>
  <section class="widget-holder">
    <div class="widget" :class="containerClass">
      <div class="widget-title">
        <h3>ثبت آدرس</h3>
      </div>
      <div class="widget-content">
        <form class="widget-form">
          <div class="row widget-row">
            <div class="col-12">
              <p class="form-title">لطفا مشخصات و آدرس خود را وارد کنید</p>
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4">
              <div class="form-items">
                <label class="form-label">نام</label>
                <div class="form-input-box">
                  <input @input="validateFirstName" v-model="firstNameValue" class="form-input" type="text"
                         placeholder="مثال:عارف">
                  <i v-show="firstNameValue" @click="clearInput('firstNameValue')" class="bi bi-x-circle-fill"></i>
                </div>
                <div class="input-error" v-if="!isFirstNameValid">
                  <span>نام باید دارای 3 کاراکتر باشد</span>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4">
              <div class="form-items">
                <label class="form-label">نام و نام خانوادگی</label>
                <div class="form-input-box">
                  <input @input="validateLastName" v-model="lastNameValue" class="form-input" type="text"
                         placeholder="مثال:حیدری">
                  <i v-show="lastNameValue" @click="clearInput('lastNameValue')" class="bi bi-x-circle-fill"></i>
                </div>
                <div class="input-error" v-if="!isLastNameValid">
                  <span>نام خانوادگی باید دارای 3 کاراکتر باشد</span>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4">
              <div class="form-items">
                <label class="form-label">شماره تلفن همراه</label>
                <div class="form-input-box">
                  <input @input="validateMobile" v-model="mobileValue" class="form-input" type="text"
                         placeholder="مثال:09164330023">
                  <i v-show="mobileValue" @click="clearInput('mobileValue')" class="bi bi-x-circle-fill"></i>
                </div>
                <div class="input-error" v-if="!isMobileValid">
                  <span>شماره وارد شده صحیح نمیباشد</span>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4">
              <div class="form-items">
                <div class="phone-label d-flex justify-content-between">
                  <label class="form-label">شماره تلفن ثابت</label>
                  <span class="form-label">*با پیش شماره</span>
                </div>
                <div class="form-input-box">
                  <input @input="validatePhone" v-model="phoneValue" class="form-input" type="text"
                         placeholder="مثال:06643240206">
                  <i v-show="phoneValue" @click="clearInput('phoneValue')" class="bi bi-x-circle-fill"></i>
                </div>
                <div class="input-error" v-if="!isPhoneValid">
                  <span>شماره وارد شده صحیح نمیباشد</span>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-8">
              <div class="form-items">
                <label class="form-label">آدرس</label>
                <div class="form-input-box">
                  <input @input="validateAddress" v-model="addressValue" class="form-input" type="text">
                  <i v-show="addressValue" @click="clearInput('addressValue')" class="bi bi-x-circle-fill"></i>
                </div>
                <div class="input-error" v-if="!isAddressValid">
                  <span>آدرس باید حداقل 3 کاراکتر باشد</span>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="form-items">
                <div class="gender-form d-flex gap-4">
                  <div class="gender-title">
                    <span class="form-label">جنسیت</span>
                  </div>
                  <div class="gender-items d-flex gap-3">
                    <div class="d-flex gap-1">
                      <input type="radio" id="female" v-model="genderValue" value="female">
                      <label for="female">خانم</label>
                    </div>
                    <div class="d-flex gap-1">
                      <input type="radio" id="male" v-model="genderValue" value="male">
                      <label for="male">آقا</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <footer class="widget-footer">
      <div class="row">
        <div class="col-12">
          <div class="widget-submit">
            <base-button :disable-status="isDisable" @click="submitForm"></base-button>
          </div>
        </div>
      </div>
    </footer>
  </section>
</template>
<script setup>
import useAddressStore from "@/store/addresses.js";
import {computed, ref, onMounted, onBeforeUnmount} from "vue";
import BaseButton from "@/components/base/BaseButton.vue";
import router from "@/router";
import {isAuthenticated} from '@/router/index.js'

const addressStore = useAddressStore()
const firstNameValue = ref('')
const lastNameValue = ref('')
const mobileValue = ref('')
const phoneValue = ref('')
const addressValue = ref('')
const genderValue = ref('')
const isFirstNameValid = ref(true);
const isLastNameValid = ref(true);
const isMobileValid = ref(true);
const isPhoneValid = ref(true);
const isAddressValid = ref(true);

const validateFirstName = () => {
  isFirstNameValid.value = firstNameValue.value.length >= 3;
};

const validateLastName = () => {
  isLastNameValid.value = lastNameValue.value.length >= 3;
};

const validateMobile = () => {
  isMobileValid.value = mobileValue.value.length === 11 && /^09\d{9}$/.test(mobileValue.value);
};

const validatePhone = () => {
  isPhoneValid.value = phoneValue.value.length === 11 && /^\d+$/.test(phoneValue.value);
};

const validateAddress = () => {
  isAddressValid.value = addressValue.value.length >= 10;
};

const submitForm = () => {
  if (!isFormValid.value) return;
  isAuthenticated.value = true;
  const formData = ref({
    first_name: firstNameValue.value,
    last_name: lastNameValue.value,
    coordinate_mobile: mobileValue.value,
    coordinate_phone_number: phoneValue.value,
    address: addressValue.value,
    region: 1, // Always 1 for test as per your description
    lat: null,
    lng: null,
    gender: genderValue.value,
    address_id: "test",
    id: 1
  })
  addressStore.addNewAddressInfo(formData)
  router.push({path: '/address-registration/map'})
}

const isFormValid = computed(() => {
  return (
      isFirstNameValid.value &&
      isLastNameValid.value &&
      isMobileValid.value &&
      isPhoneValid.value &&
      isAddressValid.value &&
      !!genderValue.value
  );
});
const clearInput = (inputValue) => {
  eval(`${inputValue}.value = '';`);
}
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
</script>

<style scoped>
.form-title {
  font-size: 12px;
  color: var(--main-text-color);
}

.form-label {
  color: var(--main-text-color);
  font-size: var(--font-size-sm);
}

.form-input-box {
  width: 100%;
  border: 1px solid #D4D4D4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  padding: 12px 10px;
  max-height: 46px;
}

.form-input-box:focus-within {
  border: 1px solid #00BFA5
}

.form-input {
  width: 100%;
  font-size: var(--font-size-md);
}

.input-error {
  position: absolute;
  color: var(--error-color);
  font-size: var(--font-size-xsm);
}

.bi-x-circle-fill {
  color: #B6B6B6;
  cursor: pointer;
}

.widget-submit {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
}

@media screen and (min-width: 768px) {
  .form-title {
    font-size: var(--font-size-lg);
  }

  .form-label {
    font-size: var(--font-size-md);
  }

  .widget-submit {
    height: 84px;
  }
}
</style>