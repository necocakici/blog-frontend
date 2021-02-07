import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const YaziListesi = () => {
  const [yaziListesi, setYaziListesi] = useState([]);

  useEffect(() => {
    axios
      .get("https://react-yazi-yorum.herokuapp.com/posts")
      .then((response) => {
        setYaziListesi(response.data);
      });
  }, []);

  return (
    <div className="ui relaxed divided list">
      {yaziListesi.map((yazi) => (
        <div key={yazi.id} className="item">
          <i className="large github middle aligned icon"></i>
          <div className="content">
            <Link to={`/posts/${yazi.id}`} className="header">
              {yazi.title}
            </Link>
            <div className="description">
              {yazi.created_at.substring(0, 10)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default YaziListesi;
