import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Alert,
    Platform,
    PermissionsAndroid,
} from 'react-native'
import * as MapLibreGL from '@maplibre/maplibre-react-native'
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import InsideClockInArea from '../components/InsideClockInArea'
import OutsideClockInArea from '../components/OutsideClockInArea'
import { Button } from '../components/ui/Button'

const clockInCenter: [number, number] = [81.01536289492266, 26.870549056165867] // [lng, lat]

const radiusMeters = 200

const PunchScreen = () => {
    const cameraRef = useRef<MapLibreGL.CameraRef>(null)
    const [userLocation, setUserLocation] = useState<{
        latitude: number
        longitude: number
    } | null>(null)

    // Ask for location permission
    useEffect(() => {
        const requestLocationPermission = async () => {
            try {
                if (Platform.OS === 'android') {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                    )
                    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                        Alert.alert(
                            'Location Permission',
                            'Location access is required.'
                        )
                    }
                } else {
                    const res = await request(
                        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                    )
                    if (res !== RESULTS.GRANTED) {
                        Alert.alert(
                            'Location Permission',
                            'Location access is required.'
                        )
                    }
                }
            } catch (err) {
                console.warn(err)
            }
        }
        requestLocationPermission()
    }, [])

    // Calculate distance (Haversine)
    const getDistance = (loc1: any, loc2: any) => {
        const toRad = (value: number) => (value * Math.PI) / 180
        const R = 6371e3
        const dLat = toRad(loc2.latitude - loc1.latitude)
        const dLon = toRad(loc2.longitude - loc1.longitude)
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(loc1.latitude)) *
                Math.cos(toRad(loc2.latitude)) *
                Math.sin(dLon / 2) ** 2
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    }

    const isInArea =
        userLocation &&
        getDistance(userLocation, {
            latitude: clockInCenter[1],
            longitude: clockInCenter[0],
        }) <= radiusMeters

    return (
        <View className="flex-1">
            <MapLibreGL.MapView style={{ flex: 1 }}>
                <MapLibreGL.Camera
                    ref={cameraRef}
                    zoomLevel={15}
                    centerCoordinate={clockInCenter}
                />

                {/* Load OSM tiles */}
                <MapLibreGL.RasterSource
                    id="osm"
                    tileSize={256}
                    url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                >
                    <MapLibreGL.RasterLayer id="osmLayer" sourceID="osm" />
                </MapLibreGL.RasterSource>

                {/* User Location */}
                <MapLibreGL.UserLocation
                    visible={true}
                    onUpdate={(location) => {
                        const userCoords = {
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }
                        setUserLocation(userCoords)
                        cameraRef.current?.setCamera({
                            centerCoordinate: [
                                userCoords.longitude,
                                userCoords.latitude,
                            ],
                            zoomLevel: 15,
                            animationDuration: 1000,
                        })
                    }}
                />

                {/* 200m radius circle */}
                <MapLibreGL.ShapeSource
                    id="circleSource"
                    shape={{
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                geometry: {
                                    type: 'Point',
                                    coordinates: clockInCenter,
                                },
                                properties: {}, // ✅ Add this line
                            },
                        ],
                    }}
                >
                    <MapLibreGL.CircleLayer
                        id="circleLayer"
                        style={{
                            circleRadius: [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                0,
                                0,
                                20,
                                radiusMeters / 2, // radius scales with zoom
                            ],
                            circleColor: 'rgba(0,122,255,0.3)',
                            circleStrokeColor: 'rgba(0,122,255,1)',
                            circleStrokeWidth: 2,
                        }}
                    />
                </MapLibreGL.ShapeSource>

                {/* Custom pin image */}
                <MapLibreGL.Images
                    images={{ pin: require('../assets/pin.png') }}
                />
                <MapLibreGL.PointAnnotation
                    id="clockIn"
                    coordinate={clockInCenter}
                >
                    <Image
                        source={require('../assets/pin.png')}
                        style={{ width: 30, height: 30 }}
                        resizeMode="contain"
                    />
                </MapLibreGL.PointAnnotation>
            </MapLibreGL.MapView>
            <View className="mx-4 mt-6">
                {/* Info Box */}
                {userLocation ? (
                    isInArea ? (
                        <InsideClockInArea></InsideClockInArea>
                    ) : (
                        <OutsideClockInArea></OutsideClockInArea>
                    )
                ) : (
                    '📍 Getting your location...'
                )}

                <Text className="text-gray-500 font-medium mb-2">
                    MY PROFILE
                </Text>
                <View className="flex-row items-center">
                    {/* <Image
                        source={{ uri: '/placeholder.svg?height=50&width=50' }}
                        className="w-12 h-12 rounded-full bg-purple-200"
                    /> */}
                    <View className="ml-3">
                        <View className="flex-row items-center">
                            <Text className="font-bold text-base">
                                Tonald Drump
                            </Text>
                            <View className="ml-1 bg-blue-500 rounded-full p-0.5">
                                {/* <CheckCircle
                                    stroke="#fff"
                                    width={14}
                                    height={14}
                                /> */}
                            </View>
                        </View>
                        <Text className="text-gray-500 text-xs">
                            2 September 2024
                        </Text>
                        <Text className="text-gray-500 text-xs">
                            Lat 45.8334 Long 97987.576
                        </Text>
                    </View>
                </View>
            </View>

            {/* Schedule Section */}
            <View className="mx-4 mt-6">
                <Text className="text-gray-500 font-medium mb-2">SCHEDULE</Text>
                <View className="flex-row justify-between">
                    <View className="bg-gray-100 rounded-lg p-3 w-[48%]">
                        <Text className="text-gray-500 text-xs mb-1">
                            CLOCK IN
                        </Text>
                        <Text className="text-xl font-bold">09:00</Text>
                    </View>
                    <View className="bg-gray-100 rounded-lg p-3 w-[48%] flex-col items-end">
                        <Text className="text-gray-500 text-xs mb-1">
                            CLOCK OUT
                        </Text>
                        <Text className="text-xl font-bold">05:00</Text>
                    </View>
                </View>
            </View>

            {/* Clock In Button */}
            <View className="absolute bottom-3 left-0 right-0 items-center">
                <Button size="xl" className="bg-secondary-dark rounded-full">
                    <Text className="text-white font-bold text-lg">
                        Clock In
                    </Text>
                </Button>
            </View>
        </View>
    )
}

export default PunchScreen
