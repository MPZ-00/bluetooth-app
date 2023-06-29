<template>
    <div>
        <div>
            {{ getDeviceName(device) }}
            <button v-if="!device.name" @click="setDeviceName" class="info">Set Name</button>
            <button v-if="!device.connected" @click="connectToDevice" class="success">Connected</button>
            <button v-else @click="disconnectFromDevice" class="danger">Disconnect</button>
            <button @click="deleteDevice" class="danger">Remove</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        device: Object,
    },
    methods: {
        getDeviceName() {
            return this.device.name || 'No Name'
        },
        setDeviceName() {
            let newName = prompt('Enter new device name')
            if (newName) {
                this.$emit('set-name', this.device, newName)
            }
        },
        disconnectFromDevice() {
            this.$emit('disconnect', this.device)
        },
        connectToDevice() {
            this.$emit('connect', this.device)
        },
        deleteDevice() {
            if (!confirm('Are you sure you want to remove this device?')) return
            this.$emit('remove', this.device)
        }
    },
}
</script>