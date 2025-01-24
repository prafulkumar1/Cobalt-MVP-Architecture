import * as UI from '@/components/cobalt/importUI';


export default function RecentordersScreen(props) { 
   
  
    return (
      
    
          <UI.ScrollView contentContainerStyle={styles.scrollContent}>
            <UI.cbForm >
              <UI.cbVStack id='VStack1'>      
                <UI.cbHeader headerText='Living Room' isHomeEnable={true} {...props}/>
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