<template>
    <div>
        <button @click="searchDevices">Search Devices</button>
        <ul>
            <li v-for="device in savedDevices" :key="device.id">
                {{ device.name }}
                <button @click="connectToDevice(device)">Reconnect</button>
            </li>
        </ul>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            savedDevices: [],
        }
    },
    methods: {
        searchDevices() {
            // Implementiere hier den Code, um nach verfügbaren Bluetooth-Geräten zu suchen.
            // Aktualisiere die "devices"-Daten in der "BluetoothDevices"-Komponente mit den gefundenen Geräten.
        },
        connectToDevice(device) {
            // Implementiere hier den Code, um eine Verbindung zu dem ausgewählten Gerät herzustellen.
        },
    },
}
</script>  