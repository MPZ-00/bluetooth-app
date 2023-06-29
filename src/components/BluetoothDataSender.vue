<template>
    <div>
        <button @click="sendData">Send Data</button>
    </div>
</template>
<script>

export default {
    name: 'BluetoothDataSender',
    methods: {
        sendData() {
            console.log('sendData')
        }
    }
}
</script>
