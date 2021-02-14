import React, { useState, useEffect} from "react";
import Styled from "styled-components";

const SearchBar = Styled.input`
width: 80%;
height: 30px;
border: 2px solid #7180B9;
border-radius: 10px;
margin: 5px auto;
display: block;
`;

const StockSearchBar = (props) => {
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
    });

    return <SearchBar type="search" 
    placeholder="Search here: GameStop" 
    value={searchQuery} onChange={(e) => {
        setSearchQuery(e.target.value.trim());

        props.searchQueryHandler(e.target.value.trim());
    }} />
};

export default StockSearchBar;