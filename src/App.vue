<template>
    <div id="app">
        <header>
            <img alt="Vue logo" src="./assets/logo.png">
            <HelloWorld msg="Welcome to Your Vue.js App" />
            <!-- Hier könnten Sie eine Navigationsleiste oder ein Logo platzieren -->
        </header>

        <aside>
            <!-- Hier könnten Sie eine Seitenleiste für zusätzliche Informationen oder Links platzieren -->
        </aside>

        <main>
            <BluetoothDevices />
        </main>

        <footer>
            <!-- Hier könnten Sie Copyright-Informationen oder Links zu Datenschutzrichtlinien platzieren -->
        </footer>
    </div>
</template>  

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
    name: 'App',
    components: {
        HelloWorld
    }
}
</script>
