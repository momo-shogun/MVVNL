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

// No Mapbox token needed
MapLibreGL.setAccessToken(null)

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
        <View style={styles.container}>
            <MapLibreGL.MapView style={styles.map}>
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    infoBox: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        elevation: 5,
    },
    infoText: { fontSize: 16, textAlign: 'center' },
})

export default PunchScreen
