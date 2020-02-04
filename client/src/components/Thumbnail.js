import React from "react"

const Thumbnail = ({thumbnailData, channelOrVideo}) => {
  return thumbnailData && thumbnailData.title ? (
    <React.Fragment>
        <div className="video__wrapper">
          <div className="image__wrapper">
            <img
              alt="video thumbnails"
              src={thumbnailData.thumbnails.medium.url}
              style={{
                borderRadius: channelOrVideo ? "15rem" : "0rem",
                width: channelOrVideo ? "40%" : "75%"
              }}
            />
          </div>
          <div className="video__details">
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
  ) : null
}

export default Thumbnail