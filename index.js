const url = require('url')
const app = require('express')()
const base = process.env.ARTSY_URL || 'https://www.artsy.net'
const port = process.env.PORT || 3000

app.get('*', (req, res) => {
  res.setHeader('Strict-Transport-Security', 'max-age=0')
  res.redirect(301, url.resolve(base, req.url))
})

app.listen(port, () => console.log(`Listening on ${port}`))
