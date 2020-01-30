import React from "react";

const Thumbnail = ({thumbnailData, channelOrVideo}) => {
console.log(channelOrVideo)
  return thumbnailData && thumbnailData.title ? (
    <React.Fragment>
        <div className="movie__wrapper">
          <div className="image__wrapper">
            <img
              src={thumbnailData.thumbnails.medium.url}
              style={{
                borderRadius: channelOrVideo ? "15rem" : "0rem",
                width: channelOrVideo ? "40%" : "75%"
              }}
            />
          </div>
          <div className="movie__details">
            <article>
              <h1
                style={{
                  paddingTop: channelOrVideo ? "1rem" : "0rem"
                }}
              >
                {thumbnailData.title}
              </h1>
              <h2 className="channelName">{thumbnailData.channelTitle}</h2>
              <p>{thumbnailData.description}</p>
            </article>
          </div>
        </div>
    </React.Fragment>
  ) : null;
}

export default Thumbnail;