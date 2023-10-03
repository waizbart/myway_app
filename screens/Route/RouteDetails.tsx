import React, { useState } from 'react'
import { Flex, IconButton, ScrollView, Text, VStack, Spinner, Pressable, Divider } from 'native-base'
import { getMatches } from '../../services'
import { colors } from '../../styles/colors'
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Linking } from 'react-native';

export default function RouteDetails({ navigation, route }: any) {
    const { id, name, coordinates } = route.params?.route

    const startPoint = coordinates?.at(0)
    const endPoint = coordinates?.at(-1)

    const [matches, setMatches] = useState<any>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [selectedMatch, setSelectedMatch] = useState<number>()

    async function loadMatches() {
        try {
            setIsLoading(true)
            const mats = await getMatches(id)
            console.log({ mats })
            setMatches(
                mats.sort((a: any, b: any) => {
                    return a.near_percentage < b.near_percentage ? 1 : -1
                })
            )
            setIsLoading(false)
        } catch (error) {
            console.log({ error })
            setIsLoading(false)
        }
    }

    useFocusEffect(
        React.useCallback(() => {

            loadMatches()

            return () => {
                setMatches([])
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
        <VStack
            flex={1}
            p={5}
            space={4}
            bg={'black'}
        >
            <IconButton
                icon={<AntDesign name="arrowleft" size={30} color={colors.white} />}
                variant="unstyled"
                onPress={() => {
                    navigation.goBack()
                }}
                alignSelf={'flex-start'}
                mb={4}
                p={0}
            />
            <Text
                color={colors.white}
                fontFamily={'Poppins_600SemiBold'}
                fontSize={24}
            >
                Matches na rota <Text color={colors.green}>{name}</Text>
            </Text>
            {
                matches.length === 0 && (
                    <Text
                        color={colors.grey}
                        fontFamily={'Poppins_400Regular'}
                        fontSize={16}
                        alignSelf={'center'}
                        mt={10}
                    >
                        Nenhum match encontrado :(
                    </Text>
                )
            }
            <ScrollView
                mt={6}
                showsVerticalScrollIndicator={false}
            >
                <VStack space={6}>
                    {matches?.map((match: any, idx: number) => (
                        <Pressable
                            borderRadius={10}
                            p={6}
                            key={match.id}
                            bg={colors.lightBlack}
                        >
                            <Flex
                                direction='row'
                                justify='space-between'
                                align='center'
                            >
                                <Text
                                    color={colors.white}
                                    fontFamily={'Poppins_600SemiBold'}
                                    fontSize={24}
                                >
                                    {
                                        new Intl.NumberFormat('pt-BR', {
                                            style: 'percent',
                                            minimumFractionDigits: 1,
                                        }).format(match.near_percentage / 100)
                                    }
                                </Text>
                                <IconButton
                                    icon={<Entypo
                                        name={selectedMatch == idx ? "chevron-up" : "chevron-down"}
                                        size={30}
                                        color={colors.green}
                                    />}
                                    variant="unstyled"
                                    onPress={() => {
                                        if (selectedMatch == idx)
                                            setSelectedMatch(undefined)
                                        else
                                            setSelectedMatch(idx)
                                    }}
                                />
                            </Flex>
                            {selectedMatch == idx && <Flex>
                                <Divider mb={4} />
                                <Text
                                    color={colors.white}
                                    fontFamily={'Poppins_500Medium'}
                                    fontSize={16}
                                >
                                    Usuário: <Text color={colors.green}>{match.user_login}</Text>
                                </Text>
                                <Flex direction='row' justify='space-around' mt={8}>
                                    <IconButton
                                        icon={<Entypo
                                            name={"phone"}
                                            size={35}
                                            color={colors.green}
                                            style={{
                                                transform: [{ rotate: '90deg' }]
                                            }}
                                        />}
                                        variant="unstyled"
                                        onPress={() => {
                                            const mapsRoute = `https://www.google.com/maps/dir/${startPoint.latitude},${startPoint.longitude}/${endPoint.latitude},${endPoint.longitude}/`
                                            Linking.openURL(`https://wa.me/${match.user_phone}?text=Olá, ${match.user_login}! Vi no MyWay que você compartilha uma de minhas rotas e gostaria de saber se posso te acompanhar.\n\n${mapsRoute}`)
                                        }}
                                    />
                                    <IconButton
                                        icon={<Entypo
                                            name={"trash"}
                                            size={35}
                                            color={colors.redAlert}
                                        />}
                                        variant="unstyled"
                                    />
                                </Flex>
                            </Flex>}
                        </Pressable>
                    ))}
                </VStack>
            </ScrollView>
        </VStack>
    )
}