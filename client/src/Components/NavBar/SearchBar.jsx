import React, { useState, useRef } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Box, Flex } from '@chakra-ui/layout';
import { useNavigate } from 'react-router-dom';
import style from "./SearchBar.module.css"
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
            width: 100px;
        `}
        @media (min-width: 768px){    
          display: none
      }
    `;

    const InputSearch = styled.input`
    position: absolute;
    
    width: 120%;
    height: 100%;
    line-height: 30px;
    outline: 0;
    border: 1px solid gray;
    border-radius: 12px;
    color: white;
    padding: 0 10px;
    margin-right: 50px;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: transparent;
    
    display: ${(props) => (props.showSearchInput ? "block" : "none")}
`;

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [search2, setSearch2] = useState('');
  const navigate = useNavigate();
 
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/home/search/?query=${search}`);
  };

  const handleSearch2 = (e) => {
    e.preventDefault();
    navigate(`/home/search/?query=${search2}`);
  };

  const targetRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const showSearchInput = isHovered || isFocused;

  return (
    <Box>
      <form onSubmit={handleSearch} className={style.searchbar} >
        <Flex >
          <InputGroup>
            <InputLeftElement
              children={<SearchIcon/>}
              color={"white"}
              cursor={"pointer"}
              onClick={handleSearch}
            />
            <Input
              type="text"
              placeholder="Search..."
              _placeholder={{ color: 'white' }}
              color={"white"}
              bg={"transparent"}
              onChange={(e) => setSearch(e.target.value)}
              mr={4}
              h={9}
              _focus={{backgroundColor:"rgba(195, 194, 195, 0.7)"}}
            />
          </InputGroup>
        </Flex>
      </form>
      <form onSubmit={handleSearch2}>
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
                    onChange={(e) => setSearch2(e.target.value)}
                    showSearchInput = {showSearchInput}
                    />
                {showSearchInput ? null : <IconSearch/>}
                
          </Container>
      </form>
    </Box>
  );
};

export default SearchBar;
