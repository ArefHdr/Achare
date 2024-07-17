import {defineStore} from "pinia";
import axios from "axios";

const useAddressStore = defineStore('addressStore', {
    state() {
        return {
            addresses: [],
            newAddress: {}, //اطلاعاتی که در صفحه ورود مشخصات و map ارسال میشود در این بخش ذخیره میشود
            passStatus: false, // بررسی وضعیت تایید اطلاعات و ورود به صفحه confirm-information
        }
    },
    getters: {
        getAddresses(state) {
            return state.addresses
        },
        getNewAddress(state) {
            return state.newAddress
        },
        getPassStatus(state) {
            return state.passStatus
        }
    },
    actions: {
        async fetchAddresses() {
            try {
                const response = await axios.get('https://stage.achareh.ir/api/karfarmas/address', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4'
                    }
                });
                this.addresses = response.data;

            } catch (error) {
                alert('خطایی رخ داده است صفحه بطور خودکار رفرش خواهد شد')
                setInterval(() => {
                    history.go(0)
                }, 4000)
            }
        },
        addNewAddressInfo(formData) {
            this.newAddress = formData
        },
        async setNewAddress(formData) {
            try {
                const response = await axios.post(
                    'https://stage.achareh.ir/api/karfarmas/address',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4'
                        }
                    }
                );
                this.passStatus = true;
            } catch (error) {
                alert("خطایی رخ داده است لطفا بعدا تلاش کنید");
            }
        }
    }
})
export default useAddressStore