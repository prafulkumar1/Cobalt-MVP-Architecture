import React from 'react';
import { FlatList, ImageBackground, Image, TouchableOpacity,View, Alert, Animated, Modal, Pressable,} from 'react-native';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import {  CheckIcon, ChevronDownIcon,ChevronUpIcon, CircleIcon,AddIcon,TrashIcon,RemoveIcon } from '@/components/ui/icon';
import { Checkbox,CheckboxIcon,CheckboxIndicator,CheckboxLabel } from '@/components/ui/checkbox';
import { Select,SelectIcon,SelectInput,SelectTrigger,SelectPortal,SelectBackdrop,SelectContent,SelectItem } from '../ui/select';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Divider } from '@/components/ui/divider';
import { Radio, RadioGroup, RadioIndicator, RadioLabel, RadioIcon } from '@/components/ui/radio';
import { Accordion,  AccordionItem,  AccordionHeader, AccordionTrigger, AccordionTitleText, AccordionContentText, AccordionIcon, AccordionContent, } from '@/components/ui/accordion';
import {  styles } from './style';
import { FormContext } from './event';
import { navigateToScreen } from '@/source/constants/Navigations';
import SvgUri from 'react-native-svg-uri';
import { handleSearchClick, handleClearClick, handleCloseClick,transformStyles } from "./event";
import { postApiCall } from '@/source/utlis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { remapProps } from 'react-native-css-interop';
import { loadPageConfig } from '@/source/constants/ConfigLoad';

export const postQuantityApiCall = async(quantity,itemId) => {
  try {
    const getProfitCenterItem = await AsyncStorage.getItem("profit_center")
    let getProfitCenterId = getProfitCenterItem !==null && JSON.parse(getProfitCenterItem)
    const params = {
      "Item_ID":itemId,
      "Item_Quantity": quantity,
      "Location_Id":`${getProfitCenterId.LocationId}`
    }          
    let quantityInfo = await postApiCall("MENU_ORDER","GET_MENU_ORDER_STATUS", params)
    return quantityInfo
  } catch (err) {}
}

class CbBackButton extends React.Component {
  constructor(props) {
    super(props);
    this.id=props.id;
    this.pageID=props.pageID;
    this.pageConfigLoad=props.controlsConfigJson;
    this.source = props.source;
    this.state = {
      ControlConfig: [],
      profitCenterTitle : "" 
    };
  }
  async componentDidMount() {
    await this.loadPageConfig();
    const getProfitCenterItem = await AsyncStorage.getItem("profit_center")

    let getProfitCenter = getProfitCenterItem !==null && JSON.parse(getProfitCenterItem)

    this.setState({profitCenterTitle:getProfitCenter?.LocationName})
  }
  loadPageConfig = async () => {
    try {
      const ControlConfig = await loadPageConfig(this.pageID, this.id);
      this.setState({ ControlConfig });
    } catch (error) {
      console.error("Error loading config:", error);
    }
  };
  render() {
    const { ControlConfig } = this.state;  
     const ImageSource = ControlConfig?.ImageSource || this.source;    
     const Styles=ControlConfig?.Styles;
     const state = this.props.navigation.getState();
     const currentRoute = state.routes[state.index]?.name;
    return (

      <FormContext.Consumer>
        {({ AppConfigJson,setIsExitProfitCenter,menuOrderData,cartData,isPrevCartScreen }) => {
          return (
            <TouchableOpacity onPress={()=>{
              if(currentRoute === "MenuOrder"){
                if(menuOrderData !==null && cartData.length > 0) {
                  setIsExitProfitCenter(true)
                }else{
                  this.props.navigation?.goBack()
                }
              }else if(currentRoute === "Recentorders"){
                if(isPrevCartScreen){
                  navigateToScreen(this.props,"MenuOrder",true,{profileCenterTile:this.state.profitCenterTitle})
                }else{
                  this.props.navigation?.goBack()
                }
              }else{
                this.props.navigation?.goBack()
              }
            }} style={Styles? Styles?.backArrowHeader : styles.backArrowHeader}>
              {
                ImageSource ? <Image source={{ uri: ImageSource }} style={Styles? Styles?.BackIcon : styles.BackIcon} /> : <Image alt='image' source={require("@/assets/images/icons/Back.png")} />
              }
            </TouchableOpacity>
          );
        }}
      </FormContext.Consumer>
    );
  }
}


class CbBox extends React.Component {
  constructor(props) {
    super(props);
    this.id=props.id;
    this.pageID=props.pageId;
    this.Conditionalstyle=props.Conditionalstyle || {};
    this.styles= props.styles || {};
    this.state = {
      ControlConfig: [], 
    };
   
  }
  async componentDidMount() {
    await this.loadPageConfig();
  }

  loadPageConfig = async () => {
    try {
      const ControlConfig = await loadPageConfig(this.pageID, this.id);
      this.setState({ ControlConfig });
    } catch (error) {
      console.error("Error loading config:", error);
    }
  };

  render() {
    const { ControlConfig } = this.state;  
     const Styles=ControlConfig?.Styles || this.styles;
     const StyleProps = transformStyles(Styles);
     const dynamicStyle = StyleProps ? Object.values(StyleProps)[0] : {}; 
     
    return (
      <Box style={[dynamicStyle,this.Conditionalstyle]} >
         {this.props.children}
       </Box>
    );
  }
}


class CbView extends React.Component {
  constructor(props) {
    super(props);
    this.id=props.id;
    this.pageID=props.pageId;
    this.Conditionalstyle=props.Conditionalstyle || {};
    this.styles= props.styles || {};
    this.state = {
      ControlConfig: [], 
    };
   
  }
  async componentDidMount() {
    await this.loadPageConfig();
  }

  loadPageConfig = async () => {
    try {
      const ControlConfig = await loadPageConfig(this.pageID, this.id);
      this.setState({ ControlConfig });
    } catch (error) {
      console.error("Error loading config:", error);
    }
  };

  render() {
    const { ControlConfig } = this.state;  
     const Styles=ControlConfig?.Styles || this.styles;
     const StyleProps = transformStyles(Styles);
     const dynamicStyle = StyleProps ? Object.values(StyleProps)[0] : {}; 
    return (
      <View style={[dynamicStyle,this.Conditionalstyle]} >
         {this.props.children}
       </View>
    );
  }
}



class CbText extends React.Component {
  constructor(props) {
    super(props);
    this.id=props.id;
    this.pageID=props.pageId;
    this.numberOfLines=props.numberOfLines || undefined;
    this.Conditionalstyle=props.Conditionalstyle || {};
    this.strikeThrough=props.strikeThrough || "false";
    this.state = {
      ControlConfig: [], 
    };
  }
  async componentDidMount() {
    await this.loadPageConfig2();
  }
  loadPageConfig2 = async () => {
    try {
      const ControlConfig = await loadPageConfig(this.pageID,this.id);
      this.setState({ ControlConfig });
    } catch (error) {
      console.error("Error loading config:", error);
    }
  };

  render() {    
     const { ControlConfig } = this.state; 
     const StrikeThrough = ControlConfig?.StrikeThrough || this.strikeThrough;
      const Styles=ControlConfig?.Styles;
      const StyleProps = transformStyles(Styles);  
      const dynamicStyle = StyleProps ? Object.values(StyleProps)[0] : {}; 
      const LabelText=ControlConfig?.LabelText || this.props.children;
      console.log("12345",dynamicStyle);
     return (
      <Text strikeThrough={StrikeThrough} style={[dynamicStyle,this.Conditionalstyle]} numberOfLines={this.numberOfLines}>
         {LabelText}
        </Text>
    );
  }
}

class CbHomeButton extends React.Component {
  constructor(props) {
    super(props);
    this.id=props.id;
    this.pageID=props.pageID;
    this.source = props.source;
    this.state = {
      ControlConfig: [], 
    };
  }
  async componentDidMount() {
    await this.loadPageConfig();
  }
  loadPageConfig = async () => {
    try {
      const ControlConfig = await loadPageConfig(this.pageID, this.id);      
      this.setState({ ControlConfig });
    } catch (error) {
      console.error("Error loading config:", error);
    }
  };

  render() {
    const {ControlConfig}= this.state;
     const ImageSource = ControlConfig?.ImageSource || this.source;
     const Styles=ControlConfig?.Styles;
    return (
      <TouchableOpacity onPress={()=>navigateToScreen(this.props,'ProfitCenters')}>
        {
          ImageSource ? <Image source={{ uri: ImageSource}} style={Styles? Styles?.HomeIcon : styles.HomeIcon}/>:<Image alt='image' source={require("@/assets/images/icons/Home.png")} style={Styles? Styles?.HomeIcon : styles.HomeIcon} />
        }
      </TouchableOpacity>
    );
  }
}

 const CbHeaderBackground = async (ControlId,PageId) => { 
  const ControlConfig = await loadPageConfig(PageId,ControlId);
   const BgColor=ControlConfig?.BGColor;
    return {
      headerStyle: {
        backgroundColor: BgColor, 
      },
    };
  };
  const CbHeaderTitle = async (ControlId,Title,PageId) => {
    const ControlConfig  = await loadPageConfig(PageId,ControlId);        
    const Styles=ControlConfig?.Styles?.menuTitle || {};
      return {
         headerTitle:Title,
         headerTitleStyle: {...Styles}
      };
    };

class CbAccordionlist extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.screenName = props.screenName;
    this.getAllSelectedModifiers = props.getAllSelectedModifiers
     
    this.state = {
      selectedModifiers: [],
      isItemSelected:false,
      selectedModifierId:"",
      requireModifiers:{},
      isToastMessageVisiable:false,
      toastMessage:""
    };
  }

  handleCheckboxToggle = (
    item,
    value,
    modifiersResponseData,
    setModifiersResponseData,
    Item_ID,
    Category_Id,
    order
) => {
    const numberMatch = order.Message.match(/\d+/);
    let maxVal = numberMatch ? parseInt(numberMatch[0]) : 0; 

    const updatedModifiersResponseData = { ...modifiersResponseData };

    const categoryIndex = updatedModifiersResponseData?.Categories.findIndex(
        (category) => category.Category_Id === Category_Id
    );

    if (categoryIndex !== -1) {
        const category = updatedModifiersResponseData.Categories[categoryIndex];

        const selectedModifiers = category.Modifiers.filter(modifier => modifier.isChecked).length;
        if(maxVal !== 0){
          if (value && selectedModifiers >= maxVal) {
            this.setState({isToastMessageVisiable:true,toastMessage:`Max limit of ${maxVal} reached for ${order.Category_Name} modifier. Please unselect one to add another.`},() => {
              setTimeout(() => {
                  this.setState({isToastMessageVisiable:false,toastMessage:""})
              }, 6000);
            })
            return;
        }
        }
       
        const modifierIndex = category.Modifiers.findIndex(
            (modifier) => modifier.Modifier_Id === item.Modifier_Id
        );

        if (modifierIndex !== -1) {
            category.Modifiers[modifierIndex].isChecked = value;
        }
    }

    setModifiersResponseData(updatedModifiersResponseData);

    this.getAllSelectedModifiers({ ...item, isChecked: value, Item_ID });
};

  render() {
    const Notfavsource = this.Notfavsource;
    const favsource = this.favsource;
    return (
      <FormContext.Consumer>
        {({ modifiersResponseData, setModifiersResponseData, cartData, singleItemDetails }) => {
          let categoryData = typeof modifiersResponseData?.Categories == "string" ? JSON.parse(modifiersResponseData?.Categories) : modifiersResponseData?.Categories
          const defaultOpenItems = categoryData?.map((_, index) => `item-${index}`);
          return (
            <>
              <CbFlatList
                flatlistData={categoryData}
                children={({ item, index }) => {
                  const order = item
                  return (
                    <Accordion
                      defaultValue={defaultOpenItems}
                      variant="filled"
                      type="single"
                      size="md"
                      style={styles.itemDetailsContainer}
                    >
                      <AccordionItem
                        value={`item-${index}`}
                        style={styles.itemDetailsSubContainer}
                      >
                        <AccordionHeader
                          style={styles.subHeader}
                        >
                          <AccordionTrigger>
                            {({ isExpanded }) => {
                              return (
                                <>
                                  <Box style={styles.recentOrderContainer}>
                                    <AccordionTitleText
                                      style={styles.modifierContainer}
                                    >
                                      {order.Category_Name}
                                      <Box style={styles.quantityMessage}>
                                        {
                                          order.DisplayOption && 
                                          <Text
                                          style={styles.requiredTxt}
                                        >
                                          {` (${(order.DisplayOption)}) `}
                                        </Text>
                                        }
                                        <Text
                                          style={styles.maxAllowedTxt}
                                        >
                                          {order.Message
                                            ? `(${order.Message})`
                                            : ""}
                                        </Text>
                                      </Box>
                                    </AccordionTitleText>
                                    
                                  </Box>
                                  {isExpanded ? (
                                    <AccordionIcon
                                      as={ChevronDownIcon}
                                      size={"md"}
                                      color='#4B5154'
                                      style={styles.collapseIcon}
                                    />
                                  ) : (
                                    <AccordionIcon
                                      as={ChevronUpIcon}
                                      size={"md"}
                                      color='#4B5154'
                                      style={styles.collapseIcon}
                                    />
                                  )}
                                </>
                              );
                            }}
                          </AccordionTrigger>
                        </AccordionHeader>
                        <AccordionContent>
                          <>
                            <FlatList
                              data={order?.Modifiers}
                              keyExtractor={(item) => `${item.Modifier_Id}`}
                              removeClippedSubviews={true}
                              updateCellsBatchingPeriod={100}
                              windowSize={21}
                              onEndReachedThreshold={0.1}
                              renderItem={({ item, index }) => {
                                const itemIndex = index
                                return (
                                  <Box
                                    key={itemIndex}
                                    style={styles.orderSubContainer}
                                  >
                                    <Checkbox
                                      isChecked={item.isChecked}
                                      onChange={(value) => {
                                        this.setState((prevState) => {
                                          const filteredModifiers = prevState.selectedModifiers.filter(
                                            (modifier) => modifier.Modifier_Id !== item.Modifier_Id
                                          );
                                          return {
                                            selectedModifiers: [...filteredModifiers, { ...item, isChecked: value }],
                                            isItemSelected: value,
                                            selectedModifierId: item.Modifier_Id
                                          };
                                        }, () => {
                                          this.handleCheckboxToggle(
                                            item,
                                            value,
                                            modifiersResponseData,
                                            setModifiersResponseData,
                                            singleItemDetails.Item_ID,
                                            order.Category_Id,
                                            order
                                          )
                                        })
                                      }}
                                    >
                                      <CheckboxIndicator
                                        style={styles.CheckboxIndicator}
                                      >
                                        <CheckboxIcon
                                          as={CheckIcon}
                                          style={{
                                            color: "#707070",
                                            width: 17,
                                            height: 17,
                                          }}
                                        />
                                      </CheckboxIndicator>
                                      <CheckboxLabel style={styles.itemNameTxt}>
                                        <Text>{item.Modifier_Name}</Text>
                                      </CheckboxLabel>
                                    </Checkbox>
                                    <AccordionContentText
                                      style={styles.priceMainTxt}
                                    >
                                      {
                                        (item.Price !== null && parseFloat(item.Price) !== 0) &&
                                        <Text>{`$${parseFloat(item.Price).toFixed(2)}`}</Text>
                                      }

                                    </AccordionContentText>
                                  </Box>
                                )
                              }}
                            />
                            {
                              this.state.isToastMessageVisiable &&
                              <CbToastMessage
                                message={this.state.toastMessage}
                                isToastMessageVisiable={this.state.isToastMessageVisiable}
                                transparent={true}
                                onRequestClose={() => this.setState({ isToastMessageVisiable: !this.state.isToastMessageVisiable })}
                                closePreviewModal ={() => this.setState({ isToastMessageVisiable: !this.state.isToastMessageVisiable })}
                              />
                            }
                          </>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  );
                }}
              />
            </>
          );
        }}
      </FormContext.Consumer>
    );
  }
}

class CbRecentAccordion extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.screenName = props.screenName;
    this.favsource = props.favsource || "";
    this.Notfavsource = props.Notfavsource || "";
    this.componentData = props.componentData || [];

    this.state = {
      isToastMessageVisiable: false,
      toastMessage: "",
      cartData: props.cartData || [],  // Store cart data in state

    };
  }

  
  

  handleReorder = (order, cartData, addItemToCartBtn, updateCartItemQuantity) => {
    console.log("Reordering items from Order ID:", order.OrderId);
    console.log("Orders", this.componentData)
  
    if (!order.Items || order.Items.length === 0) {
      console.log("No items found for reorder.");
      return;
    }
  
    order.Items.forEach((item) => {
      const existingItem = cartData.find(cartItem => cartItem.Item_ID === item.Item_ID);
  
      const itemWithModifiers = {
        ...item,
        quantity: 1,
        selectedModifiers: item.Modifiers || [],  // Ensure modifiers are added
      };
      console.log('Modifiers', item.Modifiers);
  
      if (existingItem) {
        console.log(`Increasing quantity for: ${item.Item_Name}`);
        updateCartItemQuantity(existingItem, existingItem.quantity + 1);
      } else {
        console.log("Adding to cart:", item.Item_Name);
        addItemToCartBtn(itemWithModifiers);
      }
    });
  
    this.setState({
      isToastMessageVisiable: true,
      toastMessage: `Added/Reordered ${order.Items.length} items!`,
    });
  
    setTimeout(() => {
      this.setState({ isToastMessageVisiable: false, toastMessage: "" });
    }, 2000);
  };
  
  
  render() {
    const Notfavsource = this.Notfavsource;
    const favsource = this.favsource;

    return (
      <FormContext.Consumer>
        {({ cartData, singleItemDetails, addToCart }) => {
          if (JSON.stringify(cartData) !== JSON.stringify(this.state.cartData)) {
      this.setState({ cartData }); 
    }

          
          console.log('cart data', cartData);
          const categoryData =
            typeof this.componentData?.CompletedOrders === "string"
              ? JSON.parse(this.componentData?.CompletedOrders)
              : this.componentData?.CompletedOrders;

          const defaultOpenItems = categoryData?.map(
            (_, index) => `item-${index}`
          );

          return (
            <>
              <CbFlatList
                flatlistData={categoryData}
                children={({ item, index }) => {
                  const order = item;
                  return (
                    <Accordion
                      defaultValue={defaultOpenItems}
                      variant="filled"
                      type="single"
                      size="md"
                      style={styles.roAccordion}
                    >
                      <AccordionItem
                        value={`item-${index}`}
                        style={styles.itemDetailsSubContainer}
                      >
                        <AccordionHeader style={styles.roAccordionHeader}>
                          <AccordionTrigger>
                            {({ isExpanded }) => (
                              <>
                                <Box key={index} style={styles.roAccordionHeading}>
                                  <Image
                                    alt="image"
                                    source={require("@/assets/images/icons/ROdate.png")}
                                  />
                                  <AccordionTitleText style={styles.roAccordionTitleText}>
                                    Ordered Date: {order.OrderDate}
                                  </AccordionTitleText>
                                </Box>
                                {isExpanded ? (
                                  <AccordionIcon
                                    as={ChevronDownIcon}
                                    size={"md"}
                                    color="#4B5154"
                                    style={styles.collapseIcon}
                                  />
                                ) : (
                                  <AccordionIcon
                                    as={ChevronUpIcon}
                                    size={"md"}
                                    color="#4B5154"
                                    style={styles.collapseIcon}
                                  />
                                )}
                              </>
                            )}
                          </AccordionTrigger>
                        </AccordionHeader>
                        <AccordionContent>
{order.Items?.map((item, itemIndex) =>{
  return(
  <Box key={item.Item_ID}>
    <Box style={styles.roAccordionContentouterbox}>
      <Box style={styles.roAccordionContentItembox}>
        <Text style={styles.roItemName} strikeThrough={!item.IsAvailable}>
          {item.Item_Name}
        </Text>
        <Text style={styles.roItemprice}>{`$${item.Price}`}</Text>
      </Box>
      <Box
  style={[
    styles.roImagescetion,
    this.state.cartData.some(cartItem => cartItem.Item_ID === item.Item_ID && cartItem.quantity > 0)
      ? { width: 90 }
      : {}
  ]}
>      <TouchableOpacity
          onPress={() => {
            item.IsFavorite = !item.IsFavorite; // Toggle favorite
            this.setState({}); // Force re-render
          }}
        >
          <Image
            alt="favorite"
            source={
              item.IsFavorite
                ? require("@/assets/images/icons/Fav.png")
                : require("@/assets/images/icons/Notfav.png")
            }
            style={styles.roItemImage}
          />
        </TouchableOpacity>
        <CbRecentAddToCart
          mealItemDetails={item}
          style={styles.roItemButton}
          onPress={() => addToCart(item)}
        />
      </Box>
    </Box>

    {/* Remove Divider after the last item */}
    {itemIndex !== order.Items.length - 1 && <Divider />}
  </Box>
  )
} 
)}
                          {order.IsReorder && (
                            <FormContext.Consumer>
    {({ cartData, addItemToCartBtn, updateCartItemQuantity }) => (
      <Button
        variant="outline"
        style={styles.roReoderButton}
        onPress={() => this.handleReorder(order, cartData, addItemToCartBtn, updateCartItemQuantity)}
      >
        <ButtonText style={styles.roReordertext} numberOfLines={1} ellipsizeMode="tail">
          Re-Order
        </ButtonText>
      </Button>
    )}
  </FormContext.Consumer>
)}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  );
                }}
              />
            </>
          );
        }}
      </FormContext.Consumer>
    );
  }
}

class CbImage extends React.Component {
  constructor(props) {
    super(props);
     this.id=props.id;
     this.pageID=props.pageId;
    this.source = props.source || "";
    this.imageJsx=props.imageJsx;
    this.style = props.style || "";
    this.state = {
      ControlConfig: [], 
    };
  }
  async componentDidMount() {
    await this.loadPageConfig2();
  }
  loadPageConfig2 = async () => {
    try {
      const ControlConfig = await loadPageConfig(this.pageID,this.id);
      this.setState({ ControlConfig });
    } catch (error) {
      console.error("Error loading config:", error);
    }
  };

  render() {
    const {ControlConfig} = this.state;
    const source = ControlConfig?.ImageSource  || this.source;
    const Styles=ControlConfig?.Styles;
    const StyleProps = transformStyles(Styles);  
    const dynamicStyle = StyleProps ? Object.values(StyleProps)[0] : {}; 
    const jsx = this.imageJsx;
    
    console.log("!@##$$",jsx,dynamicStyle)
    if (source) {

      if (source.endsWith('.svg')) {
        
        return <SvgUri source={{ uri: source }}  />;
      } else {

        return <Image alt='image' source={{ uri: source }}  style={dynamicStyle}/>;
      }
    } else if (React.isValidElement(jsx)) {
      // Clone the element and merge styles
      return React.cloneElement(this.imageJsx, {
        style: [jsx.props.style, dynamicStyle], // Merge styles
      });
    } else {
      return null; // Return nothing if no image source or JSX is provided
    }
  }
}

class CbFloatingButton extends React.Component {
  constructor(props) {
    super(props);
    this.cartQuantity = props.cartQuantity
    this.screenProps = props.props
  }
  render() {
    return (
      <FormContext.Consumer>
      {({cartData,modifierCartItemData}) => {
          const getFinalQuantity = cartData &&  cartData.reduce((total,prev) => total+prev.quantity,0)
          return (
            <View style={styles.floatingContainer}>
              <TouchableOpacity style={styles.floatingBtn} onPress={() => navigateToScreen(this.screenProps, "MyCart", true,{profileCenterTile:this.screenProps?.route?.params?.profileCenterTile})}>
                <Image source={require("@/assets/images/icons/cartIcon2x.png")} style={styles.cartIcon} />
                <Text style={[styles.cartCountTxt,{right:getFinalQuantity >= 10?4:10}]}>{getFinalQuantity? getFinalQuantity:0}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </FormContext.Consumer>
    );
  }
}


class CbRecentAddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.mealItemDetails = props.mealItemDetails
    this.style = props.style
    this.cartStyle = props.cartStyle
    this.state ={
      isAvailable : 0 ,
      IsModifierAvailable:0
    }
    this.state = {
      ControlConfig: [], 
    };
  }
  // async componentDidMount() {
  //   await this.loadPageConfig2();
  // }
  // loadPageConfig2 = async () => {
  //   try {
  //     const ControlConfig = await loadPageConfig(this.pageID,this.id);
  //     this.setState({ ControlConfig });
  //   } catch (error) {
  //     console.error("Error loading config:", error);
  //   }
  // };
  commonStyles = (isAvailable,IsDisable,primaryColor,secondaryColor) => {
    if(isAvailable ===1 && IsDisable ===0){
      return primaryColor
    }else{
      return secondaryColor
    }
  }


  handleAddToCartBtn = async (quantity, storeSingleItem, closePreviewModal, addItemToCartBtn, increaseQuantity, itemDataVisible) => {
    console.log("mealItemDetails:", this.mealItemDetails); // Debugging
    
    let quantityInfo = await postQuantityApiCall(quantity, this.mealItemDetails?.Item_ID);
    
    if (quantityInfo.statusCode === 200) {
      this.setState({ 
        isAvailable: quantityInfo?.response.IsAvailable, 
        IsModifierAvailable: quantityInfo?.response.IsModifierAvailable 
      }, () => {
        if (this.state.IsModifierAvailable === 1) {
          storeSingleItem(this.mealItemDetails);
          if (itemDataVisible) {
            increaseQuantity(this.mealItemDetails, false);
          } else {
            closePreviewModal();
            increaseQuantity(this.mealItemDetails, false);
          }
        } else {
          console.log("Adding item to cart:", this.mealItemDetails); // Debugging
          addItemToCartBtn(this.mealItemDetails);
        }
      });
    } else {
      console.log("Quantity API call failed:", quantityInfo);
    }
  };

  modifierIncDecBtn = async (itemDataVisible,cartData,updateModifierItemQuantity,modifierQuantity, updateCartItemQuantity,cartQuantity,operation) => {
       let isItemAvailableInCart = false
        cartData?.forEach((items) => {
            if(items.Item_ID === this.mealItemDetails.Item_ID ){
              isItemAvailableInCart = true
            }
        })
    let requiredQuantity = this.state.IsModifierAvailable === 1 ? modifierQuantity:cartQuantity
    let quantityInfo = await postQuantityApiCall(requiredQuantity, this.mealItemDetails?.Item_ID)
    if(quantityInfo.statusCode ==200){
      this.setState({ isAvailable: quantityInfo?.response.IsAvailable, IsModifierAvailable: quantityInfo?.response.IsModifierAvailable }, () => {
        if (this.state.IsModifierAvailable ===1) {
          if(operation === "decrement"){
            if(isItemAvailableInCart){
              updateModifierItemQuantity(this.mealItemDetails, modifierQuantity-1)
              updateCartItemQuantity(this.mealItemDetails, cartQuantity - 1);
            }else{
              updateModifierItemQuantity(this.mealItemDetails, modifierQuantity-1)
            }      
        }else{
          if(this.state.isAvailable ===1){
            if(isItemAvailableInCart){
              updateModifierItemQuantity(this.mealItemDetails, modifierQuantity+1)
              updateCartItemQuantity(this.mealItemDetails, cartQuantity + 1);
            }else{
              updateModifierItemQuantity(this.mealItemDetails, modifierQuantity+1)
            }   
          }else{
              Alert.alert(quantityInfo?.response?.ResponseMessage)
            }
          }
        } else {
          if (operation === "decrement") {
            if(itemDataVisible){
              updateModifierItemQuantity(this.mealItemDetails, modifierQuantity-1)
            }else{
              updateCartItemQuantity(this.mealItemDetails, cartQuantity - 1);
              updateModifierItemQuantity(this.mealItemDetails, cartQuantity-1);
            }
          } else {
            if (this.state.isAvailable === 1) {
              if(itemDataVisible){
                updateModifierItemQuantity(this.mealItemDetails, modifierQuantity+1)
              }else{
                updateCartItemQuantity(this.mealItemDetails, cartQuantity + 1);
                updateModifierItemQuantity(this.mealItemDetails, cartQuantity+1)
              }
            } else {
              Alert.alert(quantityInfo?.response?.ResponseMessage);
            }
          }
        }
      });
    } else {
      console.log("Quantity API call failed:", quantityInfo);
    }
  }
  renderIcons = (quantity, modifierQuantity,itemDataVisible) => {
    if(itemDataVisible){
        if(modifierQuantity === 1){
          return <Icon as={TrashIcon} color="#5773a2" size="md" style={{ width: 23, height: 23 }} />
        }else{
          return <Icon as={RemoveIcon} color="#5773a2" size="md" style={{ width: 23, height: 23 }} />
        }
    }else{
      if(quantity === 1){
        return <Icon as={TrashIcon} color="#5773a2" size="md" style={{ width: 23, height: 23 }} />
      } else{
        return <Icon as={RemoveIcon} color="#5773a2" size="md" style={{ width: 23, height: 23 }} />
      }
    }
  };

  renderAddToCartBtn = (contextProps) => {
     
    const {modifiersResponseData,itemDataVisible, cartData, addItemToCartBtn, updateCartItemQuantity,closePreviewModal,storeSingleItem,increaseQuantity,updateModifierItemQuantity,modifierCartItemData } = contextProps;
    const IsAvailable = this.mealItemDetails.IsAvailable;
    const IsDisable = this.mealItemDetails.IsDisable
    const cartItem = cartData && cartData?.find((item) => item.Item_ID === this.mealItemDetails.Item_ID);
    const quantity = cartItem ? cartItem.quantity : 0;
    const modifierCartItem = modifierCartItemData&& modifierCartItemData?.find((item) => item.Item_ID === this.mealItemDetails.Item_ID);
    const modifierQuantity = modifierCartItem ? modifierCartItem?.quantity : 0;
    
    if ( quantity === 0 && modifierQuantity === 0) {
      return (
        <TouchableOpacity
          style={[this.style ? this.style : styles.addItemToCartBtn, 
            { borderColor:  this.commonStyles(IsAvailable,IsDisable, "#5773a2", "#ABABAB") },
            {backgroundColor: "#fff"},
            {borderRadius:5},
            {borderWidth:1}
          ]}
          activeOpacity={0.5}
          onPress={() => this.handleAddToCartBtn("1",storeSingleItem,closePreviewModal,addItemToCartBtn,increaseQuantity,itemDataVisible)}
          disabled={IsAvailable === 1 && IsDisable === 0?false:true}
        >
          <Icon as={AddIcon} color={this.commonStyles(IsAvailable,IsDisable, "#5773a2", "#4B515469")} style={{width:25,height:25}}/>
        </TouchableOpacity>
      );
    } else {
      return (
        <Box style={[this.cartStyle? styles.operationBtn2:styles.operationBtn]}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => this.modifierIncDecBtn(itemDataVisible,cartData,updateModifierItemQuantity,modifierQuantity,updateCartItemQuantity,quantity,"decrement")}
          >
            {
              this.renderIcons(quantity,modifierQuantity,itemDataVisible)
            }
          </TouchableOpacity>

          {/* <Text style={styles.quantityTxt}>{quantity ? quantity : modifierQuantity}</Text> */}
          <Text style={styles.quantityTxt}>{modifierQuantity ? modifierQuantity : quantity}</Text>

          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => this.modifierIncDecBtn(itemDataVisible,cartData,updateModifierItemQuantity,modifierQuantity,updateCartItemQuantity,quantity,"increment")}
          >
            <Icon as={AddIcon} color="#5773a2" size={"xl"} style={{width:25,height:25}}/>
          </TouchableOpacity>
        </Box>
      );
    }
  };
  render() {
    return (
      <FormContext.Consumer>
      {(contextProps) => {
        
        return (
          <>
          {this.renderAddToCartBtn(contextProps)}
          </>
        );
      }}
    </FormContext.Consumer>
    );
  }
}

class CbAddToCartButton extends React.Component {
  constructor(props) {
    super(props);
    this.id=props.id;
    this.pageID=props.pageId;
    this.mealItemDetails = props.mealItemDetails
    this.style = props.style
    this.cartStyle = props.cartStyle
    this.state ={
      isAvailable : 0 ,
      IsModifierAvailable:0
    }
    this.state = {
      ControlConfig: [], 
    };
  }
  async componentDidMount() {
    await this.loadPageConfig2();
  }
  loadPageConfig2 = async () => {
    try {
      const ControlConfig = await loadPageConfig(this.pageID,this.id);
      this.setState({ ControlConfig });
    } catch (error) {
      console.error("Error loading config:", error);
    }
  };
  
  commonStyles = (isAvailable,IsDisable,primaryColor,secondaryColor) => {
    if(isAvailable ===1 && IsDisable ===0){
      return primaryColor
    }else{
      return secondaryColor
    }
  }


  handleAddToCartBtn = async (quantity, storeSingleItem, closePreviewModal, addItemToCartBtn, increaseQuantity, itemDataVisible) => {
    console.log("mealItemDetails:", this.mealItemDetails); 
    let quantityInfo = await postQuantityApiCall(quantity, this.mealItemDetails?.Item_ID);
    
    if (quantityInfo.statusCode === 200) {
      this.setState({ 
        isAvailable: quantityInfo?.response.IsAvailable, 
        IsModifierAvailable: quantityInfo?.response.IsModifierAvailable 
      }, () => {
        if (this.state.IsModifierAvailable === 1) {
          storeSingleItem(this.mealItemDetails);
          if (itemDataVisible) {
            increaseQuantity(this.mealItemDetails, false);
          } else {
            closePreviewModal();
            increaseQuantity(this.mealItemDetails, false);
          }
        } else {
          console.log("Adding item to cart:", this.mealItemDetails); 
          addItemToCartBtn(this.mealItemDetails);
        }
      });
    } else {
      console.log("Quantity API call failed:", quantityInfo);
    }
  };

  modifierIncDecBtn = async (itemDataVisible,cartData,updateModifierItemQuantity,modifierQuantity, updateCartItemQuantity,cartQuantity,operation) => {
       let isItemAvailableInCart = false
        cartData?.forEach((items) => {
            if(items.Item_ID === this.mealItemDetails.Item_ID ){
              isItemAvailableInCart = true
            }
        })
    let requiredQuantity = this.state.IsModifierAvailable === 1 ? modifierQuantity:cartQuantity
    let quantityInfo = await postQuantityApiCall(requiredQuantity, this.mealItemDetails?.Item_ID)
    if(quantityInfo.statusCode ==200){
      this.setState({ isAvailable: quantityInfo?.response.IsAvailable, IsModifierAvailable: quantityInfo?.response.IsModifierAvailable }, () => {
        if (this.state.IsModifierAvailable ===1) {
          if(operation === "decrement"){
            if(isItemAvailableInCart){
              updateModifierItemQuantity(this.mealItemDetails, modifierQuantity-1)
              updateCartItemQuantity(this.mealItemDetails, cartQuantity - 1);
            }else{
              updateModifierItemQuantity(this.mealItemDetails, modifierQuantity-1)
            }      
        }else{
          if(this.state.isAvailable ===1){
            if(isItemAvailableInCart){
              updateModifierItemQuantity(this.mealItemDetails, modifierQuantity+1)
              updateCartItemQuantity(this.mealItemDetails, cartQuantity + 1);
            }else{
              updateModifierItemQuantity(this.mealItemDetails, modifierQuantity+1)
            }   
          }else{
              Alert.alert(quantityInfo?.response?.ResponseMessage)
            }
          }
        } else {
          if (operation === "decrement") {
            if(itemDataVisible){
              updateModifierItemQuantity(this.mealItemDetails, modifierQuantity-1)
            }else{
              updateCartItemQuantity(this.mealItemDetails, cartQuantity - 1);
              updateModifierItemQuantity(this.mealItemDetails, cartQuantity-1);
            }
          } else {
            if (this.state.isAvailable === 1) {
              if(itemDataVisible){
                updateModifierItemQuantity(this.mealItemDetails, modifierQuantity+1)
              }else{
                updateCartItemQuantity(this.mealItemDetails, cartQuantity + 1);
                updateModifierItemQuantity(this.mealItemDetails, cartQuantity+1)
              }
            } else {
              Alert.alert(quantityInfo?.response?.ResponseMessage);
            }
          }
        }
      })
    }
  }
  renderIcons = (quantity, modifierQuantity,itemDataVisible) => {
    const{ ControlConfig }=this.state;
    const RemoveIcon=ControlConfig.RemoveIconSource;
    const TrashIcon=ControlConfig.DeleteIconSource;
    const Styles=ControlConfig?.Styles;
     const StyleProps = transformStyles(Styles);
    if(itemDataVisible){
      if(quantity > 1){
        return RemoveIcon ? <Image source={{ uri: RemoveIcon}} style={StyleProps?.addCartIcons || styles.addCartIcons} />:<Image alt='image' source={require("@/assets/images/icons/Minus_Icon.png")} style={styles.addCartIcons} />
      }else{
        if(modifierQuantity === 1){
          return TrashIcon ? <Image source={{ uri: TrashIcon}} style={StyleProps?.addCartIcons || styles.addCartIcons} />:<Image alt='image' source={require("@/assets/images/icons/Trash_Icon.png")} style={styles.addCartIcons} />
        }else{
          return RemoveIcon ? <Image source={{ uri: RemoveIcon}} style={StyleProps?.addCartIcons || styles.addCartIcons} />:<Image alt='image' source={require("@/assets/images/icons/Minus_Icon.png")} style={styles.addCartIcons} />
        }
      }
    }else{
      if(quantity === 1){
        return TrashIcon ? <Image source={{ uri: TrashIcon}} style={StyleProps?.addCartIcons || styles.addCartIcons} />:<Image alt='image' source={require("@/assets/images/icons/Trash_Icon.png")} style={styles.addCartIcons} />
      } else{
        return RemoveIcon ? <Image source={{ uri: RemoveIcon}} style={StyleProps?.addCartIcons || styles.addCartIcons}/>:<Image alt='image' source={require("@/assets/images/icons/Minus_Icon.png")} style={styles.addCartIcons} />
      }
    }
  };

  renderAddToCartBtn = (contextProps) => {

    const {modifiersResponseData,itemDataVisible, cartData, addItemToCartBtn, updateCartItemQuantity,closePreviewModal,storeSingleItem,increaseQuantity,updateModifierItemQuantity,modifierCartItemData } = contextProps;
    const IsAvailable = this.mealItemDetails.IsAvailable;
    const IsDisable = this.mealItemDetails.IsDisable
    const cartItem = cartData && cartData?.find((item) => item.Item_ID === this.mealItemDetails.Item_ID);
    const quantity = cartItem ? cartItem.quantity : 0;
    const modifierCartItem = modifierCartItemData&& modifierCartItemData?.find((item) => item.Item_ID === this.mealItemDetails.Item_ID);
    const modifierQuantity = modifierCartItem ? modifierCartItem?.quantity : 0;
    const{ ControlConfig }=this.state;
    const AddIcon=ControlConfig.AddIconSource;
    const Styles=ControlConfig?.Styles;
    const PrimaryColor=ControlConfig?.PrimaryColor;
    const SecondaryColor=ControlConfig?.SecondaryColor;
     const StyleProps = transformStyles(Styles);
    if ( quantity === 0 && modifierQuantity === 0) {
      return (
        <Box style={[StyleProps?.addItemToCartBtn || styles.addItemToCartBtn, 
          { borderColor: this.commonStyles(IsAvailable,IsDisable, PrimaryColor, SecondaryColor) },
          
        ]}>
        <TouchableOpacity          
          activeOpacity={0.5}
          onPress={() => this.handleAddToCartBtn("1",storeSingleItem,closePreviewModal,addItemToCartBtn,increaseQuantity,itemDataVisible)}
          disabled={IsAvailable === 1 && IsDisable === 0?false:true}
        >
          {AddIcon ? ( <Image source={{ uri: AddIcon}} style={[StyleProps?.addCartIcons || styles.addCartIcons,(IsAvailable === 0 && IsDisable === 1) ? { opacity: 1.2 } : {}]} /> ) : (<Image alt='image' source={require("@/assets/images/icons/Plus_Icon.png")} style={styles.addCartIcons} />)}
        </TouchableOpacity>
        </Box>
      );
    } else {
      return (
        <Box style={[this.cartStyle? (StyleProps?.operationBtn2 || styles.operationBtn2):(StyleProps?.operationBtn || styles.operationBtn)]}>
          <TouchableOpacity
            style={StyleProps?.iconBtn || styles.iconBtn}
            onPress={() => this.modifierIncDecBtn(itemDataVisible,cartData,updateModifierItemQuantity,modifierQuantity,updateCartItemQuantity,quantity,"decrement")}
          >
            {
              this.renderIcons(quantity,modifierQuantity,itemDataVisible)
            }
          </TouchableOpacity>
          <Text style={StyleProps?.quantityTxt || styles.quantityTxt}>{quantity >= 1 ? quantity : modifierQuantity}</Text>
          <TouchableOpacity
            style={StyleProps?.iconBtn || styles.iconBtn}
            onPress={() => this.modifierIncDecBtn(itemDataVisible,cartData,updateModifierItemQuantity,modifierQuantity,updateCartItemQuantity,quantity,"increment")}
          >
            {AddIcon ? ( <Image source={{ uri: AddIcon}} style={[StyleProps?.addCartIcons || styles.addCartIcons,(IsAvailable === 0 && IsDisable === 1) ? { opacity: 1.2 } : {} ]} /> ) : (<Image alt='image' source={require("@/assets/images/icons/Plus_Icon.png")} style={styles.addCartIcons} />)}
          </TouchableOpacity>
        </Box>
      );
    }
  };
  render() {
    return (
      <FormContext.Consumer>
      {(contextProps) => {

        return (
          <>
          {this.renderAddToCartBtn(contextProps)}
          </>
        );
      }}
    </FormContext.Consumer>
    );
  }
}


class cbSearchbox extends React.Component {
  constructor(props) {
    super(props);
    this.id=props.id;
    this.pageID=props.pageId
    this.controlsConfigJson=props.controlsConfigJson;
    this.search=props.Searchsource || "";
    this.backarrow=props.Backarrowsource || "";
    this.close=props.closesource || "";
    this.isRecentOrderOpen = props.isRecentOrderOpen || false
    this.state = {
      showSearchInput: false,
      searchValue: "",
      ControlConfig: [],
    };
    this.inputRef = React.createRef();
  }

  handleFocus = () => {
    if (this.inputRef?.current) {
      this.inputRef.current.focus();
    }
  };

  handleSearch = (value) => {
    this.setState({ searchValue: value });
    this.props.onSearch(value); // Notify parent
  };

  handleClear = () => {
    this.setState({ searchValue: "" });
    this.props.onSearch(""); // Reset search results
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.isRecentOrderOpen !== this.props.isRecentOrderOpen &&
      this.props.isRecentOrderOpen
    ) {
      this.setState({ showSearchInput: true }, () => {
        if (this.inputRef.current) {
          this.inputRef.current.focus();
        }
      });
    }
  }
  async componentDidMount() {
    await this.loadPageConfig();
  }
  loadPageConfig = async () => {
    try {
      const ControlConfig = await loadPageConfig(this.pageID, this.id);      
      this.setState({ ControlConfig });
    } catch (error) {
      console.error("Error loading config:", error);
    }
  };
  
  render() {
    const { showSearchInput, searchValue,ControlConfig } = this.state;
    const Searchsource=ControlConfig?.SearchIconSource || this.search;    
    const Closesource=ControlConfig?.CloseIconSource || this.close;
      const Backarrowsource = ControlConfig?.BackarrowIconSource || this.backarrow;
      const placeholderprop= ControlConfig?.PlaceHolder;
    const Styles=ControlConfig?.Styles;
    const StyleProps = transformStyles(Styles); 
    return (
      <Box style={ showSearchInput ? (StyleProps?.SearchExpand || styles.SearchExpand) : (StyleProps?.SearchIcon || styles.SearchIcon)}>
        {showSearchInput ? (
          <Box style={StyleProps? StyleProps?.searchBarMainContainer : styles.searchBarMainContainer}>
            <TouchableOpacity   onPress={() => handleCloseClick(
  this.setState.bind(this), 
  this.props.onSearchActivate, 
  this.props.onSearch, // handleClear function
  this.props.onBackPress // New function to reset the list
)}
 style={{ marginLeft: 10 }} >
              {
                Backarrowsource ? <Image source={{ uri: Backarrowsource}} style={StyleProps? StyleProps?.BackArrowIcon : styles.BackArrowIcon}/>:<Image alt='image' source={require("@/assets/images/icons/BackArrow.png")} />
              }
            </TouchableOpacity>
            <Input  style={StyleProps? StyleProps?.SearchinputBox : styles.SearchinputBox}>
              <InputField
  ref={this.inputRef}
  value={searchValue}
  placeholder={placeholderprop}
  onChangeText={(value) => this.handleSearch(value)}
  autoFocus={true} // Ensure autoFocus is enabled
              />
            </Input>
            {searchValue && (
              <TouchableOpacity  
  onPress={() => handleClearClick(
    this.setState.bind(this), 
    this.props.onSearch // Reset search results & show default list
  )} 
> 
                {
                Closesource? <Image source={{ uri: Closesource}} style={StyleProps? StyleProps?.CloseIcon : styles.CloseIcon}/>:<Image alt='image' source={require("@/assets/images/icons/Close.png")} />
                }
              </TouchableOpacity>
            )}
          </Box>
        ) : (
          <TouchableOpacity
  onPress={() => {
    this.setState({ showSearchInput: true });
    if (this.props.onSearchPress) {
      this.props.onSearchPress(); // Notify MenuOrderUI.js
    }
  }}          >
            {
          Searchsource ? <Image source={{ uri: Searchsource}} style={StyleProps? StyleProps?.SearchIconImage : styles.SearchIconImage}/>: <Image alt='image' source={require("@/assets/images/icons/Search.png")} />
            }
          </TouchableOpacity>
        )}
      </Box>
    );
  }
}



class cbButton extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.buttonText = props.text || "Button";
    this.variant = props.variant || "solid";
    this.onPress = props.onPress;
    this.customStyles=props.customStyles || '';
  }

  render() {

    const buttonStyle=this.customStyles.buttonStyle;
    const buttonTextStyle=this.customStyles.buttontextStyle;
    
    return (
      <Button variant={this.variant} onPress={()=> this.onPress()} style={buttonStyle}  >
          <ButtonText style={buttonTextStyle} numberOfLines={1}  ellipsizeMode="tail">{this.buttonText}</ButtonText>
      </Button>
    );
  }
}

class cbCheckBox extends React.Component {
  constructor(props) {
    super();
    this.id=props.id;
    this.size = props.size || 'md';
    this.isDisabled=props.isDisabled || false;
    this.isInvalid=props.isInvalid || false;
    this.checkBoxLabel=props.Label || '';
    this.customStyles=props.customStyles || '';
  }

  render() {
    const styles=this.customStyles;

    return (
      <Checkbox size={this.size} isInvalid={this.isInvalid} isDisabled={this.isDisabled}>
      <CheckboxIndicator >
        <CheckboxIcon as={CheckIcon} />
      </CheckboxIndicator>
      <CheckboxLabel>{this.checkBoxLabel}</CheckboxLabel>
    </Checkbox>    
    );
  }
}



class cbImageBackground extends React.Component {
  constructor(props) {
    super();
    this.id=props.id;
    this.pageID=props.pageId;
    this.source = props.source || null;
    this.styles= props.styles || null;
    this.state = {
      ControlConfig: [], 
    };
  }
  async componentDidMount() {
    await this.loadPageConfig();
  }
  loadPageConfig = async () => {
    try {
      const ControlConfig = await loadPageConfig(this.pageID, this.id);
    
      this.setState({ ControlConfig });
    } catch (error) {
      console.error("Error loading config:", error);
    }
  };

  render() {
    const { ControlConfig }=this.state;
    const { children } = this.props;
    const sourceprop = ControlConfig?.source  || this.source;
    const Styles = ControlConfig?.Styles ||  this.styles;
    const StyleProps = transformStyles(Styles);
    return (
      <ImageBackground source={sourceprop} alt='login' style={StyleProps?.BGImage} >
        {children}
      </ImageBackground>
    );
  }
}

class cbRadioButton extends React.Component {

  constructor(props) {
    super(props);
      this.id=props.id;
    this.alignment = props.alignment || 'vertical';
      this.Label= props.Label || '';
      this.options= Array.isArray(props.options) ? props.options : [];
  }


  render() {
    const Stack = this.alignment === 'vertical' ? VStack : HStack;
    return (

      <FormControl>
      <VStack  space="md">
          <FormControlLabel>
            <FormControlLabelText>{this.selectLabel}</FormControlLabelText>
          </FormControlLabel>
          <RadioGroup>
            <Stack space="sm">
              {this.options.map((item, index) => (
                <Radio key={index} value={item.value} size="md" >
                  <RadioIndicator>
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                  <RadioLabel>{item.label}</RadioLabel>
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </VStack >
      </FormControl>

    );
  }
}



class cbSelect extends React.Component {
  constructor(props) {
    super();
    this.id=props.id;
    this.placeholder= props.placeholder || 'Select';
    this.isRequired=props.isRequired || false;
    this.isInvalid=props.isInvalid || false;
    this.selectLabel=props.Label || '';
    this.selectItems = Array.isArray(props.selectItems) ? props.selectItems : [];
    this.style = props.style
    this.isTimeModalSelected = props.isTimeModalSelected 
    this.state = {
      isSelected:false
    }
  }

  render() {
    const selectLabelprop =  this.selectLabel;
    const placeholderprop =  this.placeholder;
    const selectItems =  this.selectItems;
    return (
<FormControl isRequired={this.isRequired} isInvalid={this.isInvalid} style={this.style}>
        <FormControlLabel>
          <FormControlLabelText>{selectLabelprop}</FormControlLabelText>
        </FormControlLabel>
       <TouchableOpacity>
       <Select>
          <SelectTrigger>
            <SelectInput placeholder={placeholderprop} />
          <SelectIcon  as={ChevronDownIcon} width={16} height={16} />
          </SelectTrigger>
          <SelectPortal isOpen={this.state.isSelected}>
            <SelectBackdrop />
            <SelectContent>
              {selectItems.map((item, index) => (
            <SelectItem key={index} label={item.label} value={item.value} onPress={()=>this.setState({isSelected:false},()=>console.log(item.value, "=== > selectedItem"))}/>
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
       </TouchableOpacity>
        <FormControlError>
          <FormControlErrorText></FormControlErrorText>
        </FormControlError>
      </FormControl>      
    );
  }
}


class cbInput extends React.Component {

  constructor(props) {
    super(props);
    this.formId = props.formId;
    this.id = props.id;
    this.labelText = props.labelText || "";
    this.variant = props.variant || "outline";
    this.input = props.input || 'text';
    this.placeholder = props.placeholder || '';
    this.errorMessage = props.errorMessage || '';
    this.isReadOnly = props.isReadOnly || false;
    this.isDisabled = props.isDisabled || false;
    this.isRequired = props.isRequired || false;
    this.isInvalid = props.isInvalid || false;
    this.setFormFieldData = typeof props.setFormFieldData === 'function' ? props.setFormFieldData : () => {};
    this.style = props.style;
    this.multiline = props.multiline
    this.numberOfLines = props.numberOfLines
    this.value = props.value
  }
  

  render() {
    const variantprop =  this.valueariant;
    const typeprop =  this.input;
    const labelTextprop = this.labelText;
    const placeholderprop =  this.placeholder;
    const errorMessageprop =  this.errorMessage;
    const isDisabledprop =  this.isDisabled;
    const isReadOnlyprop =   this.isReadOnly;
    const isRequiredprop =   this.isRequired;
    //const {getFormFieldData}= useFormContext();

    //const fieldData =this.getFormFieldData(this.formId,this.id); 

    return (
      <FormContext.Consumer>
      {({getFormFieldData}) => {
          const value  = getFormFieldData(this.formId,this.id)
          return (
            <FormControl
              isDisabled={isDisabledprop}
              isReadOnly={isReadOnlyprop}
              isRequired={isRequiredprop}
            >
              {labelTextprop && (
                <FormControlLabel>
                  <FormControlLabelText>{labelTextprop}</FormControlLabelText>
                </FormControlLabel>
              )}
              <Input variant={variantprop} style={this.style}>
                <InputField
                  id={this.id}
                  placeholder={placeholderprop}
                  type={typeprop}
                  multiline={this.multiline}
                  numberOfLines={this.numberOfLines}
                  style={[{ textAlignVertical: "top" }, this.style]}
                  value={ value?.value? value?.value : this.value}
                  onChangeText={(value) => {
                    this.setFormFieldData(this.formId,'input',this.id,value);
                  }}
                  onFocus={() => this.setFormFieldData(this.formId,'input',this.id,value?.value )}
                />
              </Input>
              {isRequiredprop && errorMessageprop && (
                <FormControlError>
                  <FormControlErrorText>
                    {errorMessageprop}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          );
        }}
      </FormContext.Consumer>
    );
  }
}



class cbSelectTime extends React.Component {
  constructor(props) {
    super();
    this.id = props.id;
    this.placeholder = props.placeholder || "Select";
    this.isRequired = props.isRequired || false;
    this.isInvalid = props.isInvalid || false;
    this.selectLabel = props.Label || "";
    this.selectItems = Array.isArray(props.selectItems) ? props.selectItems : [];
    this.style = props.style;
    this.selectItemLabel = props.selectItemLabel;
    this.state = {
      isSelected: false,
      selectedIndex: 0,
    };
    this.scrollY = new Animated.Value(0);
    this.scrollRef = React.createRef();
  }

  updateSelectedTimeAndLocation = (setSelectedTime, setSelectedLocation) => {
    const selectedItem = this.selectItems[this.state.selectedIndex];
    if (selectedItem) {
      if (this.selectItemLabel === "Select Time") {
        setSelectedTime(selectedItem.value);
      } else if (this.selectItemLabel === "Select Place") {
        setSelectedLocation(selectedItem.value);
      }
    }
  };

  handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / 50);
    if (index !== this.state.selectedIndex) {
      this.setState({ selectedIndex: index });
    }
  };

  scrollToIndex = (item,index,setSelectedLocationId) => {
    setSelectedLocationId(item?.pickUpLocationId)
    if (this.scrollRef.current) {
      this.scrollRef.current.scrollToOffset({
        offset: index * 50,
        animated: true,
      });
      this.setState({ selectedIndex: index });
    }
  };

  renderPicker = (setSelectedLocationId) => (
    <FlatList
      ref={this.scrollRef}
      data={this.selectItems}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      snapToInterval={50}
      decelerationRate="normal"
      contentContainerStyle={{ paddingVertical: 100 }}
      onMomentumScrollEnd={this.handleScroll}
      renderItem={({ item, index }) => (
        <TouchableOpacity onPress={() => this.scrollToIndex(item,index,setSelectedLocationId)} style={styles.item}>
          <Text style={[styles.timeItem, this.state.selectedIndex === index && styles.selectedText]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      )}
    />
  );

  render() {
    return (
      <FormContext.Consumer>
        {({ selectedTime, setSelectedTime, selectedLocation, setSelectedLocation, setSelectedLocationId }) => (
          <TouchableOpacity onPress={() => this.setState({ isSelected: true })}>
            <FormControl isRequired={this.isRequired} isInvalid={this.isInvalid} style={this.style}>
              <FormControlLabel>
                <FormControlLabelText style={styles.selectedLabelItem}>
                  {this.selectItemLabel === "Select Time" ? selectedTime : selectedLocation}
                </FormControlLabelText>
              </FormControlLabel>
              <Select>
                <SelectPortal isOpen={this.state.isSelected} style={{ width: "100%" }}>
                  <SelectBackdrop onPress={() => this.setState({ isSelected: false })} />
                  <SelectContent style={styles.selectedContainer}>
                    <Text style={styles.selectedLabel}>{this.selectItemLabel}</Text>
                    <View style={styles.pickerWrapper}>{this.renderPicker(setSelectedLocationId)}</View>
                    <TouchableOpacity style={styles.doneBtn} onPress={() => {
                      this.updateSelectedTimeAndLocation(setSelectedTime, setSelectedLocation);
                      this.setState({ isSelected: false });
                    }}>
                      <Text style={styles.doneTxtBtn}>Done</Text>
                    </TouchableOpacity>
                  </SelectContent>
                </SelectPortal>
              </Select>
              <FormControlError>
                <FormControlErrorText></FormControlErrorText>
              </FormControlError>
            </FormControl>
          </TouchableOpacity>
        )}
      </FormContext.Consumer>
    );
  }
}
function cbForm({ formId, setFormFieldData, children }) {

  const childrenWithProps = React.Children.map(children, (child) =>
    React.isValidElement(child)
      ? React.cloneElement(child, { formId, setFormFieldData })
      : child
  );


  return <Box>{childrenWithProps}</Box>;
}


class cbVStack extends React.Component {
  constructor(props) {
    super();
    this.id=props.id;
    this.children=this.props;
    this.space = props.space || 'md';
  }

  render() {

    const { children } = this.props;
    const spaceprop = this.space;

    return (
      <VStack space={spaceprop}>
        {children}
      </VStack>
    );
  }
}

class CbFlatList extends React.Component{
  constructor(props) {
    super();
    this.id=props.id;
    this.children=props.children;
    this.space = props.space || 'md';
    this.flatlistData = props.flatlistData || []
    this.numColumns = props.numColumns || 0
    this.initialNumToRender = props.initialNumToRender || 10
    this.bounces = props.bounces || false
    this.horizontal = props.horizontal
    this.inverted = props.inverted || false
    this.contentContainerStyle = props.contentContainerStyle
    this.ref = props.ref
    this.emptyListText = props.emptyListText || ""
    this.showsHorizontalScrollIndicator = props.showsHorizontalScrollIndicator || false
    this.showsVerticalScrollIndicator = props.showsVerticalScrollIndicator || false
    this.customStyles = props.customStyles || {}
    this.extraData = props.extraData || []
    this.scrollEnabled = props.scrollEnabled
    this.nestedScrollEnabled = props.nestedScrollEnabled
  }
  renderEmptyList = () => {
      return(
      <VStack>
        <Text>{this.emptyListText}</Text>
      </VStack>
    )
  }
  render(){
    const { children } = this.props;
    const ITEM_HEIGHT = 100
    return (
      <FlatList
        ref={this.ref}
        keyExtractor={this.keyExtractor}
        data={this.flatlistData}
        renderItem={this.children}
        numColumns={this.numColumns}
        ListEmptyComponent={this.renderEmptyList}
        ListFooterComponent={this.ListFooterComponent}
        bounces={this.bounces}
        horizontal={this.horizontal}
        inverted={this.inverted}
        contentContainerStyle={this.contentContainerStyle}
        maxToRenderPerBatch={10}
        showsHorizontalScrollIndicator={this.showsHorizontalScrollIndicator}
        showsVerticalScrollIndicator={this.showsVerticalScrollIndicator}
        style={this.customStyles}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={100}
        windowSize={21}
        onEndReachedThreshold={0.1}
        extraData = {this.extraData}
        scrollEnabled={this.scrollEnabled}
        nestedScrollEnabled={this.nestedScrollEnabled}
      />
    );
  }
}


class CbCommonButton extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.addMorebtn
    this.cartQuantity = props.cartQuantity
    this.showBtnName = props.showBtnName || ""
    this.isPlusIconAvailable = props.isPlusIconAvailable || false
    this.style = props.style
    this.btnTextStyle = props.btnTextStyle
    this.onPress = props.onPress
  }
  render() {
    return (
      <FormContext.Consumer>
        {({updateOrAddTxt}) => {
          return (
            <Box>
              <TouchableOpacity
                style={[this.style ? this.style : styles.mediumBtn]}
                onPress={() => this?.onPress()}
              >
                {
                  this.isPlusIconAvailable && <Icon as={AddIcon} color='#2A4E7D' />
                }
                <Text style={[this.btnTextStyle ? this.btnTextStyle : styles.mediumBtnTxt]}>
                  {this.showBtnName?this.showBtnName:updateOrAddTxt}
                </Text>
              </TouchableOpacity>
            </Box>
          );
        }}
      </FormContext.Consumer>
    );
  }
}


class CbToastMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    this.message = props.message
    this.isToastMessageVisiable = this.isToastMessageVisiable
    this.transparent = props.transparent
    this.closePreviewModal = props.closePreviewModal
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={this.transparent}
        visible={this.isToastMessageVisiable}
      >
        <Box style={styles.centeredView}>
          <Pressable style={[styles.blackShadow]} onPress={() => this?.closePreviewModal()}/>
          <Box style={styles.modalView}>
            <Text style={styles.modalText}>{this.message}</Text>
          </Box>
        </Box>
      </Modal>
    );
  }
}


CbHomeButton.display='CbHomeButton';
CbBackButton.display='CbBackButton';
CbImage.displayName='CbImage';
cbButton.displayName='cbButton';
cbInput.displayName='cbInput';
cbCheckBox.displayName='cbCheckBox';
cbSelect.displayName='cbSelect';
cbImageBackground.displayName='cbImageBackground';
cbRadioButton.displayName='cbRadioButton';
cbVStack.displayName='cbVStack';
cbForm.displayName='cbForm';
CbFlatList.displayName = "CbFlatList"
cbSearchbox.displayName='cbSearchbox';
CbFloatingButton.displayName='CbFloatingButton';
CbAddToCartButton.displayName = "CbAddToCartButton"
CbCommonButton.displayName = "CbCommonButton";
CbAccordionlist.displayName='CbAccordionlist';
cbSelectTime.displayName='cbSelectTime';
CbToastMessage.displayName = "CbToastMessage"
CbRecentAccordion.displayName = "CbRecentAccordion"
CbRecentAddToCart.displayName = "cbRecentAddToCart"
CbHeaderBackground.displayName='CbHeaderBackground';
CbText.displayName='CbText';
CbHeaderTitle.displayName='CbHeaderTitle';
CbBox.displayName='CbBox';
CbView.displayName="CbView";
 export {CbView,CbHeaderBackground,CbHeaderTitle,CbBox,CbText,cbSelectTime,CbCommonButton, CbHomeButton, CbBackButton, cbButton, cbInput, cbCheckBox, cbSelect, cbImageBackground, cbRadioButton, cbVStack, cbForm,CbFlatList,cbSearchbox,CbFloatingButton,CbImage,CbAddToCartButton,CbAccordionlist,CbToastMessage,CbRecentAccordion,CbRecentAddToCart };