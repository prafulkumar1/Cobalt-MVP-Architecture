import React,{useState,useContext} from 'react';
import { FlatList, ImageBackground, StyleSheet,I18nManager,Image, TouchableOpacity, ScrollView} from 'react-native';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { Checkbox,CheckboxIcon,CheckboxIndicator,CheckboxLabel,CheckboxGroup } from '@/components/ui/checkbox';
import {  House, } from 'lucide-react-native';
import {  CheckIcon,ChevronsLeftIcon,ChevronsRightIcon, ChevronDownIcon, CircleIcon,ChevronUpIcon,AddIcon,TrashIcon,RemoveIcon,SearchIcon,CloseIcon,ArrowLeftIcon } from '@/components/ui/icon';
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



import { handleSearchClick, handleClearClick, handleCloseClick } from "./event";
class CbAccordion extends React.Component {
  constructor(props) {
    super(props);
    this.AccordionData = Array.isArray(props.AccordionData) ? props.AccordionData : [];
    this.state = {
      expandedIndex: null,
    };
  }

  handleReadMoreToggle = (index) => {
    this.setState((prevState) => ({
      expandedIndex: prevState.expandedIndex === index ? null : index,
    }));
  };

  renderAddToCartBtn = (quantity,IsAvailable) => {
    if (quantity === 0) {
      return (
        <TouchableOpacity
          style={[styles.addItemToCartBtn,{borderColor:IsAvailable ===1?"#5773a2":"#4B515469"}]}
          activeOpacity={0.5}
        >
          <Icon as={AddIcon} color={IsAvailable ===1?"#5773a2":"#4B515469"} />
        </TouchableOpacity>
      )
    } else if (quantity === 1) {
      return (
        <Box style={styles.operationBtn}>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon as={TrashIcon} color="#5773a2" size={18} />
          </TouchableOpacity>
          <Text style={styles.quantityTxt}>{quantity}</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon as={AddIcon} color="#5773a2" size={20} />
          </TouchableOpacity>
        </Box>
      )
    } else {
      return (
        <Box style={styles.operationBtn}>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon as={RemoveIcon} color="#5773a2" size={18} />
          </TouchableOpacity>
          <Text style={styles.quantityTxt}>{quantity}</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon as={AddIcon} color="#5773a2" size={20} />
          </TouchableOpacity>
        </Box>
      )
    }
  }

  showActiveAvailableColor = (isAvailable) => {
    return {color:isAvailable ===1?"#4B5154":"#4B515469"}
  }

  render() {
    const componentdata = this.AccordionData;
    const { expandedIndex } = this.state;

    return (
      <Accordion defaultValue={componentdata?.map((item) => item.Submenu_Name)}  variant="filled" type="multiple" isCollapsible={true} isDisabled={false}>
        {componentdata && componentdata.map((item) => (
        <AccordionItem key={item.Submenu_Name} value={item.Submenu_Name}>
          <AccordionHeader style={{marginBottom:10}}>
            <AccordionTrigger>
              {({ isExpanded }) => (
                <>
                  <AccordionTitleText style={{color:"#5773a2",fontSize:16}}>{item.Submenu_Name}</AccordionTitleText>
                  {isExpanded ? (
                    <AccordionIcon as={ChevronUpIcon} width={20} height={20} className="ml-3" />
                  ) : (
                    <AccordionIcon as={ChevronDownIcon} width={20} height={20} className="ml-3" />
                  )}
                </>
              )}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent style={{marginTop:10}} >
              {item.Items &&
                item.Items.map((box, index) => (
                  <Box
                    key={index}
                    style={[styles.subContainer,{opacity:box.IsAvailable ===1 ?1:0.8}]}
                  >
                    <Box style={styles.contentContainer}>
                    <AccordionContentText
                        numberOfLines={expandedIndex === index ? undefined : 2}
                        style={[styles.mealTypeTitle,this.showActiveAvailableColor(box.IsAvailable)]}
                        >
                        {box.Item_Name}
                        </AccordionContentText>
                        <AccordionContentText
                        numberOfLines={expandedIndex === index ? undefined : 2}
                        style={[styles.priceTxt,this.showActiveAvailableColor(box.IsAvailable)]}
                        >
                        {`$${box.Price}.00`}
                        </AccordionContentText>
                    <AccordionContentText
                        numberOfLines={expandedIndex === index ? undefined : 1}
                        style={[styles.descriptionTxt,this.showActiveAvailableColor(box.IsAvailable)]}
                        >
                        {box.Description}
                        </AccordionContentText>
                        {box.Description.length > 100 && (
                        <AccordionContentText
                          onPress={() => this.handleReadMoreToggle(index)}
                          style={styles.underLineTxt}
                        >
                          {expandedIndex === index ? 'Show Less' : 'Read More'}
                        </AccordionContentText>
                        )}
                    </Box>
                    {box.Image && (
                      <Box>                                   
                           <Image
                          source={{ uri: box.Image }}
                          style={[styles.mealTypeImg,box.IsAvailable ===0 && {filter:'grayscale(100%)'}]}
                        />
                     
                        {this.renderAddToCartBtn(0,box.IsAvailable)}
                      </Box>
                    )}
                  </Box>
                ))}
        </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
    );
  }
}


class cbSearchbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchInput: false,
      searchValue: "",
    };
  }

  render() {
    const { showSearchInput, searchValue } = this.state;
    return (
      <Box
        style={{
          width: showSearchInput ? "100%" : 34,
          height: 31,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: showSearchInput ? "#f0f0f0" : "white",
        }}
      >
        {showSearchInput ? (
          <Box
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              height: "100%",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                handleCloseClick(this.setState.bind(this), this.props.onSearchActivate)
              }
              style={{ marginLeft: 5 }}
            >
              <Icon as={ArrowLeftIcon} size="md" style={{ color: "#5773A2", marginRight: 5 }} />
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
            <TouchableOpacity
              onPress={() =>
                handleClearClick(
                  this.setState.bind(this),
                  this.state.searchValue,
                  this.props.onSearchActivate
                )
              }
              style={{ marginLeft: 5 }}
            >
              <Icon as={CloseIcon} size="md" style={{ color: "#5773A2" }} />
            </TouchableOpacity>
          </Box>
        ) : (
          <TouchableOpacity
            onPress={() =>
              handleSearchClick(this.setState.bind(this), this.props.onSearchActivate)
            }
          >
            <Icon as={SearchIcon} size="xl" style={{ color: "#5773A2" }} />
          </TouchableOpacity>
        )}
      </Box>
    );
  }
}


class cbHeader extends React.Component {
  constructor(props) {
    super(props);
    this.headerText = props.headerText || "Header";
    this.isHomeEnable = props.isHomeEnable !== false; 
  }

  render() {
    const headerText = this.headerText;
    const isHomeEnable = this.isHomeEnable;
    

    return (
      <Box
        style={{
          display: "flex",    
          flexDirection: "row",      
          justifyContent: "space-between",
          padding: 10,
          borderBottom: 1,
          backgroundColor: 'white',
        }}
      >
         <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
            <Icon as={ChevronsLeftIcon} size='xl' style={{ color:'#5773A2' ,top:5, }} />
          </TouchableOpacity>
          
          <Text style={{ right:97, fontSize: 20}}>{headerText}</Text>
        {isHomeEnable && (
          <TouchableOpacity onPress={()=>navigateToScreen(this.props,'Login')}>
          <Icon as={House} size='xl'  style={{ top:7, fontSize:30,color:'#5773A2', cursor: "pointer" }} />
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
      <Button variant={variant} onPress={this.onPress}>
        <ButtonText>{buttonText}</ButtonText>
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
        <CheckboxIcon as={CheckIcon} style={styles.CheckIcon}/>
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
  }

  render() {
    const inputArray = global.controlsConfigJson.find(item => item.id === this.id);
    const selectLabelprop = inputArray?.labelText  || this.selectLabel;
    const placeholderprop = inputArray?.placeholder || this.placeholder;
    const selectItems = Array.isArray(inputArray?.options) ? inputArray.options : this.selectItems;
    
    return (      
      <FormControl isRequired={this.isRequired} isInvalid={this.isInvalid}>
      <FormControlLabel>
        <FormControlLabelText>{selectLabelprop}</FormControlLabelText>
      </FormControlLabel>
      <Select>
        <SelectTrigger>
          <SelectInput placeholder={placeholderprop} />
          <SelectIcon  as={ChevronDownIcon} width={16} height={16} />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
            <SelectContent>
            {selectItems.map((item, index) => (
            <SelectItem key={index} label={item.label} value={item.value}/>
            ))}
            </SelectContent>
        </SelectPortal>
      </Select>
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
      <FormControl  isDisabled={isDisabledprop}   isReadOnly={isReadOnlyprop}   isRequired={isRequiredprop}   >
      {labelTextprop && (
        <FormControlLabel>
          <FormControlLabelText>{labelTextprop}</FormControlLabelText>
        </FormControlLabel>
      )}
      <Input variant={variantprop}>
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
    let item = categoryItem
    return (
      <Box>
        <TouchableOpacity
          style={styles.categoryBtn}
          activeOpacity={0.6}
          onPress={() => setMealCategory(item.Category_Id)}
        >
          <Text style={styles.categoryText}>
            {item.Category_Name?.toUpperCase()}
          </Text>
          {
            item.IsSelect ===1 &&
            <Box style={styles.bottomStyle} />
          }
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
        {({ menuOrderData, setMealType, setMealCategory }) => {
          const buttonArray = global.controlsConfigJson.find(
            (item) => item.id === this.id
          );
          const variant = buttonArray?.variant || this.variant;
          const buttonText = buttonArray?.text || this.buttonText;

          return (
            <>
              {/* <CbFlatList
                    flatlistData={menuOrderData.MenuItems}
                    children={(item) => this.renderMealTypeList(item,setMealType)}
                    horizontal={true}
                    contentContainerStyle={styles.categoryBottomContainer}
                  /> */}
              <ScrollView
                horizontal={false}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexDirection: "row" }}
              >
                {menuOrderData.MenuItems?.map((item) =>
                  this.renderMealTypeList(item, setMealType)
                )}
              </ScrollView>

              {menuOrderData.MenuItems?.map((mealCategory) => {
                if (mealCategory.IsSelect === 1) {
                  return (
                    <>
                      <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ flexDirection: "row" }}
                      >
                        {
                          mealCategory.Categories.map((items) => {
                            return this.renderMenuCategoryList(
                              items,
                              setMealCategory
                            );
                          })
                          //   <CbFlatList
                          //   flatlistData={mealCategory.Categories}
                          //   children={(items) =>
                          //     this.renderMenuCategoryList(items, setMealCategory)
                          //   }
                          //   horizontal={true}
                          //   contentContainerStyle={styles.subCategoryContainer}
                          // />
                        }
                      </ScrollView>
                    </>
                  );
                }
              })}
              {menuOrderData.MenuItems?.map((mealCategory) => {
                if (mealCategory.IsSelect === 1) {
                  return mealCategory.Categories.map((categoryList) => {
                    if (categoryList.IsSelect === 1) {
                      return (
                        <Box>
                          <CbAccordion AccordionData={categoryList.Submenu} />
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
cbHeader.displayName='cbHeader';
cbSearchbox.displayName='cbSearchbox';
cbCategoryList.displayName = "cbCategoryList"
cbHeader.displayName = "cbHeader"

 export {  cbButton, cbInput, cbCheckBox, cbSelect, cbImageBackground, cbRadioButton, cbVStack, cbForm, CbAccordion,CbFlatList,cbCategoryList,cbHeader,cbSearchbox };


