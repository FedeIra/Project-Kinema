import { Image, WrapItem } from "@chakra-ui/react";


export default function Card({ posterUrl, id, title }) {
  return (
    <WrapItem >
        <Image
          w={{base: "110px", md: "180px", lg: "250px", xl:"280px", "2xl": "400px" }}
          borderRadius="10"
          opacity="1"
          objectFit="cover"
          src={posterUrl}
          alt=""
          transition="0.3s"
          _hover={{transform: 'scale(1.1)'}}  
        />
        
    </WrapItem>
  );
}
