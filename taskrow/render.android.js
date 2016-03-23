import React, {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Animated
} from 'react-native';

export default function render(styles) {
  const doneAnimation = new Animated.ValueXY();

  const localStyles = StyleSheet.create({
    doneButton: {
      borderRadius: 5,
      padding: 5,
    },
    row: {
      transform: doneAnimation.getTranslateTransform()
    },
  });

  function animatedPress() {
    Animated.spring(doneAnimation, {
      tension: 2,
      friction: 3,
      toValue: {
        x: -500,
        y: 0,
      },
    }).start();

    setTimeout(() => {
      this.onDonePressed();
    }, 1000)
  }

  return (
    <Animated.View style={[styles.container, localStyles.row]}>
      <Text style={styles.label}>and: {this.props.todo.task}</Text>
      <TouchableHighlight
        underlayColor="#ddd"
        onPress={animatedPress.bind(this)}
        style={localStyles.doneButton}>
        <Image
          style={{ height: 30, width: 30}}
          source={require('../images/done.png')}
          />
      </TouchableHighlight>
    </Animated.View>
  );
}
