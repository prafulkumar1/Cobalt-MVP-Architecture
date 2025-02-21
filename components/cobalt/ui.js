import React from 'react';
import { FlatList, ImageBackground, Image, TouchableOpacity,View, Alert, Animated,} from 'react-native';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import {  CheckIcon, ChevronDownIcon,ChevronRightIcon, CircleIcon,AddIcon,TrashIcon,RemoveIcon } from '@/components/ui/icon';
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
import { handleSearchClick, handleClearClick, handleCloseClick } from "./event";
import { postApiCall } from '@/source/utlis/api';

export const postQuantityApiCall = async(quantity,itemId) => {
  try {
    const params = {
      "Item_ID":itemId,
      "Item_Quantity": quantity
    }          
    let quantityInfo = await postApiCall("MENU_ORDER","GET_MENU_ORDER_STATUS", params)
    return quantityInfo
  } catch (err) {}
}

class CbAccordionlist extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.screenName = props.screenName;
    this.favsource = props.favsource || "";
    this.Notfavsource = props.Notfavsource || "";
    this.componentData = props.componentData || [];
    this.getAllSelectedModifiers = props.getAllSelectedModifiers
     
    this.state = {
      selectedModifiers: [],
      isItemSelected:false,
      selectedModifierId:""
    };
  }

  handleCheckboxToggle = (
    item,
    value,
    modifiersResponseData,
    setModifiersResponseData,
    Item_ID
  ) => {
    this.getAllSelectedModifiers({ ...item, isChecked: value,Item_ID });
  };

  isValueChecked = (modifiers, selectedItem, cartData, itemDataVisible, index, existingCartData) => {
    if (existingCartData && Array.isArray(existingCartData.selectedModifiers)) {
      return existingCartData.selectedModifiers.some(item => item.Modifier_Id === selectedItem.Modifier_Id);
    } else {
      return this.state.selectedModifiers.some(item => item.Modifier_Id === selectedItem.Modifier_Id);
    }
  };
  render() {
    const Notfavsource = this.Notfavsource;
    const favsource = this.favsource;
    const IsFavorite = 1;
    const componentData =
      this.screenName === "RecentOrders"
        ? this.componentData.CompletedOrders
        : this.componentData.Modifiers;

    return (
      <FormContext.Consumer>
        {({itemDataVisible ,modifiersResponseData,setModifiersResponseData,cartData,singleItemDetails}) => {
          const buttonArray = global.controlsConfigJson.find(
            (item) => item.id === this.id
          );
          let categoryData = typeof modifiersResponseData?.Categories == "string"? JSON.parse(modifiersResponseData?.Categories): modifiersResponseData?.Categories
          const defaultOpenItems =  categoryData?.map((_, index) => `item-${index}`);
          const existingCartData = cartData && cartData?.find((item) =>item.Item_ID ===  singleItemDetails.Item_ID)
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
                      style={
                        this.screenName === "RecentOrders"
                          ? styles.roAccordion
                          : styles.itemDetailsContainer
                      }
                    >
                      <AccordionItem
                        value={`item-${index}`}
                        style={styles.itemDetailsSubContainer}
                      >
                        <AccordionHeader
                          style={
                            this.screenName === "RecentOrders"
                              ? styles.roAccordionHeader
                              : styles.subHeader
                          }
                        >
                          <AccordionTrigger>
                            {({ isExpanded }) => {
                              return (
                                <>
                                  {this.screenName === "RecentOrders" ? (
                                    <Box
                                      key={index}
                                      style={styles.roAccordionHeading}
                                    >
                                      <Image
                                        alt="image"
                                        source={require("@/assets/images/icons/ROdate.png")}
                                      />
                                      <AccordionTitleText
                                        style={styles.roAccordionTitleText}
                                      >
                                        Ordered Date: {order.OrderDate}
                                      </AccordionTitleText>
                                    </Box>
                                  ) : (
                                    <Box style={styles.recentOrderContainer}>
                                      <AccordionTitleText
                                        style={styles.modifierContainer}
                                      >
                                        {order.Category_Name}
                                        <AccordionTitleText
                                          style={styles.maxAllowedTxt}
                                        >
                                          {order.Message
                                            ? `  (${order.Message})`
                                            : ""}
                                        </AccordionTitleText>
                                      </AccordionTitleText>
                                    </Box>
                                  )}
                                  {isExpanded ? (
                                    <AccordionIcon
                                      as={ChevronDownIcon}
                                      className="ml-3"
                                      style={styles.roAccordionIcon}
                                    />
                                  ) : (
                                    <AccordionIcon
                                      as={ChevronRightIcon}
                                      className="ml-3"
                                      style={styles.roAccordionIcon}
                                    />
                                  )}
                                </>
                              );
                            }}
                          </AccordionTrigger>
                        </AccordionHeader>
                        <AccordionContent>
                          {this.screenName == "RecentOrders"
                            ? order.Items?.map((item) => (
                                <Box>
                                  <Box
                                    style={styles.roAccordionContentouterbox}
                                  >
                                    <Box
                                      style={styles.roAccordionContentItembox}
                                    >
                                      <Text
                                        style={styles.roItemName}
                                        strikeThrough={!item.IsAvailable}
                                      >
                                        {" "}
                                        {item.ItemName}{" "}
                                      </Text>
                                      <Text
                                        style={styles.roItemprice}
                                      >{`$${item.Price}`}</Text>
                                    </Box>
                                    <Box style={styles.roImagescetion}>
                                      <Image
                                        alt="image"
                                        source={
                                          item.IsFavorite
                                            ? favsource
                                              ? { uri: favsource }
                                              : require("@/assets/images/icons/Fav.png")
                                            : Notfavsource
                                            ? { uri: Notfavsource }
                                            : require("@/assets/images/icons/Notfav.png")
                                        }
                                        style={styles.roItemImage}
                                      />
                                      <CbAddToCartButton
                                        mealItemDetails={{}}
                                        style={styles.roItemButton}
                                      />
                                    </Box>
                                  </Box>
                                  <Divider />
                                </Box>
                              ))
                            : 
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
                                      // isChecked={this.isValueChecked(order?.Modifiers, item, cartData, itemDataVisible, itemIndex,existingCartData)}
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
                                            singleItemDetails.Item_ID
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
                                      <Text>{`$${item.Price !== null ? item.Price : 0
                                        }`}</Text>
                                    </AccordionContentText>
                                  </Box>
                                )
                              }}
                            />
                            }
                          {this.screenName == "RecentOrders" &&
                          order.IsReorder ? (
                            <Button
                              variant="outline"
                              style={styles.roReoderButton}
                            >
                              <ButtonText
                                style={styles.roReordertext}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                              >
                                Re Order
                              </ButtonText>
                            </Button>
                          ) : (
                            ""
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
    // this.id=props.id;
    this.source = props.source || "";
    this.imageJsx=props.imageJsx;
    this.style = props.style || "";
  }

  render() {
    //const inputArray = global.controlsConfigJson.find(item => item.id === this.id);
    //const source = inputArray?.source  || this.source;'
    const jsx = this.imageJsx;
    const source=this.source;
     
    if (source) {

      if (source.endsWith('.svg')) {
        
        return <SvgUri source={{ uri: source }}  />;
      } else {

        return <Image alt='image' source={{ uri: source }}  style={this.style}/>;
      }
    } else {
      return jsx;
    }
  }
}

class CbBackButton extends React.Component {
  constructor(props) {
    super(props);
    this.source = props.source;
  }
  render() {
    return (
      <TouchableOpacity onPress={()=>this.props.navigation?.goBack()} style={styles.backArrowHeader}>
        {
          this.source ? <Image source={{ uri: this.source}}/>:<Image alt='image' source={require("@/assets/images/icons/Back.png")} />
        }
      </TouchableOpacity>
    );
  }
}

class CbHomeButton extends React.Component {
  constructor(props) {
    super(props);
    this.source = props.source;
  }
  render() {
    return (
      <TouchableOpacity onPress={()=>navigateToScreen(this.props,'ProfitCenters')}>
        {
          this.source ? <Image source={{ uri: this.source}}/>:<Image alt='image' source={require("@/assets/images/icons/Home.png")} />
        }
      </TouchableOpacity>

    );
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
          const buttonArray = global.controlsConfigJson.find(
            (item) => item.id === this.id
          );
          const variant = buttonArray?.variant || this.variant;
          const buttonText = buttonArray?.text || this.buttonText;
          const getFinalQuantity = cartData &&  cartData.reduce((total,prev) => total+prev.quantity,0)
          return (
            <View style={styles.floatingContainer}>
              <TouchableOpacity style={styles.floatingBtn} onPress={() => navigateToScreen(this.screenProps, "MyCart", true,)}>
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


class CbAddToCartButton extends React.Component {
  constructor(props) {
    super(props);
    this.mealItemDetails = props.mealItemDetails
    this.style = props.style
    this.cartStyle = props.cartStyle
    this.state ={
      isAvailable : 0 ,
      IsModifierAvailable:0
    }
  }
  commonStyles = (isAvailable,IsDisable,primaryColor,secondaryColor) => {
    if(isAvailable ===1 && IsDisable ===0){
      return primaryColor
    }else{
      return secondaryColor
    }
  }


   handleAddToCartBtn = async (quantity,  storeSingleItem, closePreviewModal, addItemToCartBtn, increaseQuantity,itemDataVisible) => {
    let quantityInfo = await postQuantityApiCall(quantity,this.mealItemDetails?.Item_ID)
    if (quantityInfo.statusCode === 200) {
      this.setState({ isAvailable: quantityInfo?.response.IsAvailable, IsModifierAvailable: quantityInfo?.response.IsModifierAvailable }, () => {
        if (this.state.IsModifierAvailable === 1) {
          storeSingleItem(this.mealItemDetails);
          if(itemDataVisible){
            increaseQuantity(this.mealItemDetails, false)
          }else{
            closePreviewModal()
            increaseQuantity(this.mealItemDetails, false)
          }
        } else {
          addItemToCartBtn(this.mealItemDetails)
        }
      })
    }
  }

  modifierIncDecBtn = async (cartData,updateModifierItemQuantity,modifierQuantity, updateCartItemQuantity,cartQuantity,operation) => {
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
        if (this.state.IsModifierAvailable === 1) {
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
            updateCartItemQuantity(this.mealItemDetails, cartQuantity - 1);
          } else {
            if (this.state.isAvailable === 1) {
              updateCartItemQuantity(this.mealItemDetails, cartQuantity + 1);
            } else {
              Alert.alert(quantityInfo?.response?.ResponseMessage);
            }
          }
        }
      })
    }
  }

  renderAddToCartBtn = (contextProps) => {
     const addButton = global.controlsConfigJson.find(item => item.id === "addButton");
    const {itemDataVisible, cartData, addItemToCartBtn, updateCartItemQuantity,closePreviewModal,storeSingleItem,increaseQuantity,updateModifierItemQuantity,modifierCartItemData } = contextProps;
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
            { borderColor: addButton?.borderColor?this.commonStyles(IsAvailable,IsDisable, addButton?.borderColor, "#ABABAB") : this.commonStyles(IsAvailable,IsDisable, "#5773a2", "#ABABAB") },
            {backgroundColor:addButton?.backgroundColor?addButton.backgroundColor : "#fff"},
            {borderRadius:addButton?.borderRadius?addButton?.borderRadius:5},
            {borderWidth:addButton?.borderWidth?addButton?.borderWidth : 1}
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
            onPress={() => this.modifierIncDecBtn(cartData,updateModifierItemQuantity,modifierQuantity,updateCartItemQuantity,quantity,"decrement")}
          >
            {
              this.state.IsModifierAvailable === 1 ? 
              <Icon as={modifierQuantity === 1 ? TrashIcon : RemoveIcon} color="#5773a2" size={'md'} style={{width:23,height:23}}/>
              : 
              <Icon as={quantity === 1 ? TrashIcon : RemoveIcon} color="#5773a2" size={'md'} style={{width:23,height:23}}/>
            }
          </TouchableOpacity>

          <Text style={styles.quantityTxt}>{quantity ? quantity : modifierQuantity}</Text>

          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => this.modifierIncDecBtn(cartData,updateModifierItemQuantity,modifierQuantity,updateCartItemQuantity,quantity,"increment")}
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
        const buttonArray = global.controlsConfigJson.find(
          (item) => item.id === this.id
        );
        const variant = buttonArray?.variant || this.variant;
        const buttonText = buttonArray?.text || this.buttonText;

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
    this.search=props.Searchsource || "";
    this.backarrow=props.Backarrowsource || "";
    this.close=props.closesource || "";
    this.isRecentOrderOpen = props.isRecentOrderOpen || false
    this.state = {
      showSearchInput: false,
      searchValue: "",
    };
    this.inputRef = React.createRef();
  }
  handleFocus = () => {
    if (this.inputRef?.current) {
      this.inputRef.current.focus();
    }
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

  
  render() {
    const { showSearchInput, searchValue } = this.state;
    const Searchsource=this.search;
    const Backarrowsource=this.backarrow;
    const Closesource=this.close;
    return (
      <Box
        style={{
          width: showSearchInput ? "100%" : 40,
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft:9,
          borderRadius:4,
          backgroundColor: showSearchInput ? "#f0f0f0" : "white",
        }}
      >
        {showSearchInput ? (
          <Box
            style={styles.searchBarMainContainer}
          >
            <TouchableOpacity   onPress={() => handleCloseClick(this.setState.bind(this), this.props.onSearchActivate) } style={{ marginLeft: 10 }} >
              {
                Backarrowsource ? <Image source={{ uri: Backarrowsource}}/>:<Image alt='image' source={require("@/assets/images/icons/BackArrow.png")} />
              }
            </TouchableOpacity>
            <Input
              style={styles.inputBox}
            >
              <InputField
                ref={this.inputRef}
                value={searchValue}
                placeholder="Items"
                onChangeText={(value) => this.setState({ searchValue: value })}
              />
            </Input>
            {searchValue && (
            <TouchableOpacity  onPress={() =>handleClearClick(this.setState.bind(this),this.state.searchValue,this.props.onSearchActivate )}  style={{ marginLeft: 5 }} > 
                {
                Closesource? <Image source={{ uri: Closesource}}/>:<Image alt='image' source={require("@/assets/images/icons/Close.png")} />
                }
              </TouchableOpacity>
            )}
          </Box>
        ) : (
          <TouchableOpacity
            onPress={() =>
              handleSearchClick(this.setState.bind(this), this.props.onSearchActivate)
            }
          >
            {
          Searchsource ? <Image source={{ uri: Searchsource}}/>: <Image alt='image' source={require("@/assets/images/icons/Search.png")} />
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

    const buttonArray = global.controlsConfigJson.find((item) => item.id === this.id);
    const variant = buttonArray?.variant || this.variant;
    const buttonText = buttonArray?.text || this.buttonText ;
    const buttonStyle=this.customStyles.buttonStyle;
    const buttonTextStyle=this.customStyles.buttontextStyle;
    
    return (
      <Button variant={variant} onPress={()=> this.onPress()} style={buttonStyle}  >
          <ButtonText style={buttonTextStyle} numberOfLines={1}  ellipsizeMode="tail">{buttonText}</ButtonText>
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
    const inputArray = global.controlsConfigJson.find(item => item.id === this.id);
    const checkBoxLabelprop = inputArray?.labeltext  || this.checkBoxLabel;
    const styles=this.customStyles;

    return (
      <Checkbox size={this.size} isInvalid={this.isInvalid} isDisabled={this.isDisabled}>
      <CheckboxIndicator >
        <CheckboxIcon as={CheckIcon} />
      </CheckboxIndicator>
      <CheckboxLabel>{checkBoxLabelprop}</CheckboxLabel>
    </Checkbox>    
    );
  }
}



class cbImageBackground extends React.Component {
  constructor(props) {
    super();
    this.id=props.id;
    this.source = props.source || null;
    this.styles= props.styles || null;
  }

  render() {
    const { children } = this.props;
    const inputArray = global.controlsConfigJson.find(item => item.id === this.id);
    const sourceprop = inputArray?.source  || this.source;
    const styleprop = inputArray?.styles ||  this.styles;

    return (
      <ImageBackground source={sourceprop} alt='login' style={styleprop?.container} >
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
    const inputArray = global.controlsConfigJson.find(item => item.id === this.id);
    const radiolabelprop = inputArray?.labelText  || this.selectLabel;
    const selectItems = Array.isArray(inputArray?.options) ? inputArray.options : this.options;
    const alignmentprop= inputArray?.alignment || this.alignment;
    const Stack = alignmentprop === 'vertical' ? VStack : HStack;
    return (

      <FormControl>
      <VStack  space="md">
          <FormControlLabel>
            <FormControlLabelText>{radiolabelprop}</FormControlLabelText>
          </FormControlLabel>
          <RadioGroup>
            <Stack space="sm">
              {selectItems.map((item, index) => (
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
    const inputArray = global.controlsConfigJson.find(item => item.id === this.id);
    const selectLabelprop = inputArray?.labelText  || this.selectLabel;
    const placeholderprop = inputArray?.placeholder || this.placeholder;
    const selectItems = Array.isArray(inputArray?.options) ? inputArray.options : this.selectItems;
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
  }
  

  render() {
    const inputArray = global.controlsConfigJson.find(item => item.id === this.id);
    const variantprop = inputArray?.variant  || this.valueariant;
    const typeprop = inputArray?.type ||  this.input;
    const labelTextprop = inputArray?.labelText || this.labelText;
    const placeholderprop = inputArray?.placeholder || this.placeholder;
    const errorMessageprop = inputArray?.errorMessage || this.errorMessage;
    const isDisabledprop = inputArray?.isDisabled === 1 || this.isDisabled;
    const isReadOnlyprop = inputArray?.isReadOnly === 1 ||  this.isReadOnly;
    const isRequiredprop = inputArray?.isRequired === 1 ||  this.isRequired;
    //const {getFormFieldData}= useFormContext();

    //const fieldData =this.getFormFieldData(this.formId,this.id); 

    return (
      <FormControl isDisabled={isDisabledprop} isReadOnly={isReadOnlyprop} isRequired={isRequiredprop}   >
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
            //value={fieldData.value} 
          onChangeText={(value) => {this.setFormFieldData(this.formId,'input',this.id,value);} }
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

  scrollToIndex = (index) => {
    if (this.scrollRef.current) {
      this.scrollRef.current.scrollToOffset({
        offset: index * 50,
        animated: true,
      });
      this.setState({ selectedIndex: index });
    }
  };

  renderPicker = () => (
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
        <TouchableOpacity onPress={() => this.scrollToIndex(index)} style={styles.item}>
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
        {({ selectedTime, setSelectedTime, selectedLocation, setSelectedLocation }) => (
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
                    <View style={styles.pickerWrapper}>{this.renderPicker()}</View>
                    <CbCommonButton
                      showBtnName={"Done"}
                      style={styles.doneBtn}
                      btnTextStyle={styles.doneTxtBtn}
                      onPress={() => {
                        this.updateSelectedTimeAndLocation(setSelectedTime, setSelectedLocation);
                        this.setState({ isSelected: false });
                      }}
                    />
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
    const inputArray = global.controlsConfigJson.find(item => item.id === this.id);
    const spaceprop = inputArray?.space  || this.space;

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
    const inputArray = global.controlsConfigJson.find(item => item.id === this.id);
    const spaceprop = inputArray?.space  || this.space;
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
      <Box>
        <TouchableOpacity
          style={[this.style ? this.style : styles.mediumBtn]}
          onPress={() => this?.onPress()}
        >
          {
            this.isPlusIconAvailable && <Icon as={AddIcon} color='#2A4E7D' />
          }
          <Text style={[this.btnTextStyle ? this.btnTextStyle : styles.mediumBtnTxt]}>
            {this.showBtnName}
          </Text>
        </TouchableOpacity>
      </Box>
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


 export {cbSelectTime,CbCommonButton, CbHomeButton, CbBackButton, cbButton, cbInput, cbCheckBox, cbSelect, cbImageBackground, cbRadioButton, cbVStack, cbForm,CbFlatList,cbSearchbox,CbFloatingButton,CbImage,CbAddToCartButton,CbAccordionlist };