import React, { useRef, useEffect, useState } from "react";
import axios from "axios";

const BOS_YORUM = { display_name: "", body: "" };

const YaziDetayi = (props) => {
  const { id } = props.match.params;
  const [yaziDetayi, setYaziDetayi] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setnewComment] = useState(BOS_YORUM);

  const handleCommentSubmit = (yorum) => {
    axios
      .post(
        `https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`,
        yorum
      )
      .then((response) => {
        console.log(response);
        setComments([...comments, response.data]);
        setnewComment(BOS_YORUM);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setnewComment({ ...newComment, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios
      .all([
        axios.get(`https://react-yazi-yorum.herokuapp.com/posts/${id}`),
        axios.get(
          `https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`
        ),
      ])
      .then((responses) => {
        setYaziDetayi(responses[0].data);
        setComments(responses[1].data);
      })
      .catch(err=>console.log(err));
  }, []);

  return (
    <React.Fragment>
      <h2 className="ui header">{yaziDetayi.title}</h2>
      <p>{yaziDetayi.created_at}</p>
      <p>{yaziDetayi.content}</p>
      <hr />
      <h3>Yorumlar</h3>
      {comments.map((comment) => {
        return (
          <div key={comment.id} className="ui celled list">
            <div className="item">
              <img
                className="ui avatar image"
                src="/images/avatar/small/helen.jpg"
              />
              <div className="content">
                <div className="header">{comment.display_name}</div>
                {comment.body}
              </div>
            </div>
          </div>
        );
      })}
      <h4>Yorum Ekle</h4>
      <form
        className="ui form"
        onSubmit={(e) => {
          e.preventDefault();
          handleCommentSubmit(newComment);
        }}
      >
        <div className="ui mini input">
          <input
            type="text"
            name="display_name"
            placeholder="Adınız:"
            onChange={handleChange}
            value={newComment.display_name}
          />
        </div>
        <textarea
          name="body"
          onChange={handleChange}
          rows="2"
          value={newComment.body}
          placeholder="Yorumunuz"
        ></textarea>
        <button className="ui blue button" type="submit">
          Gönder
        </button>
      </form>
    </React.Fragment>
  );
};

export default YaziDetayi;
