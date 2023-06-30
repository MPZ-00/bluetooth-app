<template>
    <div>
        <button @click="onButtonClick">Connect to Battery Device</button>
        <input v-if="isBatteryLevel" type="text" v-model="batteryLevel" placeholder="Battery Level" readonly />
    </div>
</template>
<script>
import { saveDevice } from '../utils/bluetoothUtils'

export default {
    methods: {
        data() {
            return {
                batteryLevel: null,
                isBatteryLevel: false,
            }
        },
        mounted() {
        },
        async onButtonClick() {
            try {
                console.info('Requesting Bluetooth Device...')
                const device = await navigator.bluetooth.requestDevice({
                    filters: [{ services: ['battery_service'] }]
                })

                saveDevice(device)

                console.log('Connecting to GATT Server...')
                const server = await device.gatt.connect()

                console.log('Getting Battery Service...')
                const service = await server.getPrimaryService('battery_service')

                console.log('Getting Battery Level Characteristic...')
                const characteristic = await service.getCharacteristic('battery_level')

                console.log('Reading Battery Level...')
                const value = await characteristic.readValue()

                console.log('> Battery Level is ' + value.getUint8(0) + '%')

                this.batteryLevel = value.getUint8(0)
                if (this.batteryLevel !== null && this.batteryLevel !== undefined) {
                    this.isBatteryLevel = true
                }
            } catch (error) {
                console.error('Error connecting to battery device:', error)
            }
        }
    }
}
</script>