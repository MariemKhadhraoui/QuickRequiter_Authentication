import React from "react"
import TeamCard from "./TeamCard"
import "./team.css"
import "../about/about.css"

const Team = () => {
  return (
    <>
      <section className='team padding'>
        <div className='container grid'>
          <TeamCard />
        </div>
      </section>
    </>
  )
}

export default Team
