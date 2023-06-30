import axios from 'axios'
const PORT = process.env.VUE_APP_PORT || 3000

export async function fetchDevices() {
    try {
        const response = await axios.get(`http://localhost:${PORT}/devices`)
        return response.data || []
    } catch (error) {
        console.error('Error fetching devices:', error)
    }
}

export async function saveDevice(device, devices) {
    const connectedDevice = {
        name: getDeviceName(device),
        id: device.id,
        connected: false
    }

    // Check if the device is already in the list
    const existingDevice = devices.find(d => d.id === connectedDevice.id)

    if (existingDevice) {
        // If the device already exists, update it
        try {
            const response = await axios.put(`http://localhost:${PORT}/devices/${connectedDevice.id}`, connectedDevice)
            const updatedDevice = response.data

            const index = devices.findIndex(d => d.id === updatedDevice.id)
            devices.splice(index, 1, updatedDevice)
        } catch (error) {
            console.error('Error updating device:', error)
        }
    } else {
        // If the device does not exist yet, add it
        try {
            const response = await axios.post(`http://localhost:${PORT}/devices`, connectedDevice)
            const newDevice = response.data

            devices.push(newDevice)
        } catch (error) {
            console.error('Error adding device:', error)
        }
    }
}

export function getDeviceName(device) {
    return device.name || 'No Name'
}

export async function connectToBluetoothDevice(service) {
    const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [service || '0000ffe0-0000-1000-8000-00805f9b34fb']
    })

    console.log(device)
    device.gatt.connect()
    return device
}

let myCharacteristic // Saves the characteristic for later use.

export async function sendDataToBluetoothDevice(text) {
    let encoder = new TextEncoder('utf-8')
    let data = encoder.encode(text)
    await myCharacteristic.writeValue(data)
}

export async function receiveDataFromBluetoothDevice() {
    await myCharacteristic.startNotifications()
    myCharacteristic.addEventListener('characteristicvaluechanged', handleCharacteristicValueChanged)

    function handleCharacteristicValueChanged(event) {
        let value = event.target.value
        let decoder = new TextDecoder('utf-8')
        let text = decoder.decode(value)
        return text
    }
}