import React from "react";
import Styled from "styled-components";

const Card = Styled.div`
box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
border-radius: 3px;
background-color: white;
height: 500px;
width: 400px;
float: left;
margin: 30px 10px;
`;

const CardTitle = Styled.h3`
text-align: center;
background-color: #7180B9;
height: 30px;
`;

const CardContent = Styled.div`
overflow-y: scroll;
height: 450px;
padding: 0 30px;
`;

const Feed = ({title, data, searchQuery}) => {
    const filteredItems = data.filter(item => {
        return item.title.toString().toLowerCase().includes(searchQuery.toString().toLowerCase()); });

    let defaultOrHighlightBg = (searchQuery === "" ? "transparent" : "yellow");
    return (<Card>
                <CardTitle>{title}</CardTitle>
                <CardContent>{
                    filteredItems.map(item => {
                    return <div key={item.id[0]} style={{backgroundColor: defaultOrHighlightBg}}>
                                <a href={item.link[0].$.href} target="_blank" rel="noreferrer"><h4>{item.title}</h4></a>
                                <span>{item.updated} by <i>{item.author[0].name}</i></span>
                                <hr />
                        </div>})}
                </CardContent>
            </Card>);
};

export default Feed;