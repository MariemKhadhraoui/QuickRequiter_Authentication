import React from "react"
import Heading from "../../common/heading/Heading"
import "./Hero.css"

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div className='row'>
            <Heading subtitle='WELCOME TO QuickRecruiter' title='Best Handy Worker Application' />
            <p>Find your next job and get to work : The ultimate platform for skilled handy workers.</p>
           </div>
        </div>
      </section>
      <div className='margin'></div>
    </>
  )
}

export default Hero
