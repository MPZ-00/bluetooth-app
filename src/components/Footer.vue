<template>
    <footer>
        <a id="copyright" href="https://discord.com/invite/DXWuZUBW2C" target="_blank" rel="noreferrer">
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