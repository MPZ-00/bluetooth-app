<template>
    <header>
        <img alt="Vue logo" src="./assets/logo_bt.png">
    </header>

    <aside>
        <NavComponent />
    </aside>
    <main>
        <BluetoothDevices :devices="savedDevices" />
    </main>

    <FooterVue />
</template>  

<script>
import BluetoothDevices from './components/BluetoothDevices.vue'
import FooterVue from './components/FooterVue.vue'
import NavComponent from './components/NavComponent.vue'

export default {
    name: 'App',
    components: {
        BluetoothDevices,
        FooterVue,
        NavComponent,
    },
    data() {
        return {
            savedDevices: [],
        }
    }
}
</script>
