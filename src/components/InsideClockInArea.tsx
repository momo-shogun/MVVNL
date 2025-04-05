import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function InsideClockInArea() {
    return (
        <View style={styles.infoBox}>
            <Text style={styles.infoText}>
                ✅ You are inside the clock-in area
            </Text>
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
