import React, { useEffect, useState } from "react";
import { View,StyleSheet, ActivityIndicator } from "react-native";
import Animated, {
  useSharedValue,
  withSequence,
  withDelay,
  withTiming,
  cancelAnimation,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
 
const DOTS = [
  { cx: 20, cy: 20 }, { cx: 20, cy: 50 },
  { cx: 50, cy: 20 }, { cx: 50, cy: 50 },
  { cx: 80, cy: 20 }, { cx: 110, cy: 20 },
  { cx: 80, cy: 50 }, { cx: 110, cy: 50 },
  { cx: 110, cy: 80 }, { cx: 80, cy: 80 },
  { cx: 80, cy: 110 }, { cx: 110, cy: 110 }
];
 
const GROUPS = [
  [0, 1], [2, 3], [4, 5], [6, 7], [8, 9], [10, 11]
];
 
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
 
const CbLoader = () => {
  const [loading, setLoading] = useState(true);
  const opacities = DOTS.map(() => useSharedValue(0.2));
 
  const startAnimation = () => {
    let totalDelay = 0;
    GROUPS.forEach((group, stepIndex) => {
      totalDelay = stepIndex * 200;
      group.forEach((dotIndex) => {
        opacities[dotIndex].value = withSequence(
          withDelay(totalDelay, withTiming(1, { duration: 200 })),
          withTiming(0.2, { duration: 200 })
        );
      });
    });
 
    setTimeout(() => {
      if (loading) startAnimation();
    }, totalDelay + 400);
  };
 
  useEffect(() => {
    startAnimation();
 
   
    const timer = setTimeout(() => {
      setLoading(false);
      opacities.forEach((opacity) => cancelAnimation(opacity));
    }, 5000000000);
 
    return () => clearTimeout(timer);
  }, []);
 
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        {loading ? (
          <Svg height="60" width="60" viewBox="0 0 140 140">
            {DOTS.map(({ cx, cy }, index) => (
              <AnimatedCircle
                key={index}
                cx={cx}
                cy={cy}
                r="10"
                fill="white"
                opacity={opacities[index]}
              />
            ))}
          </Svg>
        ) : (
          <ActivityIndicator/>
        )}
      </View>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
  },
});
 
export default CbLoader;