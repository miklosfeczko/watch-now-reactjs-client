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
      const { searchTerm } = this.props.match.params
      const response = await fetch(`/search-fetching/${searchTerm}`)
      const item = await response.json()
      console.log(searchTerm)
      console.log(item)
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
    if (prevProps.match.params.searchTerm !== this.props.match.params.searchTerm) {
      this.fetchItems()
    } else return
  }

  render() {
    const { items, loading } = this.state
    const { searchTerm } = this.props.match.params
    console.log(items)
  
    const str = searchTerm.replace(/\s/g, "")
    console.log(str)

    if (items.length === 0 && loading && str !== '') {
      return (
         <Loading />
      ) 
    } else if (items.length === 0 && !loading) {
      return (
        <div>
          No matches.
        </div>
      )
    } else if (str === '') {
      return (
        <div>
          Enter a correct term.
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
