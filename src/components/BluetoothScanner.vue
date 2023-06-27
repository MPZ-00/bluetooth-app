<template>
    <div>
        <button @click="scanDevices">Scan for Devices</button>
    </div>
</template>
  
<script>
import { ref } from 'vue'
import { useBluetooth } from '@vueuse/core'

export default {
    name: 'BluetoothScanner',
    setup() {
        const { devices, connect } = useBluetooth()
        devices.value = ref([]) // Initialisierung des devices-Objekts

        const scanDevices = () => {
            devices.value = [] // Clear previous devices
            connect.value = null // Clear previous connection
            // Start scanning for Bluetooth devices
            useBluetooth().scan()
        }

        return {
            scanDevices,
        }
    },
}
</script>