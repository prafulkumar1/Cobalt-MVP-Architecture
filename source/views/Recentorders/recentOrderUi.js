import * as UI from '@/components/cobalt/importUI';
import { RecentordersData,FavoritesList } from '@/source/constants/commonData';
import React, { useState } from 'react';
import { Image } from 'react-native';
import { styles } from '@/source/styles/Recentorders/ROStyle';
import { Box } from 'lucide-react-native';
import { height } from '@/source/constants/Matrices';


function RenderingPendingOrders() {
  
  
  return (
    <UI.Box
  style={{
    paddingHorizontal: 12,
    height: 120,
    width: 362,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "rgba(0, 0, 0, 0.17)", // Updated for RGBA
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.97,
    shadowRadius: 10,
    elevation: 5, // For Android shadow
  }}
>
  <UI.Box style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
    <UI.CbImage
      imageJsx={
        <Image
          source={require("@/assets/images/icons/Pendingorder.png")}
          style={{ width: 24, height: 24 }}
        />
      }
    />
    <UI.Text
      style={{
        fontSize: 16,
        fontStyle: "italic",
        fontFamily: "Source Sans Pro",
        fontWeight: "700",
        marginLeft: 10,
      }}
    >
      Ordered Status
    </UI.Text>
    <UI.Text
      style={{
        marginLeft: "auto", // Push this text to the far right
        color: "#FF6F00",
        fontSize: 14,
        fontStyle: "italic",
        fontFamily: "Source Sans Pro",
        fontWeight: "700",
      }}
    >
      Preparing your order
    </UI.Text>
  </UI.Box>

  <UI.Box
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <UI.Box>
      <UI.Text
        style={{
          fontSize: 12,
          color: "#4F4F4F",
          fontFamily: "Source Sans Pro",
        }}
      >
        Pickup Time
      </UI.Text>
      <UI.Text
        style={{
          fontSize: 14,
          fontWeight: "700",
          fontFamily: "Source Sans Pro",
        }}
      >
        7:00 PM
      </UI.Text>
    </UI.Box>
    <UI.Box>
      <UI.Text
        style={{
          fontSize: 12,
          color: "#4F4F4F",
          fontFamily: "Source Sans Pro",
        }}
      >
        Pickup Place
      </UI.Text>
      <UI.Text
        style={{
          fontSize: 14,
          fontWeight: "700",
          fontFamily: "Source Sans Pro",
        }}
      >
        Clubhouse Grill
      </UI.Text>
    </UI.Box>
    <UI.Box>
      <UI.Text
        style={{
          fontSize: 12,
          color: "#4F4F4F",
          fontFamily: "Source Sans Pro",
        }}
      >
        Order Id #: 10935
      </UI.Text>
      <UI.Text
        style={{
          fontSize: 12,
          color: "#4F4F4F",
          fontFamily: "Source Sans Pro",
        }}
      >
        Date: 04/11/2024
      </UI.Text>
    </UI.Box>
  </UI.Box>
</UI.Box>
 
  );
};








function RenderingFavoritesList() {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleReadMore = (index) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  return (
    <UI.Box style={{ paddingHorizontal: 8, height: '100%' }}>
    {FavoritesList.FavoriteItems.map((item, index) => (
      <UI.TouchableOpacity key={index} style={{ marginVertical: 15 }}>
        <UI.Box style={{ display: 'flex', flexDirection: 'row', alignContent: 'space-between' }}>
          <UI.CbImage source={item.Image} style={styles.Item_Image} />
          <UI.Box style={{ paddingHorizontal: 18, width: 220 }}>
            <UI.Text style={{ fontSize: 18, fontFamily: 'Source Sans Pro', fontWeight: '700' }}>{item.Item_Name}</UI.Text>
            <UI.Text style={{ fontSize: 16, fontFamily: 'Source Sans Pro', fontWeight: '700' }}>${item.Price.toFixed(2)}</UI.Text>
            <UI.Text style={{ fontSize: 11, color: '#3B87C1', fontFamily: 'Source Sans Pro',fontWeight:"bold", lineHeight: 14,}}>
              {expandedItems[index] ? item.Description : `${item.Description.substring(0, 30)}... `}
              <UI.TouchableOpacity onPress={() => toggleReadMore(index)}>
                <UI.Text style={{ color: '#26BAE2',fontSize: 11,  }}>
                  {expandedItems[index] ? 'Read Less' : 'Read More'}
                </UI.Text>
              </UI.TouchableOpacity>
            </UI.Text>
          </UI.Box>
          <UI.CbImage imageJsx={<Image source={require('@/assets/images/icons/Fav.png')} style={{ width: 14, height: 16, left: 25, marginVertical: 24 }} />} />
          {/* <UI.cbButton customStyles={{ buttonStyle: styles.AddButton }} /> */}
           <UI.CbAddToCartButton mealItemDetails={{}} style={styles.AddButton} />
        </UI.Box>
      </UI.TouchableOpacity>
    ))}
  </UI.Box>  
  );
};


export default function RecentordersScreen(props) { 
  const [isRecentOrder, setIsRecentOrderOpen] = useState(true);
  
      
  return (
    <UI.Box style={{ backgroundColor: "white", height: "100%" }}>
      <UI.Box style={{ display: "flex", flexDirection: "row", marginVertical: 11, marginLeft: 8, gap: 5 }}>
      
      <UI.TouchableOpacity onPress={() => setIsRecentOrderOpen(false)} style={!isRecentOrder ?styles.ActiveButtonStyle:styles.ButtonStyle}> 
          <UI.Text style={!isRecentOrder ?styles.ActiveButtonTextStyle : styles.ButtonTextStyle}>  Favorites     </UI.Text>
        </UI.TouchableOpacity>
        <UI.TouchableOpacity onPress={() => setIsRecentOrderOpen(true)} style={isRecentOrder ?styles.ActiveButtonStyle:styles.ButtonStyle}> 
          <UI.Text style={isRecentOrder ?styles.ActiveButtonTextStyle : styles.ButtonTextStyle}>  Recent Orders     </UI.Text>
        </UI.TouchableOpacity>
      </UI.Box>
      <UI.ScrollView>
        {/* <RenderingPendingOrders/> */}
        {isRecentOrder ? 
          <UI.CbAccordionlist componentData={RecentordersData.RecentOrders} screenName="RecentOrders" /> 
          : 
          <RenderingFavoritesList />  
        }
      </UI.ScrollView>
    </UI.Box>    
      
  );
}
