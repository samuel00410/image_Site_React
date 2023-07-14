import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Picture from "../components/Picture";
import Loader from "../components/Loader";
import axios from "axios";

const Homepage = () => {
  const API_Key = process.env.REACT_APP_APIKEY;
  const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15"; // 精選的圖片url
  const [data, setData] = useState(null);
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const [currentSearch, setCurrentSearch] = useState(""); // 按下搜尋的時候儲存的搜尋字串(狀態)
  let searchURL = `https://api.pexels.com/v1/search?query=${input}?page=1&per_page=15`; // 搜尋的圖片url

  // 畫面一被render的時候就執行useEffect
  useEffect(() => {
    handleSearch(initialURL);
  }, []);

  const handleSearch = async (url) => {
    let result = await axios.get(url, {
      headers: {
        Authorization: API_Key,
      },
    });
    setData(result.data.photos);
    setCurrentSearch(input);
  };

  const morePicture = async () => {
    let newURL;
    setPage(page + 1);
    // 先分辨是哪一種圖片(精選or使用者輸入的)，設定URL
    if (currentSearch == "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page + 1}&per_page=15`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${
        page + 1
      }`;
    }

    let result = await axios.get(newURL, {
      headers: { Authorization: API_Key },
    });
    setData([...data, ...result.data.photos]);
  };

  return (
    <div>
      <Search
        setInput={setInput}
        handleSearch={() => {
          handleSearch(searchURL);
        }}
      />
      {/* <Loader /> */}
      <div className="pictures">
        {data &&
          data.map((d) => {
            return <Picture data={d} />;
          })}
      </div>
      <div className="morePicture">
        <button onClick={morePicture}>更多圖片</button>
      </div>
    </div>
  );
};

export default Homepage;
