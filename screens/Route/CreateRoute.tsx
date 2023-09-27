import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import LocationAutocomplete from "../../components/LocationAutocomplete";
import MapView from "../../components/MapComponent";
import { Button, IconButton } from "native-base";
import { colors } from "../../styles/colors";
import { AntDesign } from '@expo/vector-icons';

interface Coordinate {
  latitude: number;
  longitude: number;
}

export default function CreateRoute({ navigation }: any) {
  const [startPoint, setStartPoint] = useState<Coordinate>();
  const [endPoint, setEndPoint] = useState<Coordinate>();
  const [routeCoordinates, setRouteCoordinates] = useState<Coordinate[]>();

  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <IconButton
          icon={<AntDesign name="arrowleft" size={30} color={colors.white} />}
          variant="unstyled"
          onPress={() => {
            navigation.goBack()
          }}
          alignSelf={'flex-start'}
          mb={4}
        />
        <View style={styles.input}>
          <LocationAutocomplete placeholder="Origem" setPoint={setStartPoint} />
        </View>
        <View style={styles.input}>
          <LocationAutocomplete placeholder="Destino" setPoint={setEndPoint} />
        </View>
      </View>

      <MapView
        startPoint={startPoint}
        endPoint={endPoint}
        setRouteCoordinates={setRouteCoordinates}
      />

      {routeCoordinates && (
        <View
          style={{
            position: "absolute",
            bottom: 10,
            width: "60%",
            padding: 16,
            alignSelf: "center",
          }}
        >
          <Button
            onPress={() => {
              console.log(routeCoordinates);
            }}
            w={"80%"}
            bg={colors.black}
            borderRadius={10}
            borderColor={colors.green}
            borderWidth={1}
            _text={{
              color: colors.green,
              fontSize: 16,
              fontFamily: "Poppins_500Medium",
            }}
            _pressed={{ bg: colors.darkGreen }}
            fontFamily="Poppins_500Medium"
          >
            SALVAR ROTA
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "80%",
  },
  inputs: {
    backgroundColor: "#000",
    zIndex: 1,
    width: "100%",
    padding: 16,
  },
  input: {
    marginBottom: 56,
  },
});
