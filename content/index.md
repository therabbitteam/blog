---
title: Trang Chủ
url: /
description: Index Page
layout: index.html
permalink: false
prismic:
  post:
    query: '[[:d = at(document.type, "posts")]]'
    orderings: '[my.posts.date]'
    allPages: true
  author:
    query: '[[:d = at(document.type, "author")]]'
function: home
---
