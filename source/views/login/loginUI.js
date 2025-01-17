
//import { useLoginLogic } from '@/source/controller/login/login';
import * as UI from '@/components/cobalt/importUI';
import { useFormContextProvider,useFormContext } from '@/components/cobalt/event';
import {  CheckIcon, ChevronDownIcon,ChevronUpIcon, CircleIcon, Icon } from '@/components/ui/icon';
//import { Icon } from 'lucide-react-native';


const pageId='Login';
export default function LoginScreen() {

 let pageConfigJson = global.appConfigJsonArray.find(item => item.PageId === pageId);

 global.controlsConfigJson = pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];

  // const {  handleLogin } = useLoginLogic();
  const {getFormFieldData,setFormFieldData}= useFormContext();
  const departments =[
    {label:'Dining', value:'dining'},
    {label:'Golf', value:'golf'},
    {label:'Tennis', value:'tennis'},
    {label:'Pool', value:'pool'},
  ];
  const genderOptions=[
    {label:'Male', value:'male'},
    {label:'FeMale', value:'female'},
    {label:'Others', value:'others'},
  ]
  const AccordionData = [
    {
      value: 'a',
      title: 'How do I place an order?',
      content: 'To place an order, simply select the products you want, proceed to checkout, provide shipping and payment information, and finalize your purchase.',
      hasButton: false,
      image: 'https://images.pexels.com/photos/371589/pexels-photo-371589.jpeg?cs=srgb&dl=clouds-conifer-daylight-371589.jpg&fm=jpg', 
    },
    {
      value: 'b',
      title: 'What payment methods do you accept?',
      content: 'We accept all major credit cards, including Visa, Mastercard, and American Express. We also support payments through PayPal.',
      hasButton: true,
      buttonProps: { id: 'login', variant: 'solid', text: 'Sign In' },
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", 
    },
    {
      value: 'c',
      title: 'Do you offer international shipping?',
      content: 'Yes, we offer international shipping to most countries worldwide. Additional fees may apply.',
      hasButton: false,
    },
  ];

  return (
    
  <UI.cbImageBackground id='loginBackground' source={require('@/assets/images/loginapp.png')}> 
   <UI.ScrollView contentContainerStyle={styles.scrollContent}>
  <UI.cbForm formId={pageId} setFormFieldData={setFormFieldData}>
  <UI.cbVStack id='VStack1'>      
    <UI.cbInput  id='username' setFormFieldData={setFormFieldData}/>
     <UI.cbInput  id='password' setFormFieldData={setFormFieldData} />
    <UI.cbCheckBox id='rememberme' customStyles={{  CheckIcon:{color:'white'}, }}/>
    <UI.cbSelect id="department"/>
    <UI.cbRadioButton id='gender' />
    <UI.cbButton id='login' variant='solid' text='signin'/>
    <UI.cbButton id='cancel' variant='link'/>
    <UI.cbAccordion AccordionData={AccordionData} />
    </UI.cbVStack>
    </UI.cbForm>
    </UI.ScrollView>
    </UI.cbImageBackground>
    
  );
}

const styles = UI.StyleSheet.create({
 
  scrollContent: {
    padding: 20,
  },
  
});