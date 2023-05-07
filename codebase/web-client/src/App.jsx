import './App.css'
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer';
import Auth from './pages/Auth/auth';
import Blogs from './pages/Blog/Blogs';
import BlogDetails from './pages/Blog/BlogDetails';
import NewBlog from './pages/NewBlog';
import TourHome from './pages/Tours/tourHome';
import TourDetails from './pages/Tours/tourDetail';
import AdminHome from './pages/Admin/AdminHome';
import Author from './pages/Author';
import UserOrder from './pages/Tours/BookingHistory';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  
  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <div className="App">
        <Routes>
          {/* 
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} /> */}
          {/* <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/blogs" />)} /> */}
          <Route path="/" exact component={() => <Redirect to="/blog" />} />
          <Route exact path="/auth" element={<Auth />} />
          <Route exact path="/blog" element={<Blogs />} />
          <Route exact path="/new" element={<NewBlog />} />
          <Route exact path="/tour" element={<TourHome />} />
          <Route exact path="/details" element={<TourDetails />} />
          <Route exact path="/tour/details/:title" element={<TourDetails />} />
          <Route exact path="/admin" element={<AdminHome />} />
          <Route exact path="/blogdetail" element={<BlogDetails />} />
          <Route exact path="/author" element={<Author />} />                    
          <Route exact path="/userbooking" element={<UserOrder />} />


        </Routes>
      </div>
      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default App;
