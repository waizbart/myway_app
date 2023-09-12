import * as React from 'react';
import { Dimensions, Text, View, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import { colors } from '../styles/colors';

const items = [
    {
        title: 'Cadastre suas rotas ',
        description: 'Cadastre rotas que você faz frequentemente',
        image: require('../assets/Carrousel/1.png'),
    },
    {
        title: 'Encontre caronas',
        description: 'Encontre pessoas que tem rotas parecidas com as suas',
        image: require('../assets/Carrousel/2.png'),
    },
    {
        title: 'Faça contato',
        description: 'Entre em contato para combinar caronas',
        image: require('../assets/Carrousel/3.png'),
    }
]

function CarouselComp() {
    const width = Dimensions.get('window').width;

    const progressValue = useSharedValue<number>(0);

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
        }}>
            <Carousel
                loop
                width={width}
                height={width}
                autoPlay={true}
                data={[...new Array(3).keys()]}
                scrollAnimationDuration={1000}
                autoPlayInterval={3000}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            marginHorizontal: 20,
                        }}
                    >
                        <Image
                            source={items[index].image}
                            style={{
                                width: '100%',
                                height: '65%',
                                resizeMode: 'contain',
                            }}
                        />
                        <Text
                            style={{
                                fontSize: 25,
                                textAlign: 'center',
                                marginTop: 20,
                                color: colors.white,
                                fontFamily: 'Poppins_700Bold'
                            }}
                        >
                            {items[index].title}
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                textAlign: 'center',
                                marginTop: 10,
                                color: colors.grey,
                                fontFamily: 'Poppins_500Medium'
                            }}
                        >
                            {items[index].description}
                        </Text>
                    </View>
                )}
                onProgressChange={(_, absoluteProgress) =>
                    (progressValue.value = absoluteProgress)
                }
            />
            {!!progressValue && (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 50,
                        alignSelf: "center",
                    }}
                >
                    {[...new Array(3).keys()].map((__, index) => {
                        return (
                            <PaginationItem
                                animValue={progressValue}
                                index={index}
                                key={index}
                            />
                        );
                    })}
                </View>
            )}
        </View>
    );
}

const PaginationItem: React.FC<{
    index: number
    animValue: Animated.SharedValue<number>
}> = (props) => {
    const { animValue, index } = props;
    const width = 8;
    const length = 3;

    const animStyle = useAnimatedStyle(() => {
        let inputRange = [index - 1, index, index + 1];
        let outputRange = [-width, 0, width];

        if (index === 0 && animValue?.value > length - 1) {
            inputRange = [length - 1, length, length + 1];
            outputRange = [-width, 0, width];
        }

        return {
            transform: [
                {
                    translateX: interpolate(
                        animValue?.value,
                        inputRange,
                        outputRange,
                        Extrapolate.CLAMP,
                    ),
                },
            ],
        };
    }, [animValue, index, length]);

    return (
        <View
            style={{
                backgroundColor: colors.white,
                width,
                height: width,
                borderRadius: 50,
                overflow: "hidden",
            }}
        >
            <Animated.View
                style={[
                    {
                        borderRadius: 50,
                        backgroundColor: colors.green,
                        flex: 1,
                    },
                    animStyle,
                ]}
            />
        </View>
    );
};


export default CarouselComp;