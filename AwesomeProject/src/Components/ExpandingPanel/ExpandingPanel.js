import React, { useState } from 'react';
import { View, TouchableOpacity, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ExpandingPanel = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const panelWidth = useState(new Animated.Value(0))[0];

    const handleIconPress = () => {
        setIsExpanded(!isExpanded);
        Animated.timing(panelWidth, {
            toValue: isExpanded ? 0 : 120,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    };

    const panelOpacity = panelWidth.interpolate({
        inputRange: [0, 120],
        outputRange: [0, 1],
    });

    return (
        <View>
            <TouchableOpacity onPress={handleIconPress}>
                <View style={{
                    flexDirection: 'row', 
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                }}>
                    {isExpanded && (
                        <Animated.View
                            style={{
                                flexDirection: 'row',
                                backgroundColor: 'pink',
                                padding: 5,
                                borderRadius: 5,
                                overflow: 'hidden',
                                opacity: panelOpacity,
                                alignItems: 'center',
                            }}>
                            <TouchableOpacity>
                                <Icon name="add" color="black" size={20} style={{ marginRight: 10 }} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name="pencil-sharp" color="black" size={20} style={{ marginRight: 10 }} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name="trash" color="black" size={20} style={{ marginRight: 10 }} />
                            </TouchableOpacity>
                        </Animated.View>
                    )}
                    <Icon name="ellipsis-vertical" color="grey" size={20} style={{ marginRight: 10,                                 backgroundColor: 'pink',
                                padding: 5,
                                borderRadius: 6,
                                alignItems: 'center', }} />
                </View>
                
            </TouchableOpacity>
        </View>
    );
};

export default ExpandingPanel;
