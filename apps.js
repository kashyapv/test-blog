var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.static(__dirname + '/public'));

app.locals({
  title: 'Blog',
});

app.all('*', function(req, res, next){
  fs.readFile('posts.json', function(err, data){
    res.locals.posts = JSON.parse(data);
    next();
  });
});

app.get('/', function(req, res){
  res.render('index.ejs');
});

app.get('/post/:slug', function(req, res, next){
  res.locals.posts.forEach(function(entry){
    if (req.params.slug === entry.slug){
      res.render('post.ejs', { post: entry });
    }
  })
});

app.get('/newpost', function(req, res){
  res.render('newpost.ejs');
});

app.get('/api/posts', function(req, res){
  res.json(res.locals.posts);
});

app.get('/*', function(req, res){
    res.render('404.ejs');
});

app.listen(3000);
console.log('app is listening at localhost:3000');