import { Box, VStack, Button } from 'native-base';
import { colors } from '../styles/colors';
import Carousel from '../components/Carousel'
import React from 'react';

const Welcome = ({ navigation }: any) => {
    return (
        <Box w={'100%'}>
            <Box h={'70%'}>
                <Carousel />
            </Box>
            <Box h={'30%'}>
                <VStack space={4} alignItems='center' justifyContent={'center'} h={'100%'}>
                    <Button
                        onPress={() => navigation.navigate('Login')}
                        w={'80%'}
                        bg={colors.green}
                        borderRadius={10}
                        _pressed={{ bg: colors.darkGreen }}
                        _text={{
                            color: colors.black,
                            fontSize: 16,
                            fontFamily: "Poppins_500Medium"
                        }}
                        p={6}
                    >
                        ENTRAR
                    </Button>
                    <Button
                        onPress={() => navigation.navigate('FirstAccess')}
                        w={'80%'}
                        bg={colors.black}
                        borderRadius={10}
                        borderColor={colors.green}
                        borderWidth={1}
                        _text={{ 
                            color: colors.green,
                            fontSize: 16,
                            fontFamily: "Poppins_500Medium"
                         }}
                        _pressed={{ bg: colors.darkGreen }}
                        p={6}
                        fontFamily="Poppins_500Medium"
                    >
                        CADASTRE-SE
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
};

export default Welcome;