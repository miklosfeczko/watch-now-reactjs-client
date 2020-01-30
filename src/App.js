import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { About, Search, ItemDetail, SearchBar } from "./components"
import "./App.scss"


function App() {
  const [darkMode, setDarkMode] = useState(getInitialMode())
   useEffect(() => {
     localStorage.setItem("dark", JSON.stringify(darkMode))
   }, [darkMode])

  function getInitialMode() {
      const savedMode = JSON.parse(localStorage.getItem("dark"))
      return savedMode || false
  }

  return (
    <Router>
      <div className={darkMode ? "dark-mode" : "light-mode"}>
        <nav>
          <div>
            <h1>watch_now</h1>
          </div>
          <div className="toggle-container">
            <span style={{ color: darkMode ? "grey" : "yellow" }}>☀</span>
            <span className="toggle">
              <input
                checked={darkMode}
                onChange={() => setDarkMode(prevMode => !prevMode)}
                type="checkbox"
                className="checkbox"
                id="checkbox"
              />
              <label htmlFor="checkbox" />
            </span>
            <span style={{ color: darkMode ? "slateblue" : "#333" }}>☾</span>
          </div>
        </nav>
        <main>
          <SearchBar path="/search" exact component={SearchBar} />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/search/:searchTerm" exact component={Search} />
            <Route
              path="/search/:searchTerm/:id"
              exact
              component={ItemDetail}
            />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

const Home = () => (
  <div>
    Home Page
  </div>
)

const Footer = () => (
  <footer id="footer">
    <p>
      Made with <span role="img" aria-label="heart">❤️</span> by Miklos Feczko
    </p>
  </footer>
)

export default App
