<template>
    <div>
        <button @click="sendData">Send Data</button>
    </div>
</template>
<script>

export default {
    name: 'BluetoothDataSender',
    data() {
        return {
            devices: null, // Das verbundene BT Gerät
            server: null,
            service: null,
            characteristic: null,
        }
    },
    methods: {
        async sendData() {
            console.log('sending data')
            this.service = await this.server.getPrimaryService('0000ffe0-0000-1000-8000-00805f9b34fb')
            this.characteristic = await this.service.getCharacteristic('0000ffe1-0000-1000-8000-00805f9b34fb')

            var data = new TextEncoder().encode('Hello, Bluetooth!')

            await this.characteristic.writeValue(data)
        }
    }
}
</script>
