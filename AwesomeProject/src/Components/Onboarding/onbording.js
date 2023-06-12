import { StyleSheet, Text, View, FlatList, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import slides from '../../../slides'
import OnbordingItem from './onbordingItem'
import Paginator from './Paginator'
import NextButton from './NextButton'
const Onbording = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold:50 }).current;
  
    const viewableItemsChanged = useRef(({ viewableItems }) => {
      setCurrentIndex(viewableItems[0].index);
    }).current;
  
    const slidesRef = useRef(null);
    return (
        <View style={styles.container}>
        <View style={{ flex: 3 }}>
          <FlatList
            data={slides}
            renderItem={({ item }) => <OnbordingItem item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={(item) => item.id}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: false,
              }
            )}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slidesRef}
          />
        </View>
        <Paginator data ={slides } scrollX={scrollX}/>
        <NextButton percentage={ (currentIndex +1) * (100/slides.length)  } />
      </View>
    )
}

export default Onbording

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})