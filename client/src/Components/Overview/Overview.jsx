import React from 'react';
import {
  Flex,
  SimpleGrid,
  Text,
	Heading
} from '@chakra-ui/react';
import data_overview from './data_overview.json';
import CardOverview from './CardOverview.jsx';
import NavBar from '../NavBar/NavBar.jsx';
import Footer from "../Home/Chakra UI Components/Footer";
import { color } from '../globalStyles'; 

export default function Overview () {
  return (
  	<>
  		<NavBar />
  		<Heading
	      fontWeight={600}
	      pt={10}
	      pb={10}
	      textAlign='center'
	      color='white'
	      fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
	      lineHeight={'50%'}
	    >
	      <Text as={'span'} color={color.kinemaLogoColor1}>Kinema</Text> was developed with:
	    </Heading>
	    <Flex
	      
	      direction={'column'}
	      width={'full'}
				bgGradient="linear(to-b, #222222, #333333)"
			>
	      <SimpleGrid
	        columns={{ base: 1, xl: 2 }}
	        spacing={'20'}
	        mt={10}
	        mb={10}
	        mx={'auto'}
	        >
	        {data_overview.map((data, index) => (
	          <CardOverview 
	          	key={`${index}-${data.name}`}
	          	name={data.name}
	          	role={data.role}
	          	content={data.content}
	          	avatar={data.avatar} />
	        ))}
	      </SimpleGrid>
	    </Flex>
	    <Footer />
		</>
  );
}
