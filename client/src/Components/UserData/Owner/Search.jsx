import React, { useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import { Box} from '@chakra-ui/layout';
import { useRef } from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/react"

const IconSearch = styled(SearchIcon)`
    z-index: 10;
    width: 25px;
    height: 25px;
    color: white;
`

const Container = styled.div`
        position: relative;
        width: 50px;
        height: 40px;
        box-sizing: border-box;
        
        padding: 5px;
        transition: all .5s;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        ${({hover}) => hover && css`
            width: 300px;
        `}
        @media (max-width: 420px){ 
               
            ${({hover}) => hover && css`
            width: 80px;
        `}
      } 
    `;

    const InputSearch = styled.input`
    position: absolute;
    
    width: 120%;
    height: 100%;
    line-height: 30px;
    outline: 0;
    border: 1px solid white;
    border-radius: 12px;

    color: white;
    padding: 0 10px;
    margin-right: 50px;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: transparent;
    ::placeholder {
    color: rgb(208, 191, 191);
     }
    @media (max-width: 420px){
        margin-rigth: 0
    }
    
    display: ${(props) => (props.showSearchInput ? "block" : "none")}
`;




export default function SearchBarOwner({ searcher, search}){


  const targetRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const showSearchInput = isHovered || isFocused;

 

  return (
    <Box>
      <form >
      <Container
                onMouseEnter={()=> setIsHovered(true)}
                onMouseLeave={()=> setIsHovered(false)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                hover={showSearchInput}
                className={"searchbar2"}
                
                >
                <InputSearch
                    placeholder="Search..."
                    ref={targetRef}
                    value={search} 
                    onChange={searcher}
                    showSearchInput = {showSearchInput}
                    />
                {showSearchInput ? null : <IconSearch/>}
                
            </Container>
                    </form>
    </Box>
  );
};

