// import './index.css';
import React from 'react'
import Navbar from '../../components/navigation'
import Footer from '../../components/footer'
import Photo from '../../components/img-under-nav'
import Featured from '../../components/featured'
import BlogPosts from '../../components/blog-posts'

function LazyHomePage() {
  return (
    <div className="container">
      <Navbar />
      <Photo />
      <Featured />
      <BlogPosts />
      <Footer />
    </div>
  );
}

export default LazyHomePage;