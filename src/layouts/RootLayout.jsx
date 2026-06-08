import {Outlet} from 'react-router-dom'
import Navbar from '../components/Navbar'
import StatsBar from '../components/StatsBar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'


function RootLayout() {
  return (
    <div className="root-layout">
      <ScrollToTop />
      <Navbar />
      <main><Outlet /></main>
      
      <Footer />
    </div>
  )
}

export default RootLayout