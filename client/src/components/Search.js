import React from "react"
import {Link} from "react-router-dom"
import Thumbnail from "./Thumbnail"
import Loading from "./Loading"

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
      
      const { search } = this.props.match.params
      const response = await fetch(`/search/${search}`)
      const item = await response.json()
      
      if (response.ok && !item.error) {
        this.setState({
          items: item.items,
          loading: false
        })
      } else if (item.error) {
        alert(item.error.message)
      }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.search !== this.props.match.params.search) {
      this.fetchItems()
    } else return
  }

  render() {
    const { items, loading } = this.state
    const { search } = this.props.match.params

    if (items.length === 0 && loading) {
      return (
         <Loading />
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
              to={`/search/${search}/${item.id.videoId}`}
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
