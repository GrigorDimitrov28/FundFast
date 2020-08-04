// import './index.css';
import React from 'react'
import Navbar from '../../components/navigation'
import Footer from '../../components/footer'
import { HomeHeaderPhoto } from '../../components/img-under-nav'
import Featured from '../../components/featured'
import BlogPosts from '../../components/blog-posts'

function LazyHomePage() {
  return (
    <div className="container">
      <Navbar />
      <HomeHeaderPhoto btnText={'Add fundraiser'} href={'/create'} pText={'Add a fundraiser and make your change.'} />
      <Featured />
      <BlogPosts />
      <Footer />
    </div>
  );
}

export default LazyHomePage;