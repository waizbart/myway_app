import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import LocationAutocomplete from "../../components/LocationAutocomplete";
import MapView from "../../components/MapComponent";
import { Box, Button, IconButton, Input, Modal, Text, useToast } from "native-base";
import { colors } from "../../styles/colors";
import { AntDesign } from '@expo/vector-icons';
import { createRoute } from "../../services";

interface Coordinate {
  latitude: number;
  longitude: number;
}

export default function CreateRoute({ navigation }: any) {
  const [startPoint, setStartPoint] = useState<Coordinate>();
  const [endPoint, setEndPoint] = useState<Coordinate>();
  const [routeCoordinates, setRouteCoordinates] = useState<Coordinate[]>();
  const [openModal, setOpenModal] = useState(false);
  const [routeName, setRouteName] = useState("");

  const toast = useToast();

  const saveRoute = async () => {
    try {
      await createRoute({
        name: routeName, 
        coordinates: routeCoordinates as Coordinate[]
      });

      setOpenModal(false);
      navigation.goBack();

      toast.show({
        render: () => (
          <Box bg={colors.greenAlert} px={4} py={3} rounded="md" mb={5}>
            <Text color={colors.white} fontFamily={'Poppins_500Medium'}>
              Rota salva com sucesso!
            </Text>
          </Box>
        )
      })
    } catch (error) {
      toast.show({
        render: () => (
          <Box bg={colors.redAlert} px={4} py={3} rounded="md" mb={5}>
            <Text color={colors.white} fontFamily={'Poppins_500Medium'}>
              Erro ao salvar rota.
            </Text>
          </Box>
        )
      })
    }
  }

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
        <Button
          onPress={() => {
            setOpenModal(true);
          }}
          position={"absolute"}
          bottom={3}
          alignSelf={"center"}
          w={"60%"}
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
      )}

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Content>
          <Modal.Body>
            <Text
              fontFamily="Poppins_600SemiBold"
              fontSize={16}
              textAlign="center"
              mb={4}
            >
              Digite um nome para a sua rota:
            </Text>
            <Input
              placeholder="Escola, trabalho, etc..."
              borderRadius={10}
              borderWidth={1}
              _focus={{ borderColor: colors.green }}
              _input={{
                fontFamily: "Poppins_500Medium",
                color: colors.black,
                fontSize: 14,
              }}
              mb={4}
              onChangeText={(text) => setRouteName(text)}
            />
          </Modal.Body>
          <Modal.Footer
            justifyContent="center"
          >
            <Button
              disabled={routeName === ""}
              bg={routeName === "" ? colors.lightGrey : colors.green}
              borderRadius={15}
              p={3}
              w={'50%'}
              onPress={saveRoute}
              _text={{
                color: colors.white,
                fontSize: 14,
                fontFamily: "Poppins_600SemiBold"
              }}
              _pressed={{
                bg: colors.darkGreen
              }}
            >
              SALVAR
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
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
