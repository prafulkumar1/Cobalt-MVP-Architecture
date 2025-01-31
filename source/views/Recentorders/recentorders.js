import * as UI from '@/components/cobalt/importUI';
import { RecentordersData,ModifiersData } from '@/source/constants/commonData';


export default function RecentordersScreen(props) { 
   
  
    return (
      <UI.Box>
        <UI.Box style={{display:"flex",flexDirection:"row", marginVertical:11,marginLeft:8, gap: 5}}>
          <UI.cbButton text="Favorites" variant="sloid"/>
          <UI.cbButton text="Recent Orders" variant="sloid"/>
        </UI.Box>
         {/* <UI.CbAccordionlist componentData={RecentordersData} screenName="RecentOrders"/>  */}
        <UI.CbAccordionlist componentData={ModifiersData} screenName="Modifiers"/>
      </UI.Box>
  
      
    );
  }
  const styles = UI.StyleSheet.create({
   
    scrollContent: {
      padding: 20,
    },
    
  });