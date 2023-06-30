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

        <button @click.prevent="onStartButtonClick" class="success">Search</button>
        <button @click.prevent="onStopButtonClick" class="danger">Stop</button>
    </form>

    <hr />

    <BluetoothSendRetrieve v-if="myCharacteristic" :characteristic="myCharacteristic" />
</template>
<script>
import characteristicsList from '../utils/charasteristics.js'
import servicesList from '../utils/services.js'
import { connectToBluetoothDevice } from '../utils/bluetoothUtils.js'
import BluetoothSendRetrieve from './BluetoothSendRetrieve.vue'

export default {
    components: {
        BluetoothSendRetrieve,
    },
    data() {
        return {
            service: '',
            characteristic: '',
            myCharacteristic: null,
            servicesList,
            characteristicsList,
            isConnected: false,
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
        async onStartButtonClick() {
            let serviceUuid = this.service.startsWith('0x') ? parseInt(this.service) : this.service

            try {
                console.log('Requesting Bluetooth Device...')
                const gattServer = await connectToBluetoothDevice(serviceUuid);
                console.log('Connected to GATT Server:', gattServer);

                console.log('Getting Service...')
                const service = await gattServer.getPrimaryService(serviceUuid);

                let characteristicUuid = this.characteristic.startsWith('0x') ? parseInt(this.characteristic) : this.characteristic
                console.log('Getting Characteristic...')
                const characteristic = await service.getCharacteristic(characteristicUuid);

                this.myCharacteristic = characteristic
                return this.myCharacteristic.startNotifications().then(() => {
                    console.log('> Notifications started')
                    this.myCharacteristic.addEventListener('characteristicvaluechanged', this.handleNotifications)
                    this.isConnected = true
                })
            } catch (error) {
                console.error('Argh! ' + error)
            }
        },
        onStopButtonClick() {
            if (this.myCharacteristic) {
                this.myCharacteristic.stopNotifications()
                    .then(() => {
                        console.log('> Notifications stopped')
                        this.myCharacteristic.removeEventListener('characteristicvaluechanged', this.handleNotifications)
                    })
                    .then(() => {
                        this.isConnected = false
                    })
                    .catch(error => {
                        console.log('Argh! ' + error)
                    })
            }
        }
    }
}
</script>
