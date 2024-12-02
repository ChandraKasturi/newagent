import React from 'react'
import HeroSection from "./components/Heros";
import Services from "./components/Services";
import Pricing from '@/components/Pricing'
import About from '@/components/About'
import Footer from '@/components/Footer'


const page = () => {
  return (
    <div>

<HeroSection />

<div id="pricing">
  <Pricing />
</div>
{/* <div id="services">
  <Services />
</div>  */}
<div id="about">
  <About />
</div>
<div id="footer">
<Footer />
</div>
    </div>
    

    
        
  )
}

export default page