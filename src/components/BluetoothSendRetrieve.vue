<template>
    <div>
        <input type="text" v-model="inputText" placeholder="Enter text to send...">
        <button @click="sendData">Send Data</button>
        <p>Received Data: {{ receivedText }}</p>
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
    mounted() {
        this.receiveData()
    },
}
</script>
  