//  

//import { useLoginLogic } from '@/source/controller/login/login';
import * as UI from '@/components/cobalt/importUI';

import {  CheckIcon, ChevronDownIcon,ChevronUpIcon, CircleIcon, Icon } from '@/components/ui/icon';

export default function MenuScreen(props) {
 
   
  

  return (
    
  
    <UI.ScrollView contentContainerStyle={styles.scrollContent}>
      <UI.cbForm >
        <UI.cbVStack id='VStack1'>      
           <UI.cbHeader headerText='Living Room' isHomeEnable={true} {...props}/>
           <UI.Box style={{ display: "flex", flexDirection: "row", }}>
            <UI.cbSearchbox/>
           </UI.Box>
        </UI.cbVStack>
      </UI.cbForm>
    </UI.ScrollView>
   
    
  );
}

const styles = UI.StyleSheet.create({
 
  scrollContent: {
    padding: 20,
  },
  
});