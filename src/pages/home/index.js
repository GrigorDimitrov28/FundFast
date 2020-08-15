// import './index.css';
import React from 'react'
import { HomeHeaderPhoto } from '../../components/img-under-nav'
import Featured from '../../components/featured'
import { BlogPosts } from '../../components/blog-posts'
import Stats from '../../components/fundfast-stats'

function LazyHomePage() {
  return (
    <div className="container">
      <HomeHeaderPhoto btnText={'Sign Up'} href={'/register'} pText={"Join us now and make your change."} />
      <Featured />
      <Stats />
      <BlogPosts />
    </div>
  );
}

export default LazyHomePage;