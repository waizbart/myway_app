import React, { useEffect } from "react";
import { Center, Box, Heading, VStack, FormControl, Input, Link, Button, HStack, Text, useToast } from "native-base";
import { colors } from "../styles/colors";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

const Login = ({ navigation }: any) => {
  const { register, setValue, handleSubmit } = useForm()
  const { handleLogin, isLoading } = useAuth()

  const toast = useToast()

  useEffect(() => {
    register('login')
    register('password')
  }, [register])

  const onSubmit = async (data: any) => {
    try {
      await handleLogin(data.login, data.password)
    } catch (error) {
      toast.show({
        render: () => (
          <Box bg={colors.redAlert} px={4} py={3} rounded="md" mb={5}>
            <Text color={colors.white} fontFamily={'Poppins_500Medium'}>
              Usuário ou senha incorretos.
            </Text>
          </Box>
        )
      })
    }
  }

  return (
    <Center w="100%" h="100%" bg={"black"}>
      <Box safeArea p="2" py="8" w="90%">
        <Heading size="lg" fontWeight="600" color="white">
          Login
        </Heading>
        <Heading mt="1" color="coolGray.400" fontWeight="medium" size="xs">
          Faça login para continuar!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Usuário</FormControl.Label>
            <Input
              onChangeText={(text) => {
                setValue('login', text)
              }}
              _input={{
                placeholderTextColor: colors.grey,
                color: "white"
              }}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Senha</FormControl.Label>
            <Input
              type="password"
              onChangeText={(text) => {
                setValue('password', text)
              }}
              _input={{
                placeholderTextColor: colors.grey,
                color: "white"
              }}
            />
          </FormControl>
          <Button mt="2" bg={colors.green} _text={{
            color: "black"
          }}
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
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

