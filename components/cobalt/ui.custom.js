import React from 'react';
import { createIcon } from '@/components/ui/icon';
import { Path, Circle, G } from 'react-native-svg'; 
import {  Svg } from '@gluestack-ui/icon';

const CartIcon = createIcon({
      Root: Svg,
  viewBox: "0 0 32.886 32.202",
  path: (
    <G transform="translate(1 1)">
      <Path
        d="M.125.125H3.562a1.048,1.048,0,0,1,1.211.957c1.154,5.1,2.233,10.21,3.532,15.269.4,1.563.6,3.156,1.021,4.7a1.539,1.539,0,0,0,1.743,1.376c5.088,0,14.207-.032,14.207-.032A1.452,1.452,0,0,0,26.9,21.312c1.316-3.327,2.446-6.367,3.815-9.945"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <Circle
        cx="2.911"
        cy="2.911"
        r="2.911"
        transform="translate(9.404 24.379)"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <Circle
        cx="2.911"
        cy="2.911"
        r="2.911"
        transform="translate(20.607 24.379)"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <Path
        d="M20.9,19.422H36.751a1.232,1.232,0,0,1,1.234,1.23v4.458a1.232,1.232,0,0,1-1.234,1.23l-14.208.025"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        transform="translate(-15.3 -14.223)"
      />
    </G>
  ),
});

CartIcon.displayName='CartIcon';

export { CartIcon };
