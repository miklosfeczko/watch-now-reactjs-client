import React from "react"
import {api} from "../api/api"
import Loading from "./Loading"

class ItemDetail extends React.Component {
  state = {
    item: [],
    loading: true,
    error: null,
    commentError: null
  }

  componentDidMount() {
    this.fetchItem()
  }

  fetchItem = async () => {
    const fetchItem = await fetch(
      `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${this.props.match.params.id}&maxResults=50&key=${api.key}`
    )
    const item = await fetchItem.json()
    if (!item.error) {
      this.setState({
        item: item.items,
        loading: false,
        error: null
      })
    } else if (item.error.code === 404){    
      this.setState({
        loading: false,
        error: item.error.code
      })
    } else if (item.error.code === 403) {
      this.setState({
        loading: false,
        commentError: item.error.code
      })
    }
  }

 
  render() {
  let videoBlock
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
    )
  } 

  const { loading, item, error, commentError } = this.state  
  return (
    <React.Fragment>
      {error ? error : videoBlock}
      { commentError ? commentError : null}
      {loading ? (
        <Loading />
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
                    <p style={{ fontSize: ".9rem" }}>
                      {
                        item.snippet.topLevelComment.snippet.textOriginal
                          .toString()
                          .split("https://")[0]
                      }
                    </p>
                  </div>
                  <div className="like">
                    <p>
                      <span role="img" aria-label="thumbs up">
                        👍🏻
                      </span>{" "}
                      {item.snippet.topLevelComment.snippet.likeCount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </React.Fragment>
  )
}
}

export default ItemDetail
