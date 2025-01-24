//  

//import { useLoginLogic } from '@/source/controller/login/login';
import * as UI from '@/components/cobalt/importUI';
import { useState } from 'react';
import {  CheckIcon, ChevronDownIcon,ChevronUpIcon,ChevronsRightIcon, CircleIcon, Icon,InfoIcon } from '@/components/ui/icon';
import { ShoppingCart } from 'lucide-react';
import { navigateToScreen } from '@/source/constants/Navigations'
import { useFormContext } from '@/components/cobalt/event';


export default function MenuScreen(props) { 
  // const [isSearchActive, setIsSearchActive] = useState(false);
  const {isSearchActive,handleChangeState}= useFormContext();


  return (
    
  
        <UI.ScrollView contentContainerStyle={styles.scrollContent}>
          <UI.cbForm >
            <UI.cbVStack id='VStack1'>      
              <UI.cbHeader headerText='Living Room' isHomeEnable={true} {...props}/>
              <UI.Box style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <UI.cbSearchbox onSearchActivate={() => handleChangeState()}/>
                {!isSearchActive && (
                <UI.Box style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 6, borderBottom: 1, backgroundColor: "white", width: 328, height: 31,  alignItems: "center", }}>
                  <UI.TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                      <UI.Icon as={InfoIcon} size="lg" style={{ color: "#5773A2" }} />
                  </UI.TouchableOpacity>
                  <UI.Text style={{fontSize: 16, fontWeight: "bold", right:80, lineHeight: 20, }}>
                       Recent Orders
                  </UI.Text>
                  <UI.TouchableOpacity  onPress={() => navigateToScreen(props, "Recentorders")}>
                      <UI.Icon as={ChevronsRightIcon} size="lg"  style={{fontSize: 30, color: "#5773A2", cursor: "pointer",}}/>
                  </UI.TouchableOpacity>
                </UI.Box>
                )}
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