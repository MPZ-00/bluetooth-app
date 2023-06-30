<template>
    <form>
        <input v-model="service" type="text" list="services" autofocus placeholder="Bluetooth Service">
        <datalist id="services">
            <option v-for="service in servicesList" :value="service" :key="service">
                {{ service }}
            </option>
        </datalist>

        <input v-model="characteristic" type="text" list="characteristics" placeholder="Bluetooth Characteristic">
        <datalist id="characteristics">
            <option v-for="characteristic in characteristicsList" :value="characteristic" :key="characteristic">
                {{ characteristic }}
            </option>
        </datalist>

        <button @click.prevent="onStartButtonClick">Start notifications</button>
        <button @click.prevent="onStopButtonClick">Stop notifications</button>
    </form>
</template>
<script>
import characteristicsList from '../utils/charasteristics.js'
import servicesList from '../utils/services.js'

export default {
    name: 'BluetoothDataSender',
    data() {
        return {
            service: null,
            characteristic: null,
            myCharacteristic: null,
            servicesList,
            characteristicsList
        }
    },
    methods: {
        async sendData() {
            console.log('sending data')
            this.service = await this.server.getPrimaryService('battery_service')
            this.characteristic = await this.service.getCharacteristic('battery_level')

            var data = new TextEncoder().encode('Hello, Bluetooth!')

            await this.characteristic.writeValue(data)
        }
    }
}
</script>
