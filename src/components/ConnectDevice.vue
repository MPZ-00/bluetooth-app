<template>
    <button @click="connect">Gerät verbinden</button>
</template>
  
<script>
import { useBluetooth } from '@vueuse/core'

export default {
    setup() {
        const { isSupported, isAvailable, requestDevice } = useBluetooth()

        const connect = async () => {
            if (!isSupported.value || !isAvailable.value) {
                console.error('Bluetooth is not available')
                return
            }

            try {
                const device = await requestDevice()
                console.log('Connected to device:', device)
                // Verbindung zum Server senden, um das Gerät in der Datenbank zu speichern
            } catch (err) {
                console.error('Failed to connect:', err)
            }
        }

        return {
            connect
        }
    }
}
</script>  