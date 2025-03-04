import * as UI from '@/components/cobalt/importUI';
import React, { useRef,useEffect,useState } from 'react';
import { Image, Modal, Animated, UIManager, Platform } from "react-native";
import { useFormContext } from '@/components/cobalt/event';
import { styles } from '@/source/styles/ItemModifier';
import { useItemModifierLogic } from '@/source/controller/itemModifier/ItemModifier';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import CbLoader from '@/components/cobalt/cobaltLoader';
import { CbDottedLine } from '@/source/constants/dottedLine';
import AsyncStorage from '@react-native-async-storage/async-storage';

const pageId = "ItemModifier"
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const ItemModifier = (props) => {
    const { setSingleItemDetails ,toggleFavorite,singleItemDetails,modifierData,setFormFieldData,getFormFieldData,cartData,modifiersResponseData,isVisible,setIsVisible,selectedModifiers,modifierCartItemData,setIsFavorite } = useFormContext()

    const {ImageUrl,Item_Name,Price,Description,response,isFavorite} = singleItemDetails
    const cartItem = cartData?.find((item) => item.Item_ID === singleItemDetails?.Item_ID);
    const quantity = cartItem ? cartItem.quantity : 0;
    const modifierCartItem = modifierCartItemData&& modifierCartItemData?.find((item) => item.Item_ID === singleItemDetails?.Item_ID);
    const modifierQuantity = modifierCartItem ? modifierCartItem?.quantity : 0;
    let categoryData = typeof modifiersResponseData?.Categories == "string"? JSON.parse(modifiersResponseData?.Categories): modifiersResponseData?.Categories
    const { handleDiscardChanges,loading,getAllSelectedModifiers} = useItemModifierLogic()
    const scrollY = useRef(new Animated.Value(0)).current;

   console.log('====================================');
   console.log("uhius",singleItemDetails);
   console.log('====================================');
    
    
   useEffect(() => {
   
  
    if (cartItem && cartItem.isFavorite === 1 && singleItemDetails.isFavorite !== 1) {
      setSingleItemDetails((prevDetails) => ({
        ...prevDetails,
        isFavorite: 1, 
      }));
    }
  }, [cartData]); 
  


    
    return (
      <>
        <Animated.View
          style={[
            styles.stickyHeader,
            {
              opacity: scrollY.interpolate({
                inputRange: [300, 300],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              }),
            },
          ]}
        >
          <UI.Box style={{ marginTop: 10 }}>
            <UI.Text style={styles.foodItemName} numberOfLines={2}>
              {Item_Name ? Item_Name : ""}
            </UI.Text>
            <UI.Text style={styles.foodItemPrice}>${Price}</UI.Text>
          </UI.Box>

          <UI.Box
            style={[
              styles.rightItemContainer,
              {
                width:
                  (quantity >= 1 || modifierQuantity >= 1)
                    ? responsiveWidth(25)
                    : responsiveWidth(17),
              },
            ]}
          >
            <UI.TouchableOpacity style={styles.favIconBtn} >
              <UI.CbImage
                imageJsx={
                  <Image
                    source={
                      isFavorite === 1
                        ? require("@/assets/images/icons/Fav3x.png")
                        : require("@/assets/images/icons/Notfav3x.png")
                    }
                    style={styles.favIcon}
                    resizeMode="contain"
                  />
                }
              />
            </UI.TouchableOpacity>

            <UI.CbAddToCartButton
              mealItemDetails={singleItemDetails}
              style={styles.addBtn}
            />
          </UI.Box>
        </Animated.View>
        
        <Animated.ScrollView
         showsVerticalScrollIndicator={false}
         bounces={false}
          contentContainerStyle={{borderTopLeftRadius: 35, borderTopRightRadius: 35 }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
         >
          <UI.Box style={styles.mainContainer}>
            <UI.TouchableOpacity onPress={() => setIsVisible(false)}>
              <UI.CbImage
                imageJsx={
                  <Image
                    alt="image"
                    source={{ uri: ImageUrl ? ImageUrl : "" }}
                    style={styles.itemImage}
                    resizeMode="cover"
                  />
                }
              />
            </UI.TouchableOpacity>

            <UI.Box style={styles.modifierContainer}>
              <UI.Box
                style={[
                  styles.itemDetailsContainer,
                  { marginRight: (quantity !== 0 || modifierQuantity !== 0) && responsiveWidth(5) },
                ]}
              >
                <UI.Box style={{ marginTop: 10 }}>
                  <UI.Text style={styles.foodItemName} numberOfLines={2}>
                    {Item_Name ? Item_Name : ""}
                  </UI.Text>
                  <UI.Text style={styles.foodItemPrice}>${Price}</UI.Text>
                </UI.Box>

                <UI.Box
                  style={[
                    styles.rightItemContainer,
                    {
                      width:
                        (quantity >= 1 || modifierQuantity >= 1)
                          ? responsiveWidth(25)
                          : responsiveWidth(17),
                    },
                  ]}
                >
                  <UI.TouchableOpacity style={styles.favIconBtn} onPress={()=> toggleFavorite()}>
                    {/* <UI.CbImage
                      imageJsx={
                        
                      }
                    /> */}
                    {
                      isFavorite === 1 ?
                      <Image
                          source={require("@/assets/images/icons/Fav3x.png")}
                          style={styles.favIcon}
                          resizeMode="contain"
                        />
                        :<Image
                        source={require("@/assets/images/icons/Notfav3x.png")}
                        style={styles.favIcon}
                        resizeMode="contain"
                      />
                    }
                  </UI.TouchableOpacity>

                  <UI.CbAddToCartButton
                    mealItemDetails={singleItemDetails}
                    style={styles.addBtn}
                  />
                </UI.Box>
              </UI.Box>


              {
                Description &&
                <UI.Box style={styles.foodDiscripContainer}>
                  <CbDottedLine length={50} dotSize={6} dotColor="#0000002B" />
                  <UI.Text style={styles.foodDiscripTxt}>
                    {Description ? Description : ""}
                  </UI.Text>
                  <CbDottedLine length={50} dotSize={6} dotColor="#0000002B" />
                </UI.Box>
              }

              <UI.Box style={styles.modifierSubContainer}>
                {/* <UI.ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: responsiveHeight(55) }}
                  style={[
                    styles.mainList,
                    {
                      marginBottom:
                        response?.IsModifierAvailable == 0
                          ? responsiveHeight(10)
                          : responsiveHeight(30),
                    },
                  ]}
                > */}
                  { loading ? (
                    <CbLoader />
                  ) : (
                    <UI.Box>
                      {
                        categoryData?.length > 0 &&
                        <>  <UI.Text style={styles.modifierTxt}>Modifiers</UI.Text>
                          
                          <UI.CbAccordionlist
                            screenName="Modifiers"
                            selectedModifiers={selectedModifiers}
                            getAllSelectedModifiers={getAllSelectedModifiers}
                          />
                        </>
                      }
                    </UI.Box>
                  )}
                  <UI.Box style={{paddingBottom:100}}>
                    <UI.Text style={styles.allergyInfoTxt}>
                      Comment/Allergy Info
                    </UI.Text>
                    <UI.cbForm
                      formId={pageId}
                      setFormFieldData={setFormFieldData}
                      getFormFieldData={getFormFieldData}
                    >
                      <UI.cbInput id="Comments" style={styles.commentsBox} />
                    </UI.cbForm>
                  </UI.Box>
                {/* </UI.ScrollView> */}
              </UI.Box>
            </UI.Box>
          </UI.Box>

          <Modal
            visible={isVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setIsVisible(false)}
          >
            <UI.View
              style={styles.modalContainer}
              onPress={() => setIsVisible(false)}
            />

            <UI.Box style={styles.confirmMdl}>
              <UI.Box style={styles.innerModal}>
                <UI.Box style={styles.innerModalMsgContainer}>
                  <Image
                    source={require("@/assets/images/icons/dining3x.png")}
                    style={styles.diningIcon}
                  />
                  <UI.Text style={styles.innerModalAlertTxt}>
                    Are you sure you want to discard your changes?
                  </UI.Text>

                  <UI.Box style={styles.discardBtn}>
                    <UI.TouchableOpacity
                      onPress={() => setIsVisible(false)}
                      style={styles.modalNoYesBtn}
                    >
                      <UI.Text style={styles.modalNoYesBtnTxt}>No</UI.Text>
                    </UI.TouchableOpacity>

                    <UI.TouchableOpacity
                      onPress={handleDiscardChanges}
                      style={styles.modalNoYesBtn}
                    >
                      <UI.Text style={styles.modalNoYesBtnTxt}>Yes</UI.Text>
                    </UI.TouchableOpacity>
                  </UI.Box>
                </UI.Box>
              </UI.Box>
            </UI.Box>
          </Modal>
        </Animated.ScrollView>
      </>
    );
    
};

export default ItemModifier;


// import * as UI from '@/components/cobalt/importUI';
// import React, { useRef, useEffect, useState } from 'react';
// import { Image, Modal, Animated, UIManager, Platform } from "react-native";
// import { useFormContext } from '@/components/cobalt/event';
// import { styles } from '@/source/styles/ItemModifier';
// import { useItemModifierLogic } from '@/source/controller/itemModifier/ItemModifier';
// import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import CbLoader from '@/components/cobalt/cobaltLoader';
// import { CbDottedLine } from '@/source/constants/dottedLine';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const pageId = "ItemModifier";




// if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// const ItemModifier = (props) => {
//   // const { selectedModifiersUpdation, isFavoriteTemp,  saveFavoriteOnOrder } = props;
//   const { singleItemDetails, cartData, modifierCartItemData, modifiersResponseData, isVisible, setIsVisible, selectedModifiers,setIsFavorite, isFavorite } = useFormContext();
//   const { ImageUrl, Item_Name, Price, Description, response ,  } = singleItemDetails;


//   const cartItem = cartData?.find((item) => item.Item_ID === singleItemDetails?.Item_ID);
//   const quantity = cartItem ? cartItem.quantity : 0;
//   const modifierCartItem = modifierCartItemData?.find((item) => item.Item_ID === singleItemDetails?.Item_ID);
//   const modifierQuantity = modifierCartItem ? modifierCartItem?.quantity : 0;

//   let categoryData = typeof modifiersResponseData?.Categories === "string"
//     ? JSON.parse(modifiersResponseData?.Categories)
//     : modifiersResponseData?.Categories;

//   const { handleDiscardChanges, loading, getAllSelectedModifiers } = useItemModifierLogic();
//   const scrollY = useRef(new Animated.Value(0)).current;


//   // const [isFavorite, setIsFavorite] = useState(singleItemDetails?.isFavorite || false);

//   // const toggleFavorite = async () => {
//   //   const newFavoriteStatus = !isFavorite;
//   //   setIsFavorite(newFavoriteStatus);

//   //   try {
      
//   //     const storedFavorites = await AsyncStorage.getItem('favorites');
//   //     let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

//   //     if (newFavoriteStatus) {
       
//   //       favorites = [...favorites, singleItemDetails];
//   //     } else {
       
//   //       favorites = favorites.filter(item => item.Item_ID !== singleItemDetails.Item_ID);
//   //     }

//   //     await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
//   //     console.log("Updated favorites:", favorites);
//   //   } catch (error) {
//   //     console.error("Error updating favorites:", error);
//   //   }
//   // };

//   const toggleFavorite = () => {
//     setIsFavorite(isFavorite === 0 ? 1 : 0);
//     console.log(isFavorite)
//   };




//   return (
//     <>
//       <Animated.View
//         style={[
//           styles.stickyHeader,
//           {
//             opacity: scrollY.interpolate({
//               inputRange: [300, 300],
//               outputRange: [0, 1],
//               extrapolate: 'clamp',
//             }),
//           },
//         ]}
//       >
//         <UI.Box style={{ marginTop: 10 }}>
//           <UI.Text style={styles.foodItemName} numberOfLines={2}>
//             {Item_Name ? Item_Name : ""}
//           </UI.Text>
//           <UI.Text style={styles.foodItemPrice}>${Price}</UI.Text>
//         </UI.Box>

//         <UI.Box
//           style={[
//             styles.rightItemContainer,
//             {
//               width: (quantity >= 1 || modifierQuantity >= 1)
//                 ? responsiveWidth(25)
//                 : responsiveWidth(17),
//             },
//           ]}
//         >
//        <UI.TouchableOpacity style={styles.favIconBtn} onPress={toggleFavorite}>

//             <UI.CbImage
//               imageJsx={
//                 <Image
//                   source={isFavorite  ? require("@/assets/images/icons/Fav3x.png") : require("@/assets/images/icons/Notfav3x.png")}
//                   style={styles.favIcon}
//                   resizeMode="contain"
//                 />
//               }
//             />
//           </UI.TouchableOpacity>

//           {/* <UI.CbAddToCartButton mealItemDetails={singleItemDetails} style={styles.addBtn} /> */}
//         </UI.Box>
//       </Animated.View>

//       <Animated.ScrollView
//         contentContainerStyle={{ borderTopLeftRadius: 35, borderTopRightRadius: 35 }}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: false }
//         )}
//       >
//         <UI.Box style={styles.mainContainer}>
//           <UI.TouchableOpacity onPress={() => setIsVisible(false)}>
//             <UI.CbImage
//               imageJsx={
//                 <Image
//                   alt="image"
//                   source={{ uri: ImageUrl ? ImageUrl : "" }}
//                   style={styles.itemImage}
//                   resizeMode="cover"
//                 />
//               }
//             />
//           </UI.TouchableOpacity>

//           <UI.Box style={styles.modifierContainer}>
//             <UI.Box style={styles.itemDetailsContainer}>
//               <UI.Box style={{ marginTop: 10 }}>
//                 <UI.Text style={styles.foodItemName} numberOfLines={2}>
//                   {Item_Name ? Item_Name : ""}
//                 </UI.Text>
//                 <UI.Text style={styles.foodItemPrice}>${Price}</UI.Text>
//               </UI.Box>

//               <UI.Box style={styles.rightItemContainer}>
//                 <UI.TouchableOpacity style={styles.favIconBtn} onPress={toggleFavorite}>
//                   <UI.CbImage
//                     imageJsx={
//                       <Image
//                         source={isFavorite ? require("@/assets/images/icons/Fav3x.png") : require("@/assets/images/icons/Notfav3x.png")}
//                         style={styles.favIcon}
//                         resizeMode="contain"
//                       />
//                     }
//                   />
//                 </UI.TouchableOpacity>

//                 {/* <UI.CbAddToCartButton mealItemDetails={singleItemDetails} style={styles.addBtn} /> */}
//               </UI.Box>
//             </UI.Box>

//             {Description && (
//               <UI.Box style={styles.foodDiscripContainer}>
//                 <CbDottedLine length={50} dotSize={6} dotColor="#0000002B" />
//                 <UI.Text style={styles.foodDiscripTxt}>{Description}</UI.Text>
//                 <CbDottedLine length={50} dotSize={6} dotColor="#0000002B" />
//               </UI.Box>
//             )}

//             <UI.Box style={styles.modifierSubContainer}>
//               {loading ? (
//                 <CbLoader />
//               ) : (
//                 <UI.Box>
//                   {categoryData?.length > 0 && (
//                     <>
//                       <UI.Text style={styles.modifierTxt}>Modifiers</UI.Text>
//                       <UI.CbAccordionlist
//                         screenName="Modifiers"
//                         selectedModifiers={selectedModifiers}
//                         getAllSelectedModifiers={getAllSelectedModifiers}
//                       />
//                     </>
//                   )}
//                 </UI.Box>
//               )}
//               <UI.Box style={{ paddingBottom: 100 }}>
//                 <UI.Text style={styles.allergyInfoTxt}>Comment/Allergy Info</UI.Text>
//                 <UI.cbForm formId={pageId}>
//                   <UI.cbInput id="Comments" style={styles.commentsBox} />
//                 </UI.cbForm>
//               </UI.Box>
//             </UI.Box>
//           </UI.Box>
//         </UI.Box>
//       </Animated.ScrollView>
//     </>
//   );
// };

// export default ItemModifier;
