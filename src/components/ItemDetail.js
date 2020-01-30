import React, { useState, useEffect } from "react";
import {api} from '../api/api'

// const URL = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${match.params.id}&maxResults=50`;

class ItemDetail extends React.Component {
  state = {
    item: [],
    loading: true
  }

  componentDidMount() {
    this.fetchItem();
  };

  fetchItem = async () => {
    const fetchItem = await fetch(
      `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${this.props.match.params.id}&maxResults=50&key=${api.key}`
    );
    const item = await fetchItem.json();
    this.setState({ 
      item: item.items,
      loading: false
     });
    console.log(item)
  };

 
  render() {

  let videoBlock;
  if (this.props.match.params.id !== "undefined") {
     videoBlock = (
       <div className="video-container">
         <iframe
           frameBorder="0"
           height="100%"
           width="100%"
           title="Video Player"
           src={`https://www.youtube.com/embed/${this.props.match.params.id}`}
         />
       </div>
     );
  } else videoBlock = (
    <div>
      ÜRES
    </div>
  )

  const {loading, item} = this.state;
  return (
    <React.Fragment>
      {videoBlock}
      {loading ? (
        <div>loading...</div>
      ) : (
        <div>
          {item &&
            item.map(item => (
              <div key={item.etag} className="module-comment-block">
                <div className="module-comment-avatar">
                  <img
                    src={
                      item.snippet.topLevelComment.snippet.authorProfileImageUrl
                    }
                    alt="profile avatar"
                    width="50"
                  />
                </div>

                <div className="module-comment-text">
                  <div className="userName">
                      <p>
                        {item.snippet.topLevelComment.snippet.authorDisplayName}
                      </p>
                  </div>
                  <div>
                    <time>
                      {
                        item.snippet.topLevelComment.snippet.publishedAt.split(
                          "T"
                        )[0]
                      }
                    </time>
                  </div>

                  <div className="comment">
                    <p style={{fontSize: '.9rem'}}>
                      {item.snippet.topLevelComment.snippet.textOriginal.toString().split("https://")[0]}
                    </p>
                  </div>
                  <div className="like">
                    <p>
                      👍🏻 {item.snippet.topLevelComment.snippet.likeCount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </React.Fragment>
  );
}
}

export default ItemDetail;
