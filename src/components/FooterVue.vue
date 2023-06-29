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

footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>