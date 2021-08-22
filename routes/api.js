/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

var expect = require('chai').expect;
const shortid = require('shortid');

let books = [];

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]

      return res.json(books.map(book => ({
        _id: book._id,
        title: book.title,
        commentscount: book.comments.length
      })))
    })
    
    .post(function (req, res){
      const { title } = req.body;

      if(!title) {
        return res.send('No title provided');
      }

      const newBook = {
        _id: shortid.generate(),
        title,
        comments: []
      }

      books.push(newBook);

      return res.json(newBook);
      //response will contain new book object including atleast _id and title
    })
    
    .delete(function(req, res){
      books = [];

      return res.json({
        success: 'Delete successfully'
      });
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      var { id } = req.params;

      const book = books.find(book => book._id === id)
      
      if(!book) {
        return res.send('Book not found!')
      }
      return res.json(book);
    })
    
    .post(function(req, res){
      var { id } = req.params.id;
      var { comment } = req.body;

      books = books.map(book => {
        if(book._id === id) {
          book.comments.push(comment);
        }

        return book;
      });
      
      return res.json(books.find(book => book._id === id));
    })
    
    .delete(function(req, res){
      var { id } = req.params;

      books = books.filter(book => book._id !== id);
      
      return res.send(`Book with id: ${id} was deleted successfully!!`)
    });
  
};
