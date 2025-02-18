import { View } from "react-native";

const Dot = ({ size, color }) => (
  <View
    style={{
      width: size,
      height: 0.5,
      backgroundColor:color,
      marginRight: size / 2, 
    }}
  />
);
export const CbDottedLine = ({ length, dotSize, dotColor }) => {
  const dots = [];
  for (let i = 0; i < length; i++) {
    dots.push(<Dot key={i} size={dotSize} color={dotColor} />);
  }
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {dots}
    </View>
  );
};