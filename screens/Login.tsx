import React from "react";
import { Center, Box, Heading, VStack, FormControl, Input, Link, Button, HStack, Text } from "native-base";
import { colors } from "../styles/colors";

const Login = ({ navigation }: any) => {
  return (
    <Center w="100%" h="100%" bg={"black"}>
      <Box safeArea p="2" py="8" w="90%">
        <Heading size="lg" fontWeight="600" color="white">
          Login
        </Heading>
        <Heading mt="1" _dark={{
          color: "warmGray.200"
        }} color="coolGray.400" fontWeight="medium" size="xs">
          Faça login para continuar!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Usuário</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Senha</FormControl.Label>
            <Input type="password" />
            <Link _text={{
              fontSize: "xs",
              fontWeight: "500",
              color: colors.green
            }} alignSelf="flex-end" mt="1">
              Esqueci minha senha
            </Link>
          </FormControl>
          <Button mt="2" bg={colors.green} _text={{
            color: "black"
          }}
            onPress={() => navigation.navigate('Route')}
          >
            ENTRAR
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600" _dark={{
              color: "warmGray.200"
            }}>
              Não tem uma conta?{" "}
            </Text>
            <Link _text={{
              color: colors.green,
              fontWeight: "medium",
              fontSize: "sm"
            }} onPress={() => navigation.navigate('SignUp')}>
              Cadastre-se
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>);
};

export default Login;

