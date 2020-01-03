import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import api from "../../services/api";

import { Container, Post } from "./styles";

import more from "../../assets/more.svg";
import like from "../../assets/like.svg";
import comment from "../../assets/comment.svg";
import send from "../../assets/send.svg";

export default function Feed() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    async function loadFeed() {
      const response = await api.get("/posts");

      setFeed(response.data);
    }

    loadFeed();
  }, []);

  useEffect(() => {
    const socket = io(api.defaults.baseURL);

    socket.on("post", newPost => {
      setFeed([newPost, ...feed]);
    });

    socket.on("like", likedPost => {
      setFeed(
        feed.map(post => (post._id === likedPost._id ? likedPost : post))
      );
    });

    return () => {
      socket.off("post");
      socket.off("like");
    };
  }, [feed]);

  function handleLike(id) {
    api.post(`/posts/${id}/like`);
  }

  return (
    <Container>
      {feed.map(post => (
        <Post key={post._id}>
          <header>
            <div>
              <span>{post.author}</span>
              <span className="place">{post.place}</span>
            </div>

            <img src={more} alt="Mais" />
          </header>

          <img src={post.image.url} alt={post.description} />

          <footer>
            <div>
              <button type="button" onClick={() => handleLike(post._id)}>
                <img src={like} alt="Curtir" />
              </button>
              <img src={comment} alt="" />
              <img src={send} alt="" />
            </div>

            <strong>{`${post.likes} curtidas`}</strong>

            <p>
              {post.description}
              <span>{post.hashtags}</span>
            </p>
          </footer>
        </Post>
      ))}
    </Container>
  );
}
