import React from  'react'

const Home = () => {
  return (
    <div className ="homePagewrapper">
     <div className="formwrapper">

      <img className ="homeLogo"src="/code-sync.png" alt='code-sync'/>

      <p className='mainLabel'>Paste invitation roomId</p>
      <div className= "inputGroup">
        <input type ="text" 
        className= "inputBox" 
        placeholder="Enter Room Id">
        </input>

         <input type ="text" 
        className= "inputBox" 
        placeholder="UserName">
        </input>

        <button className='btn joinBtn'> Join </button>
        <span className='createInfo'> 
          If you dont have an Invite create &nbsp;
          <a href= "" className="createNewBtn">New Room</a>
        </span>

      </div>
     </div>
     <footer>
      <h4> Built with &nbsp;
        <a href="https://github.com/shubhangickore" className ="goTo">Shubhangi kore</a>
      </h4>
     </footer>
    </div>
  )
}

export default Home;