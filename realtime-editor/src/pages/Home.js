import React from  'react'

const Home = () => {
  return (
    <div className ="homePagewrapper">
     <div className="formwrapper">

      <img src="/code-sync.png" alt='code-sync' height = "300px" width ="300px"/>

      <h4 className='mainLabel'>Paste invitation roomId</h4>
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
          If you dont have an Invite create 
          <a href= "" className="createNewBtn">New Room</a>
        </span>

      </div>
     </div>
     <footer>
      <h4> Built with 
        <a href="https://github.com/shubhangickore">Shubhangi kore</a>
      </h4>
     </footer>
    </div>
  )
}

export default Home;