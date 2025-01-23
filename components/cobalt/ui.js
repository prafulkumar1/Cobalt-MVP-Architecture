import React,{useState,useContext} from 'react';
import { FlatList, ImageBackground, StyleSheet,I18nManager,Image, TouchableOpacity} from 'react-native';
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
//import {  Check, ChevronDownIcon, CircleIcon } from 'lucide-react-native';
import {  CheckIcon, ChevronDownIcon, CircleIcon,ChevronUpIcon,AddIcon,TrashIcon,RemoveIcon } from '@/components/ui/icon';
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
import { commonStyles, styles } from './style';
import uuid from  "react-native-uuid"
class cbAccordion extends React.Component {
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

  renderAddToCartBtn = (quantity) => {
    if (quantity === 0) {
      return (
        <TouchableOpacity
          style={styles.addItemToCartBtn}
          activeOpacity={0.5}
          onPress={() => this.handleCountIncrement()}
        >
          <Icon as={AddIcon} color="#5773a2" />
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

  render() {
    const componentdata = this.AccordionData;
    const { expandedIndex } = this.state;

    return (
      <Accordion variant="filled" type="multiple" isCollapsible={true} isDisabled={false}>
        {componentdata && componentdata.map((item) => (
        <AccordionItem key={item.sub_category_title} value={item.sub_category_title}>
          <AccordionHeader style={{marginBottom:10}}>
            <AccordionTrigger>
              {({ isExpanded }) => (
                <>
                  <AccordionTitleText style={{color:"#5773a2",fontSize:16}}>{item.sub_category_title}</AccordionTitleText>
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
              {item.sub_category_data &&
                item.sub_category_data.map((box, index) => (
                  <Box
                    key={index}
                    style={styles.subContainer}
                  >
                    <Box style={styles.contentContainer}>
                    <AccordionContentText
                        numberOfLines={expandedIndex === index ? undefined : 2}
                        style={styles.mealTypeTitle}
                        >
                        {box.dish_title}
                        </AccordionContentText>
                        <AccordionContentText
                        numberOfLines={expandedIndex === index ? undefined : 2}
                        style={styles.priceTxt}
                        >
                        {box.price}
                        </AccordionContentText>
                    <AccordionContentText
                        numberOfLines={expandedIndex === index ? undefined : 1}
                        style={styles.descriptionTxt}
                        >
                        {box.dish_description}
                        </AccordionContentText>
                        {box.dish_description.length > 100 && (
                        <AccordionContentText
                          onPress={() => this.handleReadMoreToggle(index)}
                          style={styles.underLineTxt}
                        >
                          {expandedIndex === index ? 'Show Less' : 'Read More'}
                        </AccordionContentText>
                        )}
                    </Box>
                    {box.image && (
                      <Box>
                        <Image
                          alt="image"
                          source={{ uri: box.image }}
                          style={styles.mealTypeImg}
                        />
                        {box.is_subcategroy_item_open && (
                          <>
                          {this.renderAddToCartBtn(box.quantity)}
                          </>
                        )}
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
    // const {getFormFieldData,setFormFieldData}= useFormContext();
    this.setFormFieldData=props.setFormFieldData;
    // this.getFormFieldData= useFormContext();
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
          // value={fieldData.value} 
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

class cbFlatList extends React.Component{
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
      />
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
cbAccordion.displayName='cbAccordion';
cbFlatList.displayName = "cbFlatList"

 export {  cbButton, cbInput, cbCheckBox, cbSelect, cbImageBackground, cbRadioButton, cbVStack, cbForm, cbAccordion,cbFlatList };


