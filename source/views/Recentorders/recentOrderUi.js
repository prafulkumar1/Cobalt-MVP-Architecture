import * as UI from '@/components/cobalt/importUI';
import { RecentordersData,FavoritesList } from '@/source/constants/commonData';
import React, { useState } from 'react';
import { Image } from 'react-native';
import { styles } from '@/source/styles/Recentorders/ROStyle';
import { Box } from 'lucide-react-native';
import { height } from '@/source/constants/Matrices';
import {  CheckIcon, ChevronDownIcon,ChevronRightIcon, CircleIcon,ChevronUpIcon,AddIcon,TrashIcon,RemoveIcon } from '@/components/ui/icon';
import { Accordion,  AccordionItem,  AccordionHeader, AccordionTrigger, AccordionTitleText, AccordionContentText, AccordionIcon, AccordionContent, } from '@/components/ui/accordion';
function RenderingPendingOrders() {
  const OrdersList=RecentordersData.RecentOrders
  
  
  return (
    <Accordion style={{ paddingHorizontal: 3,left:5, width: 400, maxHeight:"100%",borderRadius: 8, backgroundColor: '#fffff', shadowColor: "#00000029", shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.3, shadowRadius: 10,    elevation: 8, padding:10   }}>
         {OrdersList?.PendingOrders?.length > 0 && OrdersList.PendingOrders.map((Order, index) => (
    <AccordionItem key={index} value={`item-${index}`}>
      <AccordionHeader >
        <UI.Box style={{ flexDirection: "row", alignItems: "center", paddingVertical:20,justifyContent:"space-between" }}>
            <UI.CbImage  imageJsx={<Image source={require("@/assets/images/icons/Pendingorder.png")}    style={{ width: 28, height: 28, left:6}}  /> }/>
            <UI.Text   style={{ fontSize: 18, fontStyle: "italic", fontFamily: "SourceSansPro_Bold",fontWeight: "700",  marginLeft: 10,   left:10  }}>
               Ordered Status
            </UI.Text>
            <UI.Text   style={{ marginLeft: "auto",  color: "#FF6F00", fontSize: 16,fontFamily: "SourceSansPro_Bold", fontWeight: "700",  right:10 }}>   
              {Order.OrderStatus}
            </UI.Text>
        </UI.Box>
        <AccordionTrigger className="focus:web:rounded-lg">
        <UI.Box  style={{ flexDirection: "row", justifyContent: "space-between",  alignItems: "center",  }}>
            <UI.Box>
              <UI.Text   style={{ fontSize:11, color: "#4F4F4F", fontFamily: "SourceSansPro_Bold",  }} >
                  Pickup Time
                </UI.Text>
                <UI.Text  style={{  fontSize: 16, fontFamily: "SourceSansPro_Bold", color:"#2A4E7D"  }} >
                  {Order.Pickup_Time}
                </UI.Text>
            </UI.Box>
            <UI.Box style={{ paddingHorizontal:8,   }}>
                <UI.Text style={{ fontSize: 11,  color: "#4F4F4F", fontFamily: "SourceSansPro_Bold" }}>
                    Pickup Place
                  </UI.Text>
                <UI.Text style={{ fontSize: 16, fontFamily: "SourceSansPro_Bold",color:"#2A4E7D" }}>
                {Order.Pickup_Location}
                </UI.Text>
              </UI.Box>
            <UI.Box style={{ paddingHorizontal:60 }}>
                <UI.Text   style={{fontSize: 14, color: "#4F4F4F", fontFamily: "SourceSansPro_BoldItalic" }} >
                  Order Id #: {Order.OrderId}
                </UI.Text>
                <UI.Text style={{ fontSize: 14,  color: "#4F4F4F", fontFamily: "SourceSansPro_BoldItalic" }} >
                  Date: {Order.OrderDate}
                </UI.Text>
            </UI.Box> 
            <>
            {({ isExpanded }) => {
            return (
              <>
                {isExpanded ? (
                  <AccordionIcon as={ChevronRightIcon} className="mr-3" style={{width:20,height:20,}} />
                ) : (
                  <AccordionIcon as={ChevronDownIcon} className="mr-3" style={{width:20,height:20,}}/>
                )}
              </>
            )
          }}
            </>
         </UI.Box>           
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent >
        <UI.Box style={{ padding: 12, backgroundColor: "#fff" }}>
         <UI.Box>
                <UI.Text style={{ fontSize: 14, fontFamily: "SourceSansPro_Bold",right:18,bottom:10}}>
                  Order Summary
                </UI.Text>
                <UI.Box style={{ flexDirection: "row",justifyContent: "space-between",alignItems: "center",marginBottom: 8,}}>
                    <UI.Text style={{ fontSize: 12, color: "#5773A2",fontFamily: "SourceSansPro_Bold", fontStyle: "italic",right:18 }} >
                      Items
                    </UI.Text>
                    <UI.Box style={{ flexDirection: "row", alignItems: "center" }}>
                      <UI.Text   style={{ fontSize: 12, color: "#5773A2",fontFamily: "SourceSansPro_Bold", fontStyle: "italic",  marginRight: 16 }}>
                        Qty
                      </UI.Text>
                    <UI.Text style={{ fontSize: 12, color: "#5773A2",fontFamily: "SourceSansPro_Bold", fontStyle: "italic"}}>
                      Amount
                    </UI.Text>
                </UI.Box>
          </UI.Box>       
        </UI.Box>

          <UI.Box style={{ marginBottom: 12 }}>
          {Order?.Items?.length > 0 && Order.Items.map((Item, index) => (
            <React.Fragment key={index}>
            <UI.Box style={{ flexDirection: "row",justifyContent: "space-between",alignItems: "center", }}>
                <UI.Text style={{ fontSize: 12, fontStyle: "italic", fontWeight: "700",right:18 }}>{index + 1}.{Item.ItemName}</UI.Text>
                <UI.Box style={{ flexDirection: "row", alignItems: "center" }}>
                  <UI.Text style={{  fontSize: 12, fontFamily: "SourceSansPro_Bold", fontStyle: "italic",  marginRight: 16 }}> {Item.Quantity.toFixed(2)} </UI.Text>
                  <UI.Text style={{ fontSize: 12, fontFamily: "SourceSansPro_Bold", fontStyle: "italic"}}>${Item.Price.toFixed(2)}</UI.Text>
                </UI.Box>             
            </UI.Box>
            <UI.Box>
                {Item?.Modifiers?.length > 0 &&  Item.Modifiers.map((Modifier, index) => (
                <React.Fragment key={index}>
                  <UI.Text style={{ fontSize: 11, color: "#5773A2",fontFamily: "SourceSansPro_Bold", fontStyle: "italic"}}>{Modifier.ItemName}</UI.Text>
                  </React.Fragment>
                ))}
            </UI.Box>
            {Item.comment && 
            <UI.Box style={{flexDirection:"row",justifyContent: "space-between",right:18}}>
              <UI.CbImage imageJsx={<Image source={require('@/assets/images/icons/ROComment.png')} style={{ width: 12, height: 12,top:5  }} />}/>
              <UI.Text style={{ fontSize: 12,fontFamily: "SourceSansPro_Bold", fontStyle: "italic",right:50 }}>{Item.comment}</UI.Text>
            </UI.Box>}
            </React.Fragment>
            ))}
          </UI.Box>
            <UI.Box style={{ borderTopWidth: 1, borderTopColor: "#eee", marginTop: 12, paddingTop: 12,alignSelf: "flex-end",alignItems: "flex-end",  }}>
               {Order.SubTotal && <UI.Text style={{ fontWeight: "700" }}>
                  Sub Total:${Order.SubTotal.toFixed(2)}
                </UI.Text>}
                {Order.ServiceCharge && <UI.Text>10% Service Charge: ${Order.ServiceCharge.toFixed(2)}</UI.Text>}
               {Order.FoodTax && <UI.Text>Food Tax: ${Order.FoodTax.toFixed(2)}</UI.Text> }
                {Order.StateTax && <UI.Text>State Tax: ${Order.StateTax.toFixed(2)}</UI.Text> }
            </UI.Box>
            <UI.Box style={{ borderTopWidth: 1, borderTopColor: "#eee", marginTop: 12, paddingTop: 12,alignSelf: "flex-end",alignItems: "flex-end",  }}>
            {Order.Total &&  <UI.Text style={{ fontWeight: "700", marginTop: 8 }}>Total: ${Order.Total.toFixed(2)}</UI.Text> }
                {Order.Tip &&   <UI.Text>Tip: ${Order.Tip.toFixed(2)}</UI.Text> }
                {Order.GrandTotal &&    <UI.Text>Garnd Total: ${Order.GrandTotal.toFixed(2)}</UI.Text> }
            </UI.Box>
        
        </UI.Box>
      </AccordionContent>
    </AccordionItem>
     ))}
  </Accordion>
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
        
        {isRecentOrder ? 
            <>
              <RenderingPendingOrders />
              <UI.CbRecentAccordion componentData={RecentordersData.RecentOrders} screenName="RecentOrders" />
          </>
          : 
          <RenderingFavoritesList />  
        }
      </UI.ScrollView>
      <UI.CbFloatingButton props={props} ></UI.CbFloatingButton>

    </UI.Box>    
      
  );
}
