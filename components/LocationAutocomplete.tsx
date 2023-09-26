import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const LocationAutocomplete = ({
    placeholder,
    setPoint,
}: {
    placeholder: string;
    setPoint: any;
}) => {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder={placeholder}
        onPress={(data, details = null) => {
          setPoint({
            latitude: details?.geometry.location.lat,
            longitude: details?.geometry.location.lng,
          });
        }}
        query={{
          key: 'AIzaSyB48pzmebzqdVs2iZ42RovuI6224UOLWMA',
          language: 'pt-BR',
        }}
        styles={{
          textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
          listView: styles.listView,
        }}
        fetchDetails
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputContainer: {
    width: '100%',
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
  },
  listView: {
    position: 'absolute',
    top: 40,
    backgroundColor: '#000',
    zIndex: 1,
  },
});

export default LocationAutocomplete;
