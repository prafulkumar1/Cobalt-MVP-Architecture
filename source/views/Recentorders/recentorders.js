import * as UI from '@/components/cobalt/importUI';
import { RecentordersData,ModifiersData } from '@/source/constants/commonData';
import React from 'react';
import { styles } from '@/source/styles/Recentorders/ROStyle';

export default function RecentordersScreen(props) { 
  
  
    return (
      <UI.Box style={{backgroundColor:"white",height:"100%" }}>
        <UI.Box style={{display:"flex",flexDirection:"row", marginVertical:11,marginLeft:8, gap: 5}}>
          <UI.cbButton text="Favorites" variant="sloid"  customStyles={{ buttonStyle: styles.ButtonStyle, buttontextStyle: styles.ButtonTextStyle }} />
          <UI.cbButton text="Recent Orders" variant="sloid"  customStyles={{ buttonStyle: styles.ButtonStyle, buttontextStyle: styles.ButtonTextStyle }}/>
        </UI.Box>
         <UI.CbAccordionlist componentData={RecentordersData} screenName="RecentOrders"/> 
      </UI.Box>      
    );
  }