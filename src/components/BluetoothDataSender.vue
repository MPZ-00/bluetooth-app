<template>
    <form>
        <input v-model="service" type="text" list="services" autofocus placeholder="Bluetooth Service">
        <datalist id="services">
            <option v-for="service in servicesList" :value="service" :key="service">
                {{ service }}
            </option>
        </datalist>

        <input v-model="characteristic" type="text" list="characteristics" placeholder="Bluetooth Characteristic">
        <datalist id="characteristics">
            <option v-for="characteristic in characteristicsList" :value="characteristic" :key="characteristic">
                {{ characteristic }}
            </option>
        </datalist>

        <button @click.prevent="onStartButtonClick">Start notifications</button>
        <button @click.prevent="onStopButtonClick">Stop notifications</button>
    </form>
</template>
<script>
import characteristicsList from '../utils/charasteristics.js'
import servicesList from '../utils/services.js'

export default {
    name: 'BluetoothDataSender',
    data() {
        return {
            service: '',
            characteristic: '',
            myCharacteristic: null,
            servicesList,
            characteristicsList
        }
    },
    methods: {
        async sendData() {
            console.log('sending data')
            this.service = await this.server.getPrimaryService('battery_service')
            this.characteristic = await this.service.getCharacteristic('battery_level')

            var data = new TextEncoder().encode('Hello, Bluetooth!')

            await this.characteristic.writeValue(data)
        },
        handleNotifications(event) {
            let value = event.target.value
            let a = []
            for (let i = 0; i < value.byteLength; i++) {
                a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2))
            }
            console.log('> ' + a.join(' '))
        },
        onStartButtonClick() {
            let serviceUuid = this.service.startsWith('0x') ? parseInt(this.service) : this.service
            let characteristicUuid = this.characteristic.startsWith('0x') ? parseInt(this.characteristic) : this.characteristic

            console.log('Requesting Bluetooth Device...')
            navigator.bluetooth.requestDevice({ filters: [{ services: [serviceUuid] }] })
                .then(device => {
                    console.log('Connecting to GATT Server...')
                    return device.gatt.connect()
                })
                .then(server => {
                    console.log('Getting Service...')
                    return server.getPrimaryService(serviceUuid)
                })
                .then(service => {
                    console.log('Getting Characteristic...')
                    return service.getCharacteristic(characteristicUuid)
                })
                .then(characteristic => {
                    this.myCharacteristic = characteristic
                    return this.myCharacteristic.startNotifications().then(() => {
                        console.log('> Notifications started')
                        this.myCharacteristic.addEventListener('characteristicvaluechanged', this.handleNotifications)
                    })
                })
                .catch(error => {
                    console.error('Argh! ' + error)
                })
        },
        onStopButtonClick() {
            if (this.myCharacteristic) {
                this.myCharacteristic.stopNotifications()
                    .then(() => {
                        console.log('> Notifications stopped')
                        this.myCharacteristic.removeEventListener('characteristicvaluechanged', this.handleNotifications)
                    })
                    .catch(error => {
                        console.log('Argh! ' + error)
                    })
            }
        }
    }
}
</script>
