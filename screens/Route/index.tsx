import React, { useState, useEffect } from 'react'
import { Flex, IconButton, ScrollView, Text, VStack } from 'native-base'
import { getRoutes } from '../../services'
import { colors } from '../../styles/colors'
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function Route({ navigation }: any) {
    const [routes, setRoutes] = useState<any>([])

    useEffect(() => {
        async function loadRoutes() {
            const rotas = await getRoutes()
            console.log({ rotas })
            setRoutes(rotas)
        }
        loadRoutes()
    }, [])

    return (
        <>
            <VStack
                flex={1}
                p={5}
                space={4}
                bg={'black'}
            >
                <Text
                    color={colors.white}
                    fontFamily={'Poppins_600SemiBold'}
                    fontSize={24}
                >
                    Minhas rotas
                </Text>
                <ScrollView
                    mt={6}
                >
                    <VStack space={6}>
                        {routes.map((route: any) => (
                            <Flex
                                borderColor={colors.white}
                                borderWidth={1}
                                borderRadius={10}
                                p={6}
                                direction='row'
                                justify='space-between'
                                align='center'
                            >
                                <Text
                                    key={route.id}
                                    color={colors.white}
                                    fontFamily={'Poppins_500Medium'}
                                    fontSize={18}
                                >
                                    {route.name}
                                </Text>
                                <IconButton
                                    icon={<Entypo name="map" size={30} color={colors.green} />}
                                    variant="unstyled"
                                    onPress={() => { }}
                                    _pressed={{

                                    }}
                                />
                            </Flex>
                        ))}
                    </VStack>
                </ScrollView>
            </VStack>
            <IconButton
                icon={<Ionicons name="add-circle-sharp" size={60} color={colors.green} />}
                variant="unstyled"
                onPress={() => { }}
                position='absolute'
                bottom={5}
                right={5}
                onPressIn={() => navigation.navigate('CreateRoute')}
            />
        </>
    )
}