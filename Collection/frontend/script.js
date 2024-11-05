// const openMediaDevices = async (constraints) => {
// 	return await navigator.mediaDevices.getUserMedia(constraints);
// };

// try {
// 	const stream = openMediaDevices({ video: false, audio: true });
// 	console.log("Got MediaStream:", stream);
// } catch (error) {
// 	console.error("Error accessing media devices.", error);
// }


// async function getConnectedDevices(type) {
//   const devices = await navigator.mediaDevices.enumerateDevices();
//   return devices.filter(device => device.kind === type)
// }

// const videoCameras = getConnectedDevices('videooutput');
// console.log('Cameras found:', videoCameras);

const localConnection = new RTCPeerConnection()

console.log(localConnection);
