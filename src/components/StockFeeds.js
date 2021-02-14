import React, { useState, useEffect} from "react";
import Feed from "./Feed";
import xml2js from 'xml2js';

const StockFeeds = (props) => {
    const [feeds, setFeeds] = useState([]);
    const fetchConfig = [{
        title: "/r/wallstreetbets",
        url: "http://localhost:3001/api/wallstreetbets/live/"
    },{
        title: "/r/investing",
        url: "http://localhost:3001/api/investing/live/"
    }];

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
    
    return <div>{
        feeds.map((feed, index) => {
            console.log(feed);
            
            return <Feed title={fetchConfig[index].title} data={feed.entry} key={fetchConfig[index].title} />;
        })
        }</div>;
};

export default StockFeeds;