<template>
    <header>
        <img alt="Vue logo" src="./assets/logo_bt.png">
    </header>

    <aside>
        <NavComponent />
    </aside>
    <main>
        <section>
            <BluetoothDevices :devices="savedDevices" />
        </section>
        <section>
            <BluetoothDataSender />
        </section>
    </main>

    <FooterVue />
</template>  

<script>
import BluetoothDevices from './components/BluetoothDevices.vue'
import FooterVue from './components/FooterVue.vue'
import NavComponent from './components/NavComponent.vue'
import BluetoothDataSender from './components/BluetoothDataSender.vue'

export default {
    name: 'App',
    components: {
        BluetoothDevices,
        FooterVue,
        NavComponent,
        BluetoothDataSender,
    },
    data() {
        return {
            savedDevices: [],
        }
    }
}
</script>
