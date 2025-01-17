
import React, { useState } from 'react';
import { StyleSheet,  Pressable, Image, } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { Box } from '@/components/ui/box';


const Topbar = () => { 
    return(
        <VStack style={styles.container}>
      <HStack  style={styles.headerContainer}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
        />
        <HStack style={styles.rightContainer}>
          <Button variant='link' style={styles.iconContainer}>
            <Image
              source={{ uri: 'https://member.apogeeclub.com/assets/images/Bell_Icon.svg' }}
              style={styles.icon}
            />
          </Button>
          <Text style={styles.greetingText}>
            Hi, Lia Little
          </Text>
          <Button variant='link' style={styles.profileContainer}>
            <Image
              source={{ uri: 'https://member.apogeeclub.com/assets/images/profile.png' }}
              style={styles.profileIcon}
            />
          </Button>
        </HStack>

       </HStack>
       
    </VStack>

    );
}

const Menu = () => {
  const [visibleMenu, setVisibleMenu] = useState(null); 
    const[hoveredItem,setHoveredItem]=useState(null);
  
  return(
      <HStack style={styles.menuContainer}>
        <Button variant='link'
            onMouseEnter={() => setVisibleMenu('home')}
            onMouseLeave={() =>  {
              setVisibleMenu(null);
              setHoveredItem(null); // Reset hovered item when not hovering over menu
            }}
            style={({ pressed }) => [
              styles.menuButton,
              { backgroundColor: pressed ? '#ddd' : '#fff' }, // Change background on press
            ]}
          >
            <Text style={styles.menuText}>Home</Text>
            {visibleMenu === 'home' && (
              <VStack style={styles.dropdown}>
              </VStack>
            )}
          </Button>

          <Button variant='link'
          onMouseEnter={() => setVisibleMenu('myClub')}
          onMouseLeave={() =>  {
            setVisibleMenu(null);
            setHoveredItem(null); // Reset hovered item when not hovering over menu
          }}
          style={({ pressed }) => [
            styles.menuButton,
            { backgroundColor: pressed ? '#ddd' : '#fff' },
          ]}
        >
          <Text style={styles.menuText}>My Club</Text>
          {visibleMenu === 'myClub' && (
            <VStack style={styles.dropdown}>
              <Button variant='link'
                onMouseEnter={() => setHoveredItem('clubNews')}
                onMouseLeave={() => setHoveredItem(null)}
                style={[
                  hoveredItem === 'clubNews' && styles.hoveredDropdownItem,
                ]}
              >
                <Text style={styles.dropdownItem}>Club News</Text>
              </Button>
              <Button variant='link'
                onMouseEnter={() => setHoveredItem('imoortantclubnumbers')}
                onMouseLeave={() => setHoveredItem(null)}
                style={[
                  hoveredItem === 'imoortantclubnumbers' && styles.hoveredDropdownItem,
                ]}
              >
                <Text style={styles.dropdownItem}>Important Club Numbers</Text>
              </Button>
  
            </VStack>
          )}
        </Button>

        <Button variant='link'
          onMouseEnter={() => setVisibleMenu('culturalarts&activities')}
          onMouseLeave={() =>  {
            setVisibleMenu(null);
            setHoveredItem(null); // Reset hovered item when not hovering over menu
          }}
          style={({ pressed }) => [
            styles.menuButton,
            { backgroundColor: pressed ? '#ddd' : '#fff' },
          ]}
        >
          <Text style={styles.menuText}>Cultural Activities</Text>
          {visibleMenu === 'culturalarts&activities' && (
            <VStack style={styles.dropdown}>
              <Button variant='link'
              onMouseEnter={() =>setHoveredItem('calenderofevents')}
              onMouseLeave={() =>setHoveredItem(null)}
              style={[
                hoveredItem === 'calenderofevents' && styles.hoveredDropdownItem,
              ]}
              >    <Text style={styles.dropdownItem}>Calender of Events</Text>
              </Button>
              
              <Button variant='link'
              onMouseEnter={() =>setHoveredItem('eventrequests')}
              onMouseLeave={() =>setHoveredItem(null)}
              style={[
                hoveredItem === 'eventrequests' && styles.hoveredDropdownItem,
              ]}
              ><Text style={styles.dropdownItem}>Event Requests</Text></Button>            
            </VStack>
          )}
        </Button>

        <Button variant='link'
          onMouseEnter={() => setVisibleMenu('dining&catering')}
          onMouseLeave={() =>  {
            setVisibleMenu(null);
            setHoveredItem(null); // Reset hovered item when not hovering over menu
          }}
          style={({ pressed }) => [
            styles.menuButton,
            { backgroundColor: pressed ? '#ddd' : '#fff' },
          ]}
        >
          <Text style={styles.menuText}>Dining & Catering</Text>
          {visibleMenu === 'dining&catering' && (
            <VStack style={styles.dropdown}>
              <Button variant='link'
              onMouseEnter={() =>setHoveredItem('diningresv')}
              onMouseLeave={() =>setHoveredItem(null)}
              style={[
                hoveredItem === 'diningresv' && styles.hoveredDropdownItem,
              ]}
              ><Text style={styles.dropdownItem}>Dining Resv & Conf</Text></Button>
              <Button variant='link'
              onMouseEnter={() =>setHoveredItem('ourrestarunts')}
              onMouseLeave={() =>setHoveredItem(null)}
              style={[
                hoveredItem === 'ourrestarunts' && styles.hoveredDropdownItem,
              ]}
              ><Text style={styles.dropdownItem}>Our Restarunts</Text></Button>            
              
            </VStack>
          )}
        </Button>

        <Button variant='link'
          onMouseEnter={() => setVisibleMenu('golf')}
          onMouseLeave={() =>  {
            setVisibleMenu(null);
            setHoveredItem(null); // Reset hovered item when not hovering over menu
          }}
          style={({ pressed }) => [
            styles.menuButton,
            { backgroundColor: pressed ? '#ddd' : '#fff' },
          ]}
        >
          <Text style={styles.menuText}>Golf</Text>
          {visibleMenu === 'golf' && (
            <VStack style={styles.dropdown}>
              <Button variant='link'
              onMouseEnter={() =>setHoveredItem('bookalesson')}
              onMouseLeave={() =>setHoveredItem(null)}
              style={[
                hoveredItem === 'bookalesson' && styles.hoveredDropdownItem,
              ]}
              ><Text style={styles.dropdownItem}>Book a Lesson</Text></Button>
              <Button variant='link'
              onMouseEnter={() =>setHoveredItem('teetimes')}
              onMouseLeave={() =>setHoveredItem(null)}
              style={[hoveredItem === 'teetimes' && styles.hoveredDropdownItem,   ]}
              ><Text style={styles.dropdownItem}>Tee Times</Text></Button>       
            </VStack>
          )}
        </Button>

        <Button variant='link'
          onMouseEnter={() => setVisibleMenu('racquetsports')}
          onMouseLeave={() =>  {
            setVisibleMenu(null);
            setHoveredItem(null); // Reset hovered item when not hovering over menu
          }}
          style={({ pressed }) => [
            styles.menuButton,
            { backgroundColor: pressed ? '#ddd' : '#fff' },
          ]}
        >
          <Text style={styles.menuText}>Racquet Sports</Text>
          {visibleMenu === 'racquetsports' && (
            <VStack style={styles.dropdown}>
              <Button variant='link'
              onMouseEnter={() =>setHoveredItem('bookalesson')}
              onMouseLeave={() =>setHoveredItem(null)}
              style={[
                hoveredItem === 'bookalesson' && styles.hoveredDropdownItem,
              ]}
              ><Text style={styles.dropdownItem}>Book a Lesson</Text></Button>
              <Button variant='link'
              onMouseEnter={() =>setHoveredItem('teetimes')}
              onMouseLeave={() =>setHoveredItem(null)}
              style={[
                hoveredItem === 'teetimes' && styles.hoveredDropdownItem,
              ]}
              ><Text style={styles.dropdownItem}>Tee Times</Text></Button>  
            </VStack>
          )}
        </Button>

      </HStack>
  );
}

const styles = StyleSheet.create({
    logo:{
        paddingLeft: 800,
        width: 100, height: 70, resizeMode: 'contain'
      },
      container:{
        backgroundColor: 'white',
        flex: 1,
      },
      headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
      },
      rightContainer: {
        paddingRight: 320,
        flexDirection: 'row',
        alignItems: 'center',
      },
      iconContainer: {
        paddingRight: 80,
      },
      icon: {
        width: 33,
        height: 33,
        resizeMode: 'contain',
      },
      greetingText: {
        fontSize: 19,
        color: '#707070',
        marginRight: 25,
        marginBottom: 12,
      },
      profileContainer: {
        width: 48,
        height: 48,
        //borderRadius: 15,
        overflow: 'hidden',
      },
      profileIcon: {
        width: 45,
        height: 45,
        borderRadius: '80%',
        background: '#F4F4F4',
        resizeMode: 'contain',
      },
  menuContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  menuButton: {
    padding: 10,
  },
  menuText: {
    fontSize: 20,
    color: '#333',
  },
  dropdown: {
    position: 'absolute',
    top: 40,
    left: 0,
    width: 200,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 1000,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  hoveredDropdownItem: {
    //backgroundColor: '#3b5998',
  },
});

export { Topbar, Menu };