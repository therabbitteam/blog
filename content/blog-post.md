---
layout: blog-post.html
collection: blog
prismic:
  post:
    query: '[[:d = at(document.type, "posts")]]'
    collection:
      fileExtension: html
  author:
    query: '[[:d = at(document.type, "author")]]'
---

This will file contain blog post layout
