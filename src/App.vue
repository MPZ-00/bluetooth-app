<template>
    <div id="app">
        <header>
            <img alt="Vue logo" src="./assets/logo.png">
        </header>

        <aside>
        </aside>

        <main>
            <BluetoothDevices />
        </main>

        <footer>
            <FooterVue />
        </footer>
    </div>
</template>  

<script>
import BluetoothDevices from './components/BluetoothDevices.vue'
import FooterVue from './components/FooterVue.vue';

export default {
    name: 'App',
    components: {
        BluetoothDevices,
        FooterVue
    }
}
</script>
