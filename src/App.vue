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
            <BluetoothCommunication />
        </section>
        <section>
            <BluetoothSendRetrieve />
        </section>
        <section>
            <br>
            <hr />
            <BatteryDevice />
        </section>
    </main>

    <FooterVue />
</template>  

<script>
import BluetoothDevices from './components/BluetoothDevices.vue'
import FooterVue from './components/FooterVue.vue'
import NavComponent from './components/NavComponent.vue'
import BluetoothCommunication from './components/BluetoothCommunication.vue'
import BluetoothSendRetrieve from './components/BluetoothSendRetrieve.vue'
import BatteryDevice from './components/BatteryDevice.vue'

export default {
    name: 'App',
    components: {
        BluetoothDevices,
        FooterVue,
        NavComponent,
        BluetoothCommunication,
        BluetoothSendRetrieve,
        BatteryDevice,
    },
    data() {
        return {
            savedDevices: [],
        }
    }
}
</script>
