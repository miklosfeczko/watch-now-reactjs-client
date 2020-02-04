const express = require("express")
const router = express.Router()
const fetch = require("node-fetch")


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const response = await fetch(
      `${process.env.YOUTUBE_API_URL_COMMENT}&videoId=${id}`
    )

    const data = await response.json()

    res.json(data)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
