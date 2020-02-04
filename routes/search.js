const express = require("express")
const router = express.Router()
const fetch = require("node-fetch")


router.get("/:search", async (req, res) => {
  try {
    const { search } = req.params
   
    const response = await fetch(
      `${process.env.YOUTUBE_API_URL_SEARCH}&q=${search}`
    )

    const data = await response.json()

    res.json(data)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
