const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer= (sum, likes) => {
    return sum+likes
  }

  return blogs.map(n=>n.likes).reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  const reducer = (mostLikesBlog, blog)=>{
    if(mostLikesBlog.likes < blog.likes){
      mostLikesBlog = blog
    }

    return mostLikesBlog
  }

  return blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {

  const mostBlogsAuthor = {author: "", blogs: 0}

  const authorAndBlogs = blogs
    .reduce((newList, blog) => {
      newList[blog.author] = newList[blog.author] ? ( newList[blog.author] + 1 ) : 1
      return newList
    }, {})

  for (const [key, value] of Object.entries(authorAndBlogs)){
    
    if(value > mostBlogsAuthor.blogs){
      mostBlogsAuthor.author = key,
      mostBlogsAuthor.blogs = value
    }
  }  
  
  return mostBlogsAuthor

}

const mostLikes = (blogs) => {
  const mostLikeBlog = blogs.reduce((mostLikeBlog, blog)=>{
    if(mostLikeBlog.likes<blog.likes){
      mostLikeBlog = blog
    }
    return mostLikeBlog

  }, blogs[0])

  const likes = blogs.reduce((sum, blog)=>{
    if(blog.author === mostLikeBlog.author){
      sum += blog.likes
    }
    return sum
  },0)

  return {
    author: mostLikeBlog.author,
    likes: likes
  }

}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}