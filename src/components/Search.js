import React from "react"
import {Link} from "react-router-dom"
import youtube from "../api/youtube"
import Thumbnail from "./Thumbnail"
import { api } from "../api/api"


class Search extends React.Component {
  state = {
    items: [],
    loading: true
  }

  componentDidMount() {
    this.fetchItems()
  }

  fetchItems = async () => {
    this.setState({
      items: [],
      loading: true
    })
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
      this.setState({ 
        items: response.data.items, 
        loading: false
      })
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
    const { items, loading } = this.state
    const { searchTerm } = this.props.match.params
    console.log(items)

    if (items.length === 0 && loading) {
      return (
        <div>
          Loading...
        </div>
      )
    } else if (items.length === 0 && !loading) {
      return (
        <div>
          No matches bruv.
        </div>
      )
    }
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
