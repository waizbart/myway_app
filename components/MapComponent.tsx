import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { colors } from "../styles/colors";
import * as Location from "expo-location";
import { useToast, Box, Text } from "native-base";

interface Coordinate {
  latitude: number;
  longitude: number;
}

const MapComponent = ({
  startPoint,
  endPoint,
  setRouteCoordinates,
}: {
  startPoint?: Coordinate;
  endPoint?: Coordinate;
  setRouteCoordinates: any;
}) => {
  const toast = useToast();

  const [location, setLocation] = useState<Location.LocationObject>();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const onReady = (result: any) => {
    const routeCoordinates = result.coordinates;
    setRouteCoordinates(routeCoordinates);
  };

  const getRegion = () => {
    if (startPoint && endPoint) {
      const minLat = Math.min(startPoint.latitude, endPoint.latitude);
      const maxLat = Math.max(startPoint.latitude, endPoint.latitude);
      const minLng = Math.min(startPoint.longitude, endPoint.longitude);
      const maxLng = Math.max(startPoint.longitude, endPoint.longitude);

      const deltaLat = maxLat - minLat;
      const deltaLng = maxLng - minLng;

      return {
        latitude: (minLat + maxLat) / 2,
        longitude: (minLng + maxLng) / 2,
        latitudeDelta: deltaLat * 1.2,
        longitudeDelta: deltaLng * 1.2,
      };
    } else if (startPoint) {
      return {
        latitude: startPoint.latitude,
        longitude: startPoint.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    } else if (endPoint) {
      return {
        latitude: endPoint.latitude,
        longitude: endPoint.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    } else if (location) {
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    }
  };

  return (
    <MapView
      style={{
        width: "100%",
        height: "80%",
      }}
      userInterfaceStyle={"dark"}
      showsUserLocation
      showsMyLocationButton
      region={getRegion()}
    >
      {startPoint && (
        <Marker coordinate={startPoint} title="Origem" />
      )}
      {endPoint && <Marker coordinate={endPoint} title="Destino" />}

      {startPoint && endPoint && (
        <MapViewDirections
          origin={startPoint}
          destination={endPoint}
          apikey={"AIzaSyB48pzmebzqdVs2iZ42RovuI6224UOLWMA"}
          strokeWidth={5}
          strokeColor={colors.green}
          onReady={onReady}
          onError={(errorMessage) => {
            toast.show({
              render: () => (
                <Box bg={colors.redAlert} px={4} py={3} rounded="md" mb={5}>
                  <Text color={colors.white} fontFamily={"Poppins_500Medium"}>
                    Nenhum resultado encontrado para a rota selecionada.
                  </Text>
                </Box>
              ),
            });
          }}
        />
      )}
    </MapView>
  );
};

export default MapComponent;
