<template>
    <div>
        <h2>Bluetooth Devices</h2>
        <ul>
            <li v-for="device in devices" :key="device.id">
                {{ device.name }}
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
        }
    },
    methods: {
        connectToDevice(device) {
            // Implementiere hier den Code, um eine Verbindung zu dem ausgewählten Gerät herzustellen.
        },
    },
}
</script>  