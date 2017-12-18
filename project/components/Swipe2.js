import React, {Component} from 'react';
import {
    View,
    Animated,
    PanResponder,
    Dimensions,
    LayoutAnimation,
    UIManager
} from 'react-native';
import log from '../log';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.30 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Swipe2 extends Component{


    componentWillReceiveProps(nextProps){
        if(nextProps.data !== this.props.data){
            this.setState({index: 0});
        }
    }

    componentWillUpdate(){
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }

    //This is for default props
    static defaultProps = {
        onSwipeRight: () => {},
        onSwipeLeft: () => {}
    }
    
    constructor(props){
        super(props);

        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({x: gesture.dx, y: gesture.dy })
            },
            onPanResponderRelease: (event,gesture) => {
                if(gesture.dx > SWIPE_THRESHOLD){
                    this.forceSwipe('right');
                }else if (gesture.dx < -SWIPE_THRESHOLD){
                    this.forceSwipe('left');
                }else {
                    this.resetPosition();
                }
                
            }
        });
        this.panResponder = panResponder;
        this.position = position;
        this.state = {index: 0};
    }

    forceSwipe(direction){
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;

        Animated.timing(this.position, {
            toValue: {x: x, y : 0},
            duration: SWIPE_OUT_DURATION
        }).start(() => {
            this.onSwipeComplete(direction);
        });
    }


    resetPosition(){
        Animated.spring(this.position,{
            toValue: {x:0, y: 0}
        }).start();
    }

    onSwipeComplete(direction){
        const {onSwipeLeft, onSwipeRight,data} = this.props;

        const item = data[this.state.index];
        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);

        this.position.setValue({x:0, y: 0});
        this.setState({index: this.state.index + 1});

    }


    getCardStyle(){
        const rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5,0,SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg', '0deg','120deg']
        });

        const scale = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH,0,SCREEN_WIDTH],
            outputRange: [0.1,1,0.1]
        });

        return {
            ...this.position.getLayout(),
            transform: [{rotate}, {scale}],
            zIndex: 99
        };

        
    }

    renderCards(){
       if(this.state.index >= this.props.data.length){
           return this.props.renderNoMoreCards();
       } 

       const dataSize = this.props.data.length;

        return this.props.data.map((item,i) => {
            if(i< this.state.index) {return null;}

            if(i === this.state.index){
                return (
                    <Animated.View
                    key={item.id}
                    style={[this.getCardStyle(),styles.cardStyle, {zIndex: dataSize}]}
                    {...this.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }
            return (
                 //WARNING: If we use View instead of Animated.View then each time a card goes to the top of the stack
                //the image will be re-fetched because it is converting a View component to Animated.View Component
                 //So a simple solution to this fucking problem is wrapping the card component inside an Animated.View
                <Animated.View key={item.id}
                style={[styles.cardStyle,{margin: i*0.5, zIndex: dataSize  - i}]}
                >
                {this.props.renderCard(item)}
                </Animated.View>
                
            );
        }).reverse();
    }
    
    render(){
        return(
            <View
            >
                {this.renderCards()}
            </View>
        );
    }
};

const styles={
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH,
    }
}

export default Swipe2;