import React,{useState,useContext} from 'react';
import { FlatList, ImageBackground, Image, TouchableOpacity, ScrollView, Platform,Modal} from 'react-native';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { Checkbox,CheckboxIcon,CheckboxIndicator,CheckboxLabel } from '@/components/ui/checkbox';
import {  CheckIcon, ChevronDownIcon, CircleIcon,ChevronUpIcon,AddIcon,TrashIcon,RemoveIcon,SearchIcon,CloseIcon,ArrowLeftIcon } from '@/components/ui/icon';
import { Select,SelectIcon,SelectInput,SelectTrigger,SelectPortal,SelectBackdrop,SelectContent,SelectDragIndicator,SelectItem,SelectDragIndicatorWrapper } from '../ui/select';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import {useFormContext} from './event';
import { Radio, RadioGroup, RadioIndicator, RadioLabel, RadioIcon } from '@/components/ui/radio';
import { Text, View} from 'react-native';
import PropTypes from "prop-types";
import { Accordion,  AccordionItem,  AccordionHeader, AccordionTrigger, AccordionTitleText, AccordionContentText, AccordionIcon, AccordionContent, } from '@/components/ui/accordion';
import {  styles } from './style';
import uuid from  "react-native-uuid"
import { FormContext } from './event';
import { navigateToScreen } from '@/source/constants/Navigations'
import SvgUri from 'react-native-svg-uri';
import { handleSearchClick, handleClearClick, handleCloseClick } from "./event";
import { height } from '@/source/constants/Matrices';
import ItemData from '@/source/views/ItemData/ItemData';

class CbAccordionlist extends React.Component {
  constructor(props) {
    super(props);
    // this.id=props.id;
    this.screenName=props.screenName;
    this.favsource = props.favsource || "";
    this.Notfavsource = props.Notfavsource || "";
     this.componentData= props.componentData || [];

  }

  render() {
    const Notfavsource=this.Notfavsource;
    const favsource=this.favsource;
    const IsFavorite=1;
    const componentData=this.screenName === "RecentOrders" ? this.componentData.RecentOrders: this.componentData.Modifiers;


    return (
      componentData.map((order, index) => (
        <Accordion size="md" vriant="filled" type="single" style={{ paddingTop: 6, backgroundColor: "white" }}>
          <AccordionItem
            value="a"
            style={{
              borderWidth: 0.3,
              borderRadius: 5,
              borderColor: "#ccc",
              backgroundColor: "white",
            }}
          >

            <AccordionHeader style={{ backgroundColor: "#F3F3F3", borderRadius: 5, padding: 0, height: 30, justifyContent: 'center' }} >
              <AccordionTrigger >
                {({ isExpanded }) => {
                  return (
                    <>
                      {this.screenName === "RecentOrders" ? (

                        <Box key={index} style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                          <Image alt="image" source={require("@/assets/images/icons/ROdate.png")} />
                          <AccordionTitleText>Ordered Date: {order.OrderDate}</AccordionTitleText>
                        </Box>

                      ) : (
                        <Box
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: 'flex-start'
                          }}
                        >
                          <AccordionTitleText style={{ fontWeight: "bold", color: "#4B5154", fontSize: 14 }}>
                            {order.MainModifier} {order.IsRequried === 1 && (
                              <AccordionTitleText style={{ color: "red", }}>
                                (Required)
                              </AccordionTitleText>
                            )} {order.IsMaxAllowedOne === 1 && (
                              <AccordionTitleText style={{ color: "#3B87C1", fontSize: 12 }}>
                                (Max allowed 1)
                              </AccordionTitleText>
                            )}
                          </AccordionTitleText>


                          {isExpanded ? (
                            <AccordionIcon
                              as={ChevronDownIcon}
                              className="ml-3"
                              style={{ width: 20, height: 20 }}
                            />
                          ) : (

                            <AccordionIcon
                              as={ChevronUpIcon}
                              className="ml-3"
                              style={{ width: 20, height: 20 }}
                            />
                          )}
                        </Box>
                      )}

                    </>
                  )
                }}
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              {this.screenName == "RecentOrders" ? (
                order.Items.map((item, index) => (
                  <Box style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Box>
                      <AccordionContentText> {item.ItemName} </AccordionContentText>
                      <AccordionContentText>{`$${item.Price}`}</AccordionContentText>
                    </Box>
                    <Box style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "auto", }}>
                      <Image alt="image" source={item.IsFavorite ? favsource ? { uri: favsource } : require("@/assets/images/icons/Fav.png") : Notfavsource ? { uri: Notfavsource } : require("@/assets/images/icons/Notfav.png")} style={{ marginRight: 10 }} />
                      <Button style={{ width: 30 }} />
                    </Box>
                  </Box>
                ))
              ) :
                (
                  order.ModifierItems.map((item, index) => (
                    <Box style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingTop: 10 }}>
                      <Checkbox onChange={() => handleCheckboxChange()}>
                        <CheckboxIndicator
                          style={styles.CheckboxIndicator}
                        >
                          <CheckboxIcon as={CheckIcon} style={{ color: "#707070", width: 17, height: 17 }} />
                        </CheckboxIndicator>
                        <CheckboxLabel style={{ color: "#4B5154", fontSize: 14, fontStyle: 'italic', fontWeight: '500' }}>
                          {item.ItemName}
                        </CheckboxLabel>
                      </Checkbox>
                      <AccordionContentText style={{ marginLeft: "auto", color: "#4B5154", fontSize: 14, fontWeight: '500' }}>
                        {`$${item.Price}`}
                      </AccordionContentText>
                    </Box>
                  ))
                )
              }
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))
    );
  }
}


class CbImage extends React.Component {
  constructor(props) {
    super(props);
    // this.id=props.id;
    this.source = props.source || "";
    this.imageJsx=props.imageJsx;
    this.style = props.style
    
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
      <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={styles.backArrowHeader}>
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
      {({cartData}) => {
          const buttonArray = global.controlsConfigJson.find(
            (item) => item.id === this.id
          );
          const variant = buttonArray?.variant || this.variant;
          const buttonText = buttonArray?.text || this.buttonText;

          return (
            <View style={styles.floatingContainer}>
              <TouchableOpacity style={styles.floatingBtn} onPress={() => navigateToScreen(this.screenProps, "MyCart", true,)}>
                <Image source={require("@/assets/images/icons/cartIcon2x.png")} style={styles.cartIcon} />
              <Text style={styles.cartCountTxt}>{cartData?.length? cartData?.length:0}</Text>
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
  }
  commonStyles = (isAvailable,IsDisable,primaryColor,secondaryColor) => {
    if(isAvailable ===1 && IsDisable ===1){
      return primaryColor
    }else{
      return secondaryColor
    }
  }

  renderAddToCartBtn = (contextProps) => {
     const addButton = global.controlsConfigJson.find(item => item.id === "addButton");
    const { cartData, addItemToCartBtn, updateCartItemQuantity } = contextProps;
    const IsAvailable = this.mealItemDetails.IsAvailable;
    const IsDisable = this.mealItemDetails.IsDisable
    const cartItem = cartData?.find((item) => item.Item_Id === this.mealItemDetails.Item_Id);
    const quantity = cartItem ? cartItem.quantity : 0;
  
    if (quantity === 0) {
      return (
        <TouchableOpacity
          style={[this.style ? this.style : styles.addItemToCartBtn, 
            { borderColor: addButton?.borderColor?this.commonStyles(IsAvailable,IsDisable, addButton?.borderColor, "#4B515469") : this.commonStyles(IsAvailable, "#5773a2", "#4B515469") },
            {backgroundColor:addButton?.backgroundColor?addButton.backgroundColor : "#fff"},
            {borderRadius:addButton?.borderRadius?addButton?.borderRadius:5},
            {borderColor:addButton?.borderColor?addButton?.borderColor:"#5773A2"},
            {borderWidth:addButton?.borderWidth?addButton?.borderWidth : 1}
          ]}
          activeOpacity={0.5}
          onPress={() => addItemToCartBtn(this.mealItemDetails)}
          disabled={IsAvailable === 1 && IsDisable === 0?false:true}
        >
          <Icon as={AddIcon} color={this.commonStyles(IsAvailable,IsDisable, "#5773a2", "#4B515469")} />
        </TouchableOpacity>
      );
    } else {
      return (
        <Box style={[this.cartStyle? styles.operationBtn2:styles.operationBtn]}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => updateCartItemQuantity(this.mealItemDetails, quantity - 1)}
          >
            <Icon as={quantity === 1 ? TrashIcon : RemoveIcon} color="#5773a2" size={'md'} />
          </TouchableOpacity>

          <Text style={styles.quantityTxt}>{quantity}</Text>

          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => updateCartItemQuantity(this.mealItemDetails, quantity + 1)}
          >
            <Icon as={AddIcon} color="#5773a2" size={"xl"} />
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


class CbAccordion extends React.Component {
  constructor(props) {
    super(props);
    this.AccordionData = Array.isArray(props.AccordionData) ? props.AccordionData : [];
    this.addItemToCartBtn = props.addItemToCartBtn
    this.updateCartItemQuantity = props.updateCartItemQuantity
    this.cartData = props.cartData || []
    this.state = {
      expandedIds: [],
    };
  }


  handleReadMoreToggle = (id) => {
    this.setState((prevState) => {
      const isExpanded = prevState.expandedIds.includes(id);
      return {
        expandedIds: isExpanded
          ? prevState.expandedIds.filter((expandedId) => expandedId !== id)
          : [...prevState.expandedIds, id],
      };
    });
  };
  commonStyles = (isAvailable,primaryColor,secondaryColor) => {
    if(isAvailable ===1){
      return primaryColor
    }else{
      return secondaryColor
    }
  }


  showActiveAvailableColor = (isAvailable,IsDisable) => {
    return { color: isAvailable === 1 &&IsDisable===0  ? "#4B5154" : "#4B515469" };
  };

  render() {
    const componentdata = this.AccordionData;
    const { expandedIds } = this.state;
    const configItems = global.controlsConfigJson?.reduce((acc, item) => {
      if (["itemTitle", "itemPrice", "itemDescription", "itemCategoryLabel"].includes(item.id)) {
        acc[item.id] = item;
      }
      return acc;
    }, {});

    const { itemTitle, itemPrice, itemDescription, itemCategoryLabel } = configItems;

    return (
      <FormContext.Consumer>
        {({itemDataVisible,closePreviewModal}) => {
          const buttonArray = global.controlsConfigJson.find(
            (item) => item.id === this.id
          );
          const variant = buttonArray?.variant || this.variant;
          const buttonText = buttonArray?.text || this.buttonText;

          return (
                 <ScrollView
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={[styles.mainContainerList,Platform.OS==="ios" && {paddingBottom: "30%" }]}
        keyboardShouldPersistTaps="handled"
      >
        <Accordion
          defaultValue={componentdata?.map((item) => item.Submenu_Name)}
          variant="filled"
          type="multiple"
          isCollapsible={true}
          isDisabled={false}
        >
          {componentdata &&
            componentdata.map((item) => (
              <AccordionItem key={item.Submenu_Name} value={item.Submenu_Name}>
                <AccordionHeader>
                  <AccordionTrigger>
                    {({ isExpanded }) => (
                      <>
                        <AccordionTitleText
                          style={[itemCategoryLabel?.styles? itemCategoryLabel?.styles:styles.itemCategoryLabel]}
                        >
                          {item.Submenu_Name}
                        </AccordionTitleText>
                        {isExpanded ? (
                          <AccordionIcon
                            as={ChevronUpIcon}
                            width={20}
                            height={20}
                            className="ml-3"
                          />
                        ) : (
                          <AccordionIcon
                            as={ChevronDownIcon}
                            width={20}
                            height={20}
                            className="ml-3"
                          />
                        )}
                      </>
                    )}
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent style={{ marginTop: 10 }}>
                  {item.Items &&
                    item.Items.map((box) => {
                      const isExpanded = expandedIds.includes(box.Item_Id);

                      return (
                        <Box
                          key={box.Item_Id}
                          style={[
                            styles.subContainer,
                            { opacity: box.IsAvailable === 1 && box.IsDisable === 0 ? 1 : 0.8 },
                          ]}
                        >
                          <Box style={styles.rowContainer}>
                            <Box
                              style={[styles.textContainer, { marginRight: 5 }]}
                            >
                              <AccordionContentText
                                numberOfLines={isExpanded ? undefined : 2}
                                style={[
                                  itemTitle?.styles ? itemTitle?.styles :
                                    styles.mealTypeTitle,
                                  this.showActiveAvailableColor(
                                    box.IsAvailable,box.IsDisable
                                  ),
                                  { textAlign: "justify" },
                                ]}
                              >
                                {box.Item_Name}
                              </AccordionContentText>
                              <AccordionContentText
                                numberOfLines={isExpanded ? undefined : 2}
                                style={[
                                  itemPrice?.styles? itemPrice?.styles:
                                    styles.priceTxt,
                                  this.showActiveAvailableColor(
                                    box.IsAvailable,box.IsDisable
                                  ),
                                ]}
                              >
                                {`$${box.Price}`}
                              </AccordionContentText>
                              <AccordionContentText
                                numberOfLines={isExpanded ? undefined : 1}
                                style={[
                                  itemDescription?.styles?itemDescription?.styles:
                                    styles.descriptionTxt,
                                  this.showActiveAvailableColor(
                                    box.IsAvailable,box.IsDisable
                                  ),
                                  { textAlign: "left", letterSpacing: -0.5 },
                                ]}
                              >
                                {box.Description}
                              </AccordionContentText>
                              {box.Description.length > 100 && (
                                <AccordionContentText
                                  onPress={() =>
                                    this.handleReadMoreToggle(box.Item_Id)
                                  }
                                  style={styles.underLineTxt}
                                >
                                  {isExpanded ? "Show Less" : "Read More"}
                                </AccordionContentText>
                              )}
                            </Box>

                            {box.Image && (
                              <Box style={styles.imageContainer}>
                                <TouchableOpacity  
                                 onPress={closePreviewModal}
                                  style={{
                                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                                  }}
                                  disabled={box.IsAvailable === 0}
                                  >
                                  <Image
                                    source={{ uri: box.Image }}
                                    style={[
                                      styles.mealTypeImg,
                                      box.IsAvailable === 0 && {
                                        filter: "grayscale(100%)",
                                      },
                                    ]}
                                  />
                                </TouchableOpacity>
                                <Modal
                                  visible={itemDataVisible}
                                  transparent={false}
                                  animationType="fade"
                                  onRequestClose={closePreviewModal}
                                  style={{flex:1}}
                                  >
                                  <ItemData />

                                </Modal>
                                <CbAddToCartButton mealItemDetails={box}/>
                              </Box>
                            )}
                          </Box>
                          <Box style={styles.horizontalLine} />
                        </Box>
                      );
                    })}
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </ScrollView>

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
    this.state = {
      showSearchInput: false,
      searchValue: "",
    };
  }

  render() {
    const { showSearchInput, searchValue } = this.state;
    const Searchsource=this.search;
    const Backarrowsource=this.backarrow;
    const Closesource=this.close;
    return (
      <Box
        style={{
          width: showSearchInput ? "100%" : 34,
          height: 31,
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
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "95%",
              height: "100%",
              marginRight: 25
            }}
          >
            <TouchableOpacity   onPress={() => handleCloseClick(this.setState.bind(this), this.props.onSearchActivate) } style={{ marginLeft: 5 }} >
              {
                Backarrowsource ? <Image source={{ uri: Backarrowsource}}/>:<Image alt='image' source={require("@/assets/images/icons/BackArrow.png")} />
              }
            </TouchableOpacity>
            <Input
              style={{
                flex: 1,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 5,
                backgroundColor: "#f0f0f0",
              }}
            >
              <InputField
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
    super();
    this.id = props.id;
    this.buttonText = props.text || "Button";
    this.variant = props.variant || "solid";
    this.onPress = props.onPress;
  }

  render() {

    // Fetch button configuration from global.controlsConfigJson
    const buttonArray = global.controlsConfigJson.find((item) => item.id === this.id);
    const variant = buttonArray?.variant || this.variant;
    const buttonText = buttonArray?.text || this.buttonText ;

    return (
      <Button variant={variant} onPress={this.onPress}   style={{ minWidth: 118, maxWidth: "100%", borderRadius: 11,height: 22, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" }}>
          <ButtonText style={{ fontFamily: "Source Sans Pro", fontSize: 16, fontWeight: "bold", textAlign: "center", flexShrink: 1}} numberOfLines={1}  ellipsizeMode="tail">{buttonText}</ButtonText>
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
    // console.log(this.isTimeModalSelected,"===>>>>changeTime")
    return (
      <TouchableOpacity onPress={() => this.setState({isSelected:true},()=>console.log(this.state.isSelected,"===>this.state.isSelected"))}>
<FormControl isRequired={this.isRequired} isInvalid={this.isInvalid} style={this.style}>
        <FormControlLabel>
          <FormControlLabelText>{selectLabelprop}</FormControlLabelText>
        </FormControlLabel>
       <TouchableOpacity>
       <Select>
          {/* <SelectTrigger>
            <SelectInput placeholder={placeholderprop} />
          <SelectIcon  as={ChevronDownIcon} width={16} height={16} />
          </SelectTrigger> */}
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
      </TouchableOpacity>
      
    );
  }
}

class cbInput extends React.Component {

  constructor(props) {
    super(props);
    this.formId=props.formId;
    this.id=props.id;
    this.labelText = props.labelText || "";
    this.variant = props.variant || "outline";
    this.input=props.input || 'text';
    this.placeholder=props.placeholder || '';
    this.errorMessage=props.errorMessage || '';
    this.isReadOnly=props.isReadOnly || false;
    this.isDisabled=props.isDisabled || false;
    this.isRequired=props.isRequired || false;
    this.isInvalid=props.isInvalid || false;
    this.setFormFieldData=props.setFormFieldData;
    this.style = props.style
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
    this.horizontal = props.horizontal || false
    this.inverted = props.inverted || false
    this.contentContainerStyle = props.contentContainerStyle || {}
    this.ref = props.ref
    this.emptyListText = props.emptyListText || ""
    this.showsHorizontalScrollIndicator = props.showsHorizontalScrollIndicator || false
    this.showsVerticalScrollIndicator = props.showsVerticalScrollIndicator || false
    this.customStyles = props.customStyles || {}
    this.extraData = props.extraData || []
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
        data={this.flatlistData}
        renderItem={this.children}
        keyExtractor={(_) => uuid.v1()}
        numColumns={this.numColumns}
        ListEmptyComponent={this.renderEmptyList}
        initialNumToRender={10}
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
      />
    );
  }
}
class cbCategoryList extends React.Component {
  constructor(props) {
    super();
    this.id = props.id;
  }
  renderMenuCategoryList = (categoryItem, setMealCategory) => {
    if (!categoryItem.IsSelect) {
      categoryItem.IsSelect = 1;
      setMealCategory(categoryItem.Category_Id);
    }

    return (
      <Box>
        <TouchableOpacity
          style={styles.categoryBtn}
          activeOpacity={0.6}
          onPress={() => setMealCategory(categoryItem.Category_Id)}
        >
          <Text style={styles.categoryText}>
            {categoryItem.Category_Name?.toUpperCase()}
          </Text>
          {categoryItem.IsSelect === 1 && <Box style={styles.bottomStyle} />}
        </TouchableOpacity>
      </Box>
    );
  }
  renderMealTypeList = (pureItems,setMealType) => {
    let item = pureItems
    return (
     <Box style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
        <TouchableOpacity
          activeOpacity={0.6}
         style={[item.IsSelect===1 ? styles.activeMenuType:styles.inactiveMenuType]}
          onPress={() => setMealType(item.MealPeriod_Id)}
        >
         <Text style={[styles.mealTypeTxt,{color:item.IsSelect===1?"#ffffff":"#717171"}]}>
            {item.MealPeriod_Name?.toUpperCase()}
          </Text>
         <Text style={[styles.timeDurationTxt,{color:item.IsSelect===1?"#fff":"#000"}]}>
            {item.Time}
          </Text>
        </TouchableOpacity>
      </Box>
    );
  }

  render() {
    return (
      <FormContext.Consumer>
        {({ menuOrderData,addItemToCartBtn,updateCartItemQuantity,cartData}) => {
          const buttonArray = global.controlsConfigJson.find(
            (item) => item.id === this.id
          );
          const variant = buttonArray?.variant || this.variant;
          const buttonText = buttonArray?.text || this.buttonText;

          return (
            <>
              {menuOrderData.MenuItems?.map((mealCategory) => {
                if (mealCategory.IsSelect === 1) {
                  return mealCategory.Categories.map((categoryList) => {
                    if (categoryList.IsSelect === 1) {
                      return (
                        <Box>
                          <CbAccordion AccordionData={categoryList.Submenu} addItemToCartBtn={addItemToCartBtn} updateCartItemQuantity={updateCartItemQuantity} cartData={cartData}/>
                        </Box>
                      );
                    }
                  });
                }
              })}
            </>
          );
        }}
      </FormContext.Consumer>
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
          onPress={() => this.onPress()}
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
CbAccordion.displayName='CbAccordion';
CbFlatList.displayName = "CbFlatList"
cbCategoryList.displayName = "cbCategoryList"
cbSearchbox.displayName='cbSearchbox';
CbFloatingButton.displayName='CbFloatingButton';
CbAddToCartButton.displayName = "CbAddToCartButton"
CbCommonButton.displayName = "CbCommonButton";
CbAccordionlist.displayName='CbAccordionlist';


 export {CbCommonButton, CbHomeButton, CbBackButton, cbButton, cbInput, cbCheckBox, cbSelect, cbImageBackground, cbRadioButton, cbVStack, cbForm, CbAccordion,CbFlatList,cbCategoryList,cbSearchbox,CbFloatingButton,CbImage,CbAddToCartButton,CbAccordionlist };