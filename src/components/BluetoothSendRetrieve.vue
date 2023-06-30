<template>
    <div>
        <button v-if="isConnected">Connected to {{ characteristic.uuid }}</button>
        <button v-else>Not connected</button>
        <br>
        <br>

        <input type="text" v-model="inputText" placeholder="Enter text to send...">
        <button v-if="isConnected" @click="sendData">Send Data</button>
        <button v-else disabled class="danger">Send Data</button>

        <button v-if="isConnected" @click="receiveData">Receive Data</button>
        <br>

        <h3>Received Data:</h3>
        <input type="text" v-model="receivedText" placeholder="Received Data:" readonly />
    </div>
</template>
  
<script>
import { sendDataToBluetoothDevice, receiveDataFromBluetoothDevice } from '../utils/bluetoothUtils'

export default {
    data() {
        return {
            inputText: '',
            receivedText: '',
        }
    },
    methods: {
        async sendData() {
            try {
                await sendDataToBluetoothDevice(this.inputText)
            } catch (error) {
                console.error('Error sending data:', error)
            }
        },
        async receiveData() {
            try {
                this.receivedText = await receiveDataFromBluetoothDevice()
            } catch (error) {
                console.error('Error receiving data:', error)
            }
        },
    },
    props: {
        characteristic: {
            type: Object,
            required: false,
        },
        isConnected: {
            type: Boolean,
            required: false,
        },
    },
    watch: {
        isConnected() {
            this.receivedText = ''
        },
    },
}
</script>

<style scoped>
p {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
}
</style>