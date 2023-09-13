import React from "react";
import { Center, Box, Heading, VStack, FormControl, Input, Button, Checkbox } from "native-base";


const SingUp = () => {
    return <Center w="100%">
        <Box safeArea p="2" w="90%"  py="8">
            <Heading size="lg" color="coolGray.800" _dark={{
                color: "warmGray.50"
            }} fontWeight="semibold">
                MyWay
            </Heading>
            <Heading mt="1" color="coolGray.600" _dark={{
                color: "warmGray.200"
            }} fontWeight="medium" size="xs">
                Cadastre-se
            </Heading>
            <VStack space={3} mt="5">
                <FormControl>
                    <FormControl.Label>Nome</FormControl.Label>
                    <Input type="text" />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Telefone</FormControl.Label>
                    <Input type="text" />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Senha</FormControl.Label>
                    <Input type="password" />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Confirme sua senha</FormControl.Label>
                    <Input type="password" />
                </FormControl>

                <FormControl>
                    <Checkbox value="green" colorScheme="green" size="md" defaultIsChecked _text={{
                        fontSize: 15
                    }}>
                        Possuo automóvel
                    </Checkbox>
                </FormControl>


                <Button mt="2" colorScheme="indigo">
                    Sign up
                </Button>
            </VStack>
        </Box>
    </Center>;
};


export default SingUp;