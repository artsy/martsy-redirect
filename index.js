const url = require('url')
const app = require('express')()
const base = process.env.ARTSY_URL || 'https://www.artsy.net'
const port = process.env.PORT || 3000
const uaStr = process.env.EIGEN_UA_STRING || 'Artsy-Mobile'
const secure = Boolean(process.env.SECURE || true)
const proxy = require('http-proxy').createProxyServer()

app.use((req, res) => {
  if (req.get('User-Agent').match(uaStr)) {
    proxy.web(req, res, {
      target: base,
      headers: {
        host: url.parse(base).host,
        'X-Access-Token': req.get('X-Access-Token')
      },
      secure
    })
  } else {
    res.setHeader('Strict-Transport-Security', 'max-age=0')
    res.redirect(301, url.resolve(base, req.url))
  }
})

app.listen(port, () => console.log(`Listening on ${port}`))
