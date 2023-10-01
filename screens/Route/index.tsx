import React, { useState, useEffect } from 'react'
import { Flex, IconButton, ScrollView, Text, VStack, Spinner } from 'native-base'
import { getRoutes } from '../../services'
import { colors } from '../../styles/colors'
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

export default function Route({ navigation }: any) {
    const [routes, setRoutes] = useState<any>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function loadRoutes() {
        try {
            setIsLoading(true)
            const rotas = await getRoutes()
            console.log({ rotas })
            setRoutes(rotas)
            setIsLoading(false)
        } catch (error) {
            console.log({ error })
            setIsLoading(false)
        }
    }

    useFocusEffect(
        React.useCallback(() => {

            loadRoutes()

            return () => {
                setRoutes([])
            };
        }, [])
    );

    if (isLoading) return (
        <Flex
            flex={1}
            justify='center'
            align='center'
            bg={'black'}
        >
            <Spinner
                color={colors.green}
                size='lg'
            />
        </Flex>
    )

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
                {
                    routes.length === 0 && (
                        <Text
                            color={colors.grey}
                            fontFamily={'Poppins_400Regular'}
                            fontSize={16}
                            alignSelf={'center'}
                            mt={10}
                        >
                            Você ainda não possui rotas cadastradas.
                        </Text>
                    )
                }
                <ScrollView
                    mt={6}
                    showsVerticalScrollIndicator={false}
                >
                    <VStack space={6} mb={20}>
                        {routes?.map((route: any) => (
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
                                    icon={<Entypo
                                        name="map"
                                        size={30}
                                        color={colors.green}
                                    />}
                                    variant="unstyled"
                                    onPress={() => {
                                        navigation.navigate('RouteDetails', { route })
                                    }}
                                />
                            </Flex>
                        ))}
                    </VStack>
                </ScrollView>
            </VStack>
            <IconButton
                icon={<Ionicons
                    name="add-circle-sharp"
                    size={60} color={colors.green}
                />}
                variant="unstyled"
                onPress={() => { }}
                position='absolute'
                bottom={5}
                right={5}
                onPressIn={() => navigation.navigate('CreateRoute')}
                backgroundColor={'black'}
                borderRadius={200}
                p={1}
            />
        </>
    )
}