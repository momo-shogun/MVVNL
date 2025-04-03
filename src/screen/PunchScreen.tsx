// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
// import { StatusBar } from 'react-native';
// import { RNCamera } from 'react-native-camera'; // or 'react-native-vision-camera'
// import Geolocation from 'react-native-geolocation-service'; // For Location
// import { LineChart } from 'react-native-chart-kit';
// import { Dimensions } from 'react-native';
// import { ArrowLeft, MoreVertical, Phone, MessageSquare, Camera as CameraIcon, MapPin } from 'lucide-react-native';

// export default function Punch() {
//     const [hasPermission, setHasPermission] = useState(null);
//     const [cameraVisible, setCameraVisible] = useState(false);
//     const [photo, setPhoto] = useState(null);
//     const [location, setLocation] = useState(null);
//     const [distance, setDistance] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [punchedIn, setPunchedIn] = useState(false);

//     // Employee data
//     const employee = {
//         name: 'Chris Jonathan',
//         designation: 'General Manager',
//         experience: '4+ years experience',
//         averageWorkTime: '46 hours',
//         workTimeChange: '+0.5%',
//         profileImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OZsCVj8dRvjHrF6gzhx5gE1e6vNkd3.png',
//         targetLocation: {
//             latitude: 37.7749,
//             longitude: -122.4194,
//         }
//     };

//     const workHoursData = {
//         labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
//         datasets: [
//             {
//                 data: [7, 8, 6, 9, 8],
//                 color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
//                 strokeWidth: 2
//             }
//         ]
//     };

//     useEffect(() => {
//         (async () => {
//             // Request permissions for camera
//             const cameraStatus = await RNCamera.re;

//             // Request location permissions
//             Geolocation.requestAuthorization('whenInUse');
//             Geolocation.getCurrentPosition(
//                 (position) => {
//                     setLocation(position.coords);
//                     const dist = calculateDistance(
//                         position.coords.latitude,
//                         position.coords.longitude,
//                         employee.targetLocation.latitude,
//                         employee.targetLocation.longitude
//                     );
//                     setDistance(dist.toFixed(1));
//                     setLoading(false);
//                 },
//                 (error) => {
//                     console.error(error);
//                     setLoading(false);
//                 },
//                 { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//             );

//             setHasPermission(cameraStatus === 'granted');
//         })();
//     }, []);

//     const calculateDistance = (lat1, lon1, lat2, lon2) => {
//         const R = 6371; // Radius of the earth in km
//         const dLat = deg2rad(lat2 - lat1);
//         const dLon = deg2rad(lon2 - lon1);
//         const a =
//             Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//             Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//             Math.sin(dLon / 2) * Math.sin(dLon / 2);
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//         const d = R * c; // Distance in km
//         return d;
//     };

//     const deg2rad = (deg) => deg * (Math.PI / 180);

//     const handlePunchIn = async () => {
//         if (!location) {
//             Alert.alert('Error', 'Location data is not available');
//             return;
//         }

//         if (distance > 0.5) {
//             Alert.alert('Cannot Punch In', 'You are too far from the required location');
//             return;
//         }

//         if (!photo) {
//             Alert.alert('Photo Required', 'Please take a photo to verify your identity');
//             return;
//         }

//         // Simulate punch in success
//         Alert.alert('Success', 'You have successfully punched in!');
//         setPunchedIn(true);
//     };

//     const takePicture = async (camera) => {
//         if (camera) {
//             const data = await camera.takePictureAsync();
//             setPhoto(data.uri);
//             setCameraVisible(false);
//         }
//     };

//     if (loading) {
//         return (
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7f7f7' }}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//                 <Text style={{ marginTop: 16, color: '#6b6b6b' }}>Loading...</Text>
//             </View>
//         );
//     }

//     if (cameraVisible) {
//         return (
//             <View style={{ flex: 1 }}>
//                 <RNCamera
//                     style={{ flex: 1 }}
//                     type={RNCamera.Constants.Type.front}
//                     ref={(ref) => { this.camera = ref; }}
//                 >
//                     <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'center' }}>
//                         <TouchableOpacity
//                             style={{ position: 'absolute', bottom: 10, backgroundColor: 'white', borderRadius: 50, padding: 16 }}
//                             onPress={() => takePicture(this.camera)}
//                         >
//                             <CameraIcon size={24} color="#000" />
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             style={{ position: 'absolute', top: 10, left: 16, backgroundColor: 'white', borderRadius: 50, padding: 8 }}
//                             onPress={() => setCameraVisible(false)}
//                         >
//                             <ArrowLeft size={24} color="#000" />
//                         </TouchableOpacity>
//                     </View>
//                 </RNCamera>
//             </View>
//         );
//     }

//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
//             <StatusBar barStyle="dark-content" />

//             {/* Header */}
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: 'white' }}>
//                 <TouchableOpacity>
//                     <ArrowLeft size={24} color="#000" />
//                 </TouchableOpacity>
//                 <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Employee report</Text>
//                 <TouchableOpacity>
//                     <MoreVertical size={24} color="#000" />
//                 </TouchableOpacity>
//             </View>

//             <ScrollView style={{ flex: 1 }}>
//                 {/* Employee Profile Card */}
//                 <View style={{ margin: 16, backgroundColor: '#e0f7fa', borderRadius: 16, overflow: 'hidden' }}>
//                     <View style={{ height: 200, position: 'relative' }}>
//                         {photo ? (
//                             <Image source={{ uri: photo }} style={{ width: '100%', height: '100%' }} />
//                         ) : (
//                             <Image source={{ uri: employee.profileImage }} style={{ width: '100%', height: '100%' }} />
//                         )}
//                         <View style={{ position: 'absolute', top: 16, left: 16, backgroundColor: 'black', borderRadius: 50, padding: 8 }}>
//                             <Text style={{ color: 'white', fontWeight: '500' }}>{employee.experience}</Text>
//                         </View>
//                     </View>

//                     <View style={{ padding: 16 }}>
//                         <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>{employee.name}</Text>
//                         <Text style={{ color: '#555' }}>{employee.designation}</Text>

//                         <View style={{ flexDirection: 'row', marginTop: 16 }}>
//                             <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 50, backgroundColor: '#e0e0e0', alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
//                                 <Phone size={18} color="#333" />
//                             </TouchableOpacity>
//                             <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 50, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
//                                 <MessageSquare size={18} color="#fff" />
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </View>

//                 {/* Location Information */}
//                 <View style={{ margin: 16, backgroundColor: 'white', padding: 16, borderRadius: 12 }}>
//                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                         <MapPin size={18} color="#FF4500" />
//                         <Text style={{ marginLeft: 8, fontWeight: '500' }}>Location Status</Text>
//                     </View>

//                     {location ? (
//                         <View style={{ marginTop: 8 }}>
//                             <Text style={{ color: '#6b6b6b' }}>
//                                 Distance from required location:
//                                 <Text style={{ color: distance <= 0.5 ? 'green' : 'red', fontWeight: 'bold' }}>
//                                     {' '}{distance} km
//                                 </Text>
//                             </Text>
//                             {distance <= 0.5 ? (
//                                 <Text style={{ color: 'green', marginTop: 4 }}>You are within the allowed range</Text>
//                             ) : (
//                                 <Text style={{ color: 'red', marginTop: 4 }}>You need to be closer to punch in</Text>
//                             )}
//                         </View>
//                     ) : (
//                         <Text style={{ color: 'red', marginTop: 8 }}>Unable to determine location</Text>
//                     )}
//                 </View>

//                 {/* Work Time Stats */}
//                 <View style={{ margin: 16, backgroundColor: 'white', padding: 16, borderRadius: 12 }}>
//                     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//                         <Text style={{ color: '#6b6b6b' }}>Average work time</Text>
//                         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                             <Text style={{ color: 'green', marginRight: 4 }}>{employee.workTimeChange}</Text>
//                             <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center' }}>
//                                 <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: 'white' }} />
//                             </View>
//                         </View>
//                     </View>

//                     <Text style={{ fontSize: 32, fontWeight: 'bold', marginTop: 8 }}>{employee.averageWorkTime}</Text>

//                     <View style={{ marginTop: 16 }}>
//                         <LineChart
//                             data={workHoursData}
//                             width={Dimensions.get('window').width - 50}
//                             height={180}
//                             chartConfig={{
//                                 backgroundColor: '#ffffff',
//                                 backgroundGradientFrom: '#ffffff',
//                                 backgroundGradientTo: '#ffffff',
//                                 decimalPlaces: 0,
//                                 color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//                                 labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//                                 style: {
//                                     borderRadius: 16,
//                                 },
//                                 propsForDots: {
//                                     r: '6',
//                                     strokeWidth: '2',
//                                     stroke: '#ffa726',
//                                 },
//                             }}
//                             bezier
//                             style={{
//                                 marginVertical: 8,
//                                 borderRadius: 16,
//                             }}
//                         />
//                     </View>
//                 </View>

//                 {/* Action Buttons */}
//                 <View style={{ margin: 16, gap: 16 }}>
//                     <TouchableOpacity
//                         style={{ backgroundColor: '#2196F3', padding: 16, borderRadius: 16, alignItems: 'center' }}
//                         onPress={() => setCameraVisible(true)}
//                     >
//                         <Text style={{ color: 'white', fontWeight: '600' }}>Take Photo for Verification</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         style={{
//                             padding: 16,
//                             borderRadius: 16,
//                             alignItems: 'center',
//                             backgroundColor: punchedIn ? '#b0b0b0' : '#4caf50'
//                         }}
//                         onPress={handlePunchIn}
//                         disabled={punchedIn}
//                     >
//                         <Text style={{ color: 'white', fontWeight: '600' }}>
//                             {punchedIn ? 'Punched In' : 'Punch In'}
//                         </Text>
//                     </TouchableOpacity>
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// }

import { View, Text } from "react-native";
import React from "react";

export default function PunchScreen() {
  return (
    <View>
      <Text>PunchScreen</Text>
    </View>
  );
}
