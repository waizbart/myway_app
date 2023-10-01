import React, { useState } from 'react'
import { Flex, IconButton, ScrollView, Text, VStack, Spinner, Pressable } from 'native-base'
import { getMatches } from '../../services'
import { colors } from '../../styles/colors'
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function RouteDetails({ navigation, route }: any) {
    const { id, name, coordinates } = route.params?.route

    const [matches, setMatches] = useState<any>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

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
                    {matches?.map((match: any) => (
                        <Pressable>
                            <Flex
                                borderColor={colors.white}
                                borderWidth={1}
                                borderRadius={10}
                                p={6}
                                direction='row'
                                justify='space-between'
                                align='center'
                                key={match.id}
                            >
                                <VStack space={2}>
                                    <Flex direction='row' align='center'>
                                        <Text
                                            color={colors.white}
                                            fontFamily={'Poppins_500Medium'}
                                            fontSize={16}
                                        >
                                            Usuário:{" "}
                                        </Text>
                                        <Text
                                            color={colors.white}
                                            fontFamily={'Poppins_400Regular'}
                                            fontSize={16}
                                        >
                                            {match.user_login}
                                        </Text>
                                    </Flex>
                                    <Flex direction='row' align='center'>
                                        <Text
                                            color={colors.white}
                                            fontFamily={'Poppins_500Medium'}
                                            fontSize={16}
                                        >
                                            Telefone:{" "}
                                        </Text>
                                        <Text
                                            key={match.id}
                                            color={colors.white}
                                            fontFamily={'Poppins_400Regular'}
                                            fontSize={16}
                                        >
                                            {match.user_phone}
                                        </Text>
                                    </Flex>
                                </VStack>
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
                            </Flex>
                        </Pressable>
                    ))}
                </VStack>
            </ScrollView>
        </VStack>
    )
}