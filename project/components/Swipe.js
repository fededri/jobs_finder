import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform
} from 'react-native';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 0;
const MAX_NUM_OF_ELEMENTS_TO_RENDER = 3;
var lastSliceIndex = 0;


class Swipe extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
    keyProp: 'id',
    TAG: 'SwipeComponent'
  }

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      }
    });

    this.state = {
                  panResponder, 
                  position,
                  index: 0, 
                  newSlice: true,
                  maxNumberOfSlices: Math.ceil(this.props.data.length / MAX_NUM_OF_ELEMENTS_TO_RENDER),
                  currentSliceNumber: 0,
                  globalIndex: 0
                  
                  };
  }


  componentWillMount(){
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      log(this.props.TAG,'refreshing component DATA, setting index to 0');
      this.setState({ index: 0,
                      newSlice: true,
                      maxNumberOfSlices: Math.ceil(this.props.data.length / MAX_NUM_OF_ELEMENTS_TO_RENDER),
                      currentSliceNumber: 0,
                      globalIndex: 0
                    });
    }
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  forceSwipe(direction) {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
  }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.globalIndex];

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    this.state.position.setValue({ x: 0, y: 0 });


    if(this.state.index >= MAX_NUM_OF_ELEMENTS_TO_RENDER -1){
      log(this.props.TAG,'reset local index to 0 ');
      this.setState({index: 0, newSlice: true, 
                    currentSliceNumber: this.state.currentSliceNumber + 1,
                    globalIndex: this.state.globalIndex +1
                  });
    }else {
      this.setState({ index: this.state.index + 1,
                     newSlice: false,
                     globalIndex: this.state.globalIndex +1
                    });
    }
   
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['90deg', '0deg', '-90deg']
    });


    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  renderCards() {
    console.log(this.props.TAG,'rendering');
    log(this.props.TAG,'rendering with state: ', this.state);
    if (this.state.globalIndex >= this.props.data.length -1) {
      return this.props.renderNoMoreCards();
    }

    var elements = [];
    debugger
    if(this.state.newSlice){
      if(this.props.data.length - lastSliceIndex > MAX_NUM_OF_ELEMENTS_TO_RENDER){
        elements = this.props.data.slice(lastSliceIndex, lastSliceIndex + MAX_NUM_OF_ELEMENTS_TO_RENDER);
        lastSliceIndex += MAX_NUM_OF_ELEMENTS_TO_RENDER;
      }else {
        elements = this.props.data.slice(lastSliceIndex,this.props.data.length);
      }
    }else{
      elements = this.props.data.slice(lastSliceIndex - MAX_NUM_OF_ELEMENTS_TO_RENDER,lastSliceIndex);
    }
   

    const deck = elements.map((item, i) => {    

      if (i === this.state.index) {
        return (
          <Animated.View
            key={item[this.props.keyProp]}
            style={[this.getCardStyle(), styles.cardStyle, {elevation: 20 ,zIndex: 99 }]}
            {...this.state.panResponder.panHandlers}
          >
            {this.props.renderCard(item,i,this.state.globalIndex)}
          </Animated.View>
        );
      }

      return (
        <Animated.View
          key={item[this.props.keyProp]}
          style={[styles.cardStyle, { margin: 10, zIndex: i }]}
        >
          {this.props.renderCard(item,i,this.state.globalIndex)}
        </Animated.View>
      );
    });

    return deck;
   // return Platform.OS === 'android' ? deck : deck.reverse();
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

const styles = {
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH
  }
};

export default Swipe;