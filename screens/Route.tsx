import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import LocationAutocomplete from '../components/LocationAutocomplete';

export default function Route() {
    return (
        <View style={styles.container}>
            <View style={styles.inputs}>
                <View style={styles.input} >
                    <LocationAutocomplete placeholder='Origem' />
                </View>
                <View style={styles.input} >
                    <LocationAutocomplete placeholder='Destino' />
                </View>
            </View>
            <MapView
                style={styles.map}
                userInterfaceStyle={'dark'}
                showsUserLocation
                showsMyLocationButton
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    map: {
        width: '100%',
        height: '80%'
    },
    inputs: {
        backgroundColor: '#000',
        position: 'absolute',
        height: '20%',
        zIndex: 1,
        width: '100%',
        padding: 16,
        top: 0
    },
    input: {
        marginBottom: 56
    }
});
