import React from "react"
import {Link} from "react-router-dom"
import youtube from "../api/youtube"
import Thumbnail from "./Thumbnail"
import { api } from "../api/api"


class Search extends React.Component {
  state = {
    items: []
  }

  componentDidMount() {
    this.fetchItems()
  }

  fetchItems = async () => {
    try {
      const response = await youtube.get("search", {
        params: {
          part: "snippet",
          maxResults: 10,
          key: `${api.key}`,
          q: `${this.props.match.params.searchTerm}`
        }
      })
      console.log(response)
      this.setState({ items: response.data.items })
    } catch (error) {
      if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log("Error", error.message)
      }
      console.log(error)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.searchTerm !== this.props.match.params.searchTerm) {
      this.fetchItems()
    } else return
  }

  render() {
    const { items } = this.state
    const { searchTerm } = this.props.match.params

    return (
      <div>
        {items.map(item => (
          <div key={item.etag} className="firstItemBorders">
            <Link
              to={`/search/${searchTerm}/${item.id.videoId}`}
              className="linkCustom"
            >
              <Thumbnail
                thumbnailData={item.snippet}
                channelOrVideo={item.id.channelId ? item.id.channelId : null}
              />
            </Link>
          </div>
        ))}
      </div>
    )
  }
}

export default Search
