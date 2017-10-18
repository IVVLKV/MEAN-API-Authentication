let express = require('express')

let routes = (Book) => {
  let bookRouter = express.Router()
  bookRouter.route('/')
    .post((req, res) => {
      if (!req.body.title || !req.body.author) {
        res.status(400).send('Title and Author are required')
      } else {
        let book = new Book(req.body)
        book.save()
        res.status(201).send(book)
      }
    })
    .get((req, res) => {
      let query = {}
      if (req.query.genre) {
        query.genre = req.query.genre
      } else if (req.query.author) {
        query.author = req.query.author
      } else if (req.query.genre && req.query.author) {
        query.genre = req.query.genre
        query.author = req.query.author
      }
      Book.find(query, { '__v': 0 }, (err, books) => {
        if (err) {
          res.status(500).send(err)
        } else {
          let returnBooks = []
          books.forEach((element, index, array) => {
            let newBook = element.toJSON()
            newBook.links = {}
            newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id
            returnBooks.push(newBook)
          })
          res.json(returnBooks)
        }
      })
    })

  bookRouter.use('/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, { '__v': 0 }, (err, book) => {
      if (err) {
        res.status(500).send(err)
      } else if (book) {
        req.book = book
        next()
      } else {
        res.status(404).send('No book found')
      }
    })
  })

  bookRouter.route('/:bookId')
    .get((req, res) => {
      res.json(req.book)
    })
    .put((req, res) => {
      if (!req.body.title || !req.body.author) {
        res.status(400).send('Title and Author are required')
      } else {
        req.book.title = req.body.title
        req.book.author = req.body.author
        req.book.genre = req.body.genre
        req.book.save((err) => {
          if (err) {
            res.status(500).send(err)
          } else {
            res.json(req.book)
          }
        })
      }
    })
    .patch((req, res) => {
      if (req.body._id) {
        delete req.body._id
      }
      for (let key in req.body) {
        req.book[key] = req.body[key]
      }
      req.book.save((err) => {
        if (err) {
          res.status(500).send(err)
        } else {
          res.json(req.book)
        }
      })
    })
    .delete((req, res) => {
      req.book.remove((err) => {
        if (err) {
          res.status(500).send(err)
        } else {
          res.status(204).send('Removed')
        }
      })
    })

  return bookRouter
}

module.exports = routes
