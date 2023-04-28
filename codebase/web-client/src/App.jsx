import './App.css'
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer';
import Auth from './pages/Auth/auth';
import Blogs from './pages/Blogs/Blogs';
import NewBlog from './pages/NewBlog';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <div className="App">
        <Routes>
          {/* <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} /> */}
          {/* <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/blogs" />)} /> */}
          <Route exact path="/auth" element={<Auth />} />
          <Route exact path="/blogs" element={<Blogs />} />
          <Route exact path="/new" element={<NewBlog />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default App
