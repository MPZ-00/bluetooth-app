# Bluetooth App

This is a simple Bluetooth app that allows users to search for available Bluetooth devices, establish connections, and send files between their devices. The app is built using Vue.js, Node.js, and Express, and it utilizes the Web Bluetooth API to interact with Bluetooth devices.

## Getting Started

### Prerequisites

- Node.js: Make sure you have Node.js installed on your computer.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MPZ-00/bluetooth-app.git

```

2. Navigate to the project directory:
```bash
cd bluetooth-app

```

3. Install the dependencies:
```bash
npm install
```


4. Start the server:

```bash
npm run start
```


The app should now be running at `http://localhost:8080` and the server at `http://localhost:3000`.

## Usage

To use the app, open your web browser and navigate to `http://localhost:8080` on your computer and mobile device.

The app provides the following features:

- "Connect to Device" - Click this button to search for available Bluetooth devices.
- Displays a list of all devices that have been previously connected. You can also view the connection status and reconnect to a device.
- "Set Name" - Click this button to set a name for a device if the name is not available.
- "Connect" - Click this button to establish a connection to a device.

### Please note the following considerations when using the app:

- The app utilizes the Web Bluetooth API to interact with Bluetooth devices.
- The Web Bluetooth API does **not** allow direct connection to a Bluetooth device by specifying its address or ID. Instead, it initiates a user selection process through the `navigator.bluetooth.requestDevice` method to prioritize user privacy and prevent abuse.
- The device objects returned by the API cannot be serialized and stored in a database or server for later reconnection. To reconnect to a device, the `requestDevice` method needs to be called again, and the device must be selected from the list of paired devices.
- The functionality of Web Bluetooth depends on the permissions and implementation of the specific browser being used. Some browsers may store device information for future connection attempts, while others may not. Additionally, not all features are available in all browsers or platforms.

## Contributing

If you would like to contribute to this project, feel free to submit a pull request.

## License

This project is licensed under the BSL License. See the `LICENSE` file for details.

## Contact

Discord Server - Bits & Bytes <p align="left"> <a href="https://discord.com/invite/DXWuZUBW2C" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/discord.svg" width="64" height="64" /></a></p>

Project Link: https://github.com/MPZ-00/bluetooth-app
