// import { View, Text, Alert, StyleSheet } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import {
//     Camera,
//     useCameraDevice,
//     useCameraPermission,
// } from 'react-native-vision-camera'

// export default function PunchScreen() {
//     const { hasPermission, requestPermission } = useCameraPermission()
//     const device = useCameraDevice('back')
//     const [permissionGranted, setPermissionGranted] = useState(false)
//     useEffect(() => {
//         ;(async () => {
//             const permission = await requestPermission()
//             setPermissionGranted(true)
//         })()
//     }, [])

//     if (!permissionGranted) {
//         return Alert.alert(
//             'Permission Required',
//             'Camera permission is needed.'
//         )
//     }
//     if (device == null) return <NoCameraErrorView />
//     return (
//         <View>
//             <Text>PunchScreen</Text>
//             <Camera
//                 style={StyleSheet.absoluteFill}
//                 device={device}
//                 isActive={true}
//             />
//         </View>
//     )
// }

import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { Image } from 'react-native'
import {
    Camera,
    useCameraDevice,
    useCameraDevices,
} from 'react-native-vision-camera'

const PunchScreen = () => {
    const cameraRef = useRef<Camera>(null)
    const device = useCameraDevice('back')
    const [hasPermission, setHasPermission] = useState(false)
    const [photoPath, setPhotoPath] = useState<string | null>(null)

    useEffect(() => {
        ;(async () => {
            const permission = await Camera.requestCameraPermission()
            setHasPermission(true)
        })()
    }, [])

    if (!device) return <Text>No camera found</Text>
    if (!hasPermission) return <Text>Waiting for camera permission...</Text>
    const takePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePhoto()
            console.log('Photo taken:', photo.path)
            setPhotoPath(`file://${photo.path}`)
            Alert.alert('Photo Captured', `Saved at: ${photo.path}`)
        }
    }
    return (
        <View style={styles.container}>
            {photoPath ? (
                <View style={styles.previewContainer}>
                    <Image
                        source={{ uri: photoPath }}
                        style={styles.previewImage}
                    />
                    <TouchableOpacity
                        onPress={() => setPhotoPath(null)}
                        style={styles.retakeButton}
                    >
                        <Text style={styles.buttonText}>Retake Photo</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <Camera
                        ref={cameraRef}
                        style={styles.camera}
                        device={device}
                        isActive
                        photo={true}
                    />
                    <TouchableOpacity onPress={takePhoto} style={styles.button}>
                        <Text style={styles.buttonText}>Take Photo</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'black' },
    camera: { flex: 1 },
    button: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 10,
    },
    buttonText: { color: 'white', fontSize: 16 },
    previewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    previewImage: { width: '90%', height: '80%', borderRadius: 10 },
    retakeButton: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 10,
    },
})

export default PunchScreen
