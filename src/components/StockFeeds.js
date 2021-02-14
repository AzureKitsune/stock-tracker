import React, { useState, useEffect} from "react";
import Feed from "./Feed";
import StockSearchBar from "./StockSearchBar";
import xml2js from 'xml2js';

const StockFeeds = (props) => {
    const [feeds, setFeeds] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchConfig = [{
        title: "/r/wallstreetbets",
        url: "http://localhost:3001/api/wallstreetbets/live/"
    },{
        title: "/r/investing",
        url: "http://localhost:3001/api/investing/live/"
    }];

    function handleSearchQueryChange(value) {
        //Search handler passed into Feed
        setSearchQuery(value);
    }

    useEffect(() => {
        let fetches = fetchConfig.map(item => {
            return fetch(item.url)
            .then(res => res.text())
            .then(feedXml => {
                return xml2js.parseStringPromise(feedXml);
            });
        });

        Promise.all(fetches).then(parsedXml => {
            setFeeds(parsedXml.map(x => x.feed));
        });
    }, []);

    let feedObjectsToDisplay = feeds.map((feed, index) => {
        console.log(feed);
        
        return <Feed title={fetchConfig[index].title} data={feed.entry} key={fetchConfig[index].title} searchQuery={searchQuery} />;
    });
    
    return <div><StockSearchBar searchQueryHandler={handleSearchQueryChange} /> {feedObjectsToDisplay} </div>;
};

export default StockFeeds;