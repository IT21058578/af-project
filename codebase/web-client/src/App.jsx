import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer";
import Auth from "./pages/Auth/Auth";
import Blogs from "./pages/Blog/Blogs";
import BlogDetail from "./pages/Blog/BlogDetails";
import NewBlog from "./pages/Blog/NewBlog";
import TourHome from "./pages/Tours/tourHome";
import TourDetails from "./pages/Tours/tourDetail";
import AdminHome from "./pages/Admin/AdminHome";
import Author from "./pages/Blog/Author";
import UserOrder from "./pages/Tours/BookingHistory";
import AddTripPackage from "./components/Admin/addTour";
import EditTripPackage from "./components/Admin/editTour";
import AddLocationPage from "./components/Admin/addLocation";
import EditLocationPage from "./components/Admin/editLocation";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

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
					<Route exact path="/tour/details/:tripPackageId" element={<TourDetails />} />
					<Route exact path="/admin" element={<AdminHome />} />
					<Route exact path="/tour/edit/:tripPackageId" element={<EditTripPackage />} />
					<Route exact path="location/edit/:locationId" element={<EditLocationPage />} />
					<Route exact path="/blogdetail" element={<BlogDetail />} />
					<Route exact path="/author" element={<Author />} />
					<Route exact path="/addtrip" element={<AddTripPackage />} />
					<Route exact path="/userbooking" element={<UserOrder />} />
					<Route exact path="/addlocation" element={<AddLocationPage />} />
				</Routes>
			</div>
			{/* <Footer /> */}
		</BrowserRouter>
	);
}

export default App;
