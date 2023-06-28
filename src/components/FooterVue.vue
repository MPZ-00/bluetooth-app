<template>
    <footer>
        <a id="copyright" href="https://github.com/MPZ-00/bluetooth-app" target="_blank" rel="noreferrer">
            Copyright ©️ Martin Prätzlich 2023 - {{ year }} BluetoothApp
        </a>
    </footer>
</template>
  
<script>
export default {
    data() {
        return {
            year: new Date().getFullYear()
        }
    }
}
</script>

<style scoped>
a {
    color: var(--color-info);
    text-decoration: none;
}
</style>