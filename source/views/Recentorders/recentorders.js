import * as UI from '@/components/cobalt/importUI';
import { RecentordersData,ModifiersData } from '@/source/constants/commonData';
import React, { useState } from 'react';
import { Image } from 'react-native';
import { styles } from '@/source/styles/Recentorders/ROStyle';
import { Box } from 'lucide-react-native';
import { height } from '@/source/constants/Matrices';


const RenderingProfitCenter = () => {
  return (
    <UI.Box style={{paddingHorizontal:8,paddingVertical:15,height:"100%"}}>
    <UI.TouchableOpacity>
        <UI.Box style={{display:"flex",flexDirection:"row",alignContent:"space-between"}}>
           <UI.CbImage source="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFtIGM3jyStp1h0rD-HPwSRfqmMvBVBtXTtjX7MbaAtnjx3TIMAZs6bT0BdMrBB0nRL8&usqp=CAU" style={styles.Item_Image}/> 
           <UI.Box style={{paddingHorizontal:18,width:220}}>
              <UI.Text style={{fontSize:18,fontFamily:"Source Sans Pro",fontWeight:700}}>Fish and Chips</UI.Text>
              <UI.Text style={{fontSize:16,fontFamily:"Source Sans Pro",fontWeight:700}}>$25.00</UI.Text>
              <UI.Text style={{fontSize:11,color:"#3B87C1",fontFamily:"Source Sans Pro",fontWeight:700}}>Ranch Dressing</UI.Text>
            </UI.Box>                  
              <UI.CbImage imageJsx={<Image  source={require('@/assets/images/icons/Fav.png')} style={{width:14,height:16,left:25,marginVertical:24}}/>} />
              <UI.cbButton  customStyles={{ buttonStyle: styles.AddButton}} />                  
        </UI.Box>
    </UI.TouchableOpacity>
</UI.Box>
  );
};


export default function RecentordersScreen(props) { 
  const [isRecentOrder, setIsRecentOrderOpen] = useState(true);
      
  return (
    <UI.Box style={{ backgroundColor: "white", height: "100%" }}>
      <UI.Box style={{ display: "flex", flexDirection: "row", marginVertical: 11, marginLeft: 8, gap: 5 }}>
        <UI.cbButton 
          text="Favorites" 
          variant="sloid"  
          onPress={() => setIsRecentOrderOpen(false)}
          customStyles={{ 
            buttonStyle: isRecentOrder? styles.ButtonStyle:styles.ActiveButtonStyle, 
            buttontextStyle:isRecentOrder? styles.ButtonTextStyle:styles.ActiveButtonTextStyle
          }} 
          whatVal ={isRecentOrder} 
        />
        <UI.cbButton 
          text="Recent Orders" 
          variant="sloid" 
          onPress={() => setIsRecentOrderOpen(true)}
          customStyles={{ 
            buttonStyle: isRecentOrder? styles.ActiveButtonStyle:styles.ButtonStyle, 
            buttontextStyle:isRecentOrder? styles.ActiveButtonTextStyle:styles.ButtonTextStyle
          }}
          whatVal ={isRecentOrder} 
        />
         
      </UI.Box>
       {isRecentOrder ? <UI.CbAccordionlist componentData={RecentordersData} screenName="RecentOrders"/> : <UI.CbFlatList flatlistData={[{},{}]}  children={RenderingProfitCenter} scrollEnabled={false}/>   }   
     
    </UI.Box>    
      
  );
}
