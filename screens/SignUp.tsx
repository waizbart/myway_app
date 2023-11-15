import React, { useEffect } from "react";
import {
    Center,
    Box,
    Heading,
    VStack,
    FormControl,
    Input, Button,
    Checkbox,
    useToast,
    Text
} from "native-base";
import { colors } from "../styles/colors";
import { useForm } from "react-hook-form";
import { useAuth } from '../hooks/useAuth';

const SingUp = () => {
    const { register, setValue, handleSubmit } = useForm()
    const { handleSignUp, isLoading } = useAuth()

    const toast = useToast()

    useEffect(() => {
        register('login')
        register('name')
        register('email')
        register('phone')
        register('password')
        register('hasCar', { value: true })
    }, [register])

    const onSubmit = async (data: any) => {
        try {
            await handleSignUp(data)

            toast.show({
                render: () => (
                    <Box bg={colors.greenAlert} px={4} py={3} rounded="md" mb={5}>
                        <Text color={colors.white} fontFamily={'Poppins_500Medium'}>
                            Cadastro realizado com sucesso! Faça login para continuar.
                        </Text>
                    </Box>
                )
            })
        } catch (error: any) {
            console.log({ error })
            toast.show({
                render: () => (
                    <Box bg={colors.redAlert} px={4} py={3} rounded="md" mb={5}>
                        <Text color={colors.white} fontFamily={'Poppins_500Medium'}>
                            Erro ao cadastrar. Tente novamente.
                        </Text>
                    </Box>
                )
            })
        }
    }

    return <Center w="100%" bg="black" h="100%">
        <Box safeArea p="2" w="90%" py="8">
            <Heading size="lg" color="white" fontWeight="semibold">
                Cadastre-se
            </Heading>
            <Heading mt="1" color="coolGray.400" fontWeight="medium" size="xs">
                Insira seus dados para criar uma conta!
            </Heading>
            <VStack space={3} mt="5">
                <FormControl>
                    <FormControl.Label>Usuário</FormControl.Label>
                    <Input
                        type="text"
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
                    <FormControl.Label>Nome Completo</FormControl.Label>
                    <Input
                        type="text"
                        onChangeText={(text) => {
                            setValue('name', text)
                        }}
                        _input={{
                            placeholderTextColor: colors.grey,
                            color: "white"
                        }}
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Telefone</FormControl.Label>
                    <Input
                        type="text"
                        onChangeText={(text) => {
                            setValue('phone', text)
                        }}
                        _input={{
                            placeholderTextColor: colors.grey,
                            color: "white"
                        }}
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input
                        type="text"
                        onChangeText={(text) => {
                            setValue('email', text)
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

                <FormControl>
                    <Checkbox
                        value="green"
                        _checked={{
                            bg: colors.green,
                            color: "black"
                        }}
                        size="md"
                        defaultIsChecked
                        _text={{
                            fontSize: 15,
                            color: "coolGray.400"
                        }}
                        onChange={(checked) => {
                            setValue('hasCar', checked)
                        }}
                    >
                        Possuo automóvel
                    </Checkbox>
                </FormControl>


                <Button
                    mt="2"
                    bg={colors.green}
                    _text={{
                        color: "black"
                    }}
                    onPress={handleSubmit(onSubmit)}
                    isLoading={isLoading}
                >
                    Cadastrar
                </Button>
            </VStack>
        </Box>
    </Center>;
};


export default SingUp;