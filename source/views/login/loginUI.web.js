
//import { useLoginLogic } from '@/source/controller/login/login';
import * as UI from '@/components/cobalt/importUI';
import { useFormContextProvider,useFormContext } from '@/components/cobalt/event';
import {  CheckIcon, ChevronDownIcon,ChevronUpIcon, CircleIcon } from '@/components/ui/icon';

const pageId='Login';
export default function LoginScreen() {

 let pageConfigJson = global.appConfigJsonArray.find(item => item.PageId === pageId);

 global.controlsConfigJson = pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];

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
const Menu = [
  {
    subMenuID:1,
    value: 'a',
    title: 'How do I place an order?',
    Items: [
      {
        content:
          'To place an order, simply select the products you want, proceed to checkout, provide shipping and payment information, and finalize your purchase.',
        hasButton: true,
        image:
          'https://images.pexels.com/photos/371589/pexels-photo-371589.jpeg?cs=srgb&dl=clouds-conifer-daylight-371589.jpg&fm=jpg',
      },
      {
        content: 'Track your order in real-time using our tracking tool.reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        hasButton: true,
        image:
          'https://th.bing.com/th/id/OIP.hKF-QDQbOe-0GEQyJoHfGAHaE8?w=768&h=512&rs=1&pid=ImgDetMain',          
      },
    ],
  },
  {
    subMenuID:2,
    value: 'b',
    title: 'What payment methods do you accept?',
    Items: [
      {
        content:
          'We accept all major credit cards, including Visa, Mastercard, and American Express. We also support payments through PayPal.',
        hasButton: true,
        image:
          'https://th.bing.com/th/id/OIP.sMwRMBSUdMnT1mtw6hPV6gHaDt?rs=1&pid=ImgDetMain',
      },
      {
        content: 'Learn about our secure payment systems for your protection.rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
        hasButton: true,
        image:
          'https://th.bing.com/th/id/OIP.lMIicWhX0zFIcOTsyVB9cAHaER?rs=1&pid=ImgDetMain',
      },
    ],
  },
  {
    subMenuID:3,
    value: 'c',
    title: 'Do you offer international shipping?',
    Items: [
      {
        content:
          'Yes, we offer international shipping to most countries worldwide. Additional fees may apply.',
        hasButton: true,
        image:
          'https://th.bing.com/th/id/OIP.-TPjwxLKsCJqi_CMvIEDvAHaHv?rs=1&pid=ImgDetMain',
      },
      {
        content: 'Check our shipping rates and delivery times for your region.',
        hasButton: true,
        image:
          'https://images.unsplash.com/photo-1556740714-a8395b3bf30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      },
      {
        content: 'Understand our international shipping policies in detail.',
        hasButton: true,
        image:
          'https://images.unsplash.com/photo-1556745755-8d76bdb6984b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
];
    return (
    
    <UI.cbImageBackground id='loginBackground' source={require('@/assets/images/login.jpg')}> 
     <UI.ScrollView contentContainerStyle={styles.scrollContent}>
      <UI.cbVStack id='VStack1'>    
        <UI.cbInput formId={pageId} id='username'  />
        <UI.cbInput formId={pageId} id='password'  />
        <UI.cbCheckBox id='rememberme'/>
        <UI.cbSelect id="department"/>
        <UI.cbRadioButton id='gender' />
        <UI.cbButton id='login' variant='solid' text='signin'/>
        <UI.cbButton id='cancel' variant='link'/>
        <UI.cbAccordion MenuList={Menu} />
        </UI.cbVStack>
        </UI.ScrollView>
        </UI.cbImageBackground>
      
    );
}

const styles = UI.StyleSheet.create({
 
  scrollContent: {
    padding: 20,
  },
 
});
