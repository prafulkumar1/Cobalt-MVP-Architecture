
//import { useLoginLogic } from '@/source/controller/login/login';
import * as UI from '@/components/cobalt/importUI';
import { useFormContextProvider,useFormContext } from '@/components/cobalt/event';
import {  CheckIcon, ChevronDownIcon,ChevronUpIcon, CircleIcon, Icon } from '@/components/ui/icon';
//import { Icon } from 'lucide-react-native';
import {useLoginLogic} from '../../controller/login/login';


const pageId='Login';
export default function LoginScreen(props) {

 let pageConfigJson = global.appConfigJsonArray.find(item => item.PageId === pageId);

 global.controlsConfigJson = pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];

   const {  handleLogin } = useLoginLogic();
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
      boxComponents: [
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
      value: 'b',
      title: 'What payment methods do you accept?',
      boxComponents: [
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
      value: 'c',
      title: 'Do you offer international shipping?',
      boxComponents: [
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
    
  <UI.cbImageBackground id='loginBackground' source={require('@/assets/images/loginapp.png')}> 
   <UI.ScrollView contentContainerStyle={styles.scrollContent}>
  <UI.cbForm formId={pageId} setFormFieldData={setFormFieldData}>
  <UI.cbVStack id='VStack1'>      
    <UI.cbInput  id='username' setFormFieldData={setFormFieldData}/>
     <UI.cbInput  id='password' setFormFieldData={setFormFieldData} />
    <UI.cbCheckBox id='rememberme' customStyles={{  CheckIcon:{color:'white'}, }}/>
    <UI.cbSelect id="department"/>
    <UI.cbRadioButton id='gender' />
    <UI.cbButton id='login' variant='solid' text='signin' onPress={()=>handleLogin(props)}/>
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