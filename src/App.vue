<template>
    <div id="app">
        <header>
            <img alt="Vue logo" src="./assets/logo.png">
        </header>

        <aside>
            <ConnectDevice />
        </aside>

        <main>
            <BluetoothDevices :devices="savedDevices" />
        </main>

        <FooterVue />
    </div>
</template>  

<script>
import BluetoothDevices from './components/BluetoothDevices.vue'
import FooterVue from './components/FooterVue.vue'
import ConnectDevice from './components/ConnectDevice.vue'

export default {
    name: 'App',
    components: {
        BluetoothDevices,
        FooterVue,
        ConnectDevice
    },
    data() {
        return {
            savedDevices: [],
        }
    }
}
</script>
