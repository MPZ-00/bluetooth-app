<template>
    <div>
        <h2>Bluetooth Devices</h2>
        <button @click="refresh">Refresh Devices</button>
        <ul>
            <li v-for="device in devices" :key="device.id">
                {{ getDeviceName(device) }}
                <button v-if="!deviceNames[device.id]" @click="setDeviceName(device)">Set Name</button>
                <button @click="connectToDevice(device)">Connect</button>
            </li>
        </ul>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            devices: [],
            deviceNames: {}, // Fix: Corrected the property name
        }
    },
    methods: {
        connectToDevice(device) {
            console.log('connectToDevice', device)
            // Implementiere hier den Code, um eine Verbindung zu dem ausgewählten Gerät herzustellen.
        },
        async refresh() {
            let requestedDevice = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
            })
            console.log('requestedDevice', requestedDevice)

            if (!this.devices.find(device => device.id === requestedDevice.id)) {
                this.devices.push(requestedDevice)
            }
        },
        setDeviceName(device) {
            let newName = prompt('Enter new device name')
            if (newName) {
                this.deviceNames[device.id] = newName;
            }
        },
        getDeviceName(device) {
            return this.deviceNames[device.id] || 'No Name'
        },
    },
}
</script>