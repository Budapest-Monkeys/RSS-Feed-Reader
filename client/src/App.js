import React, {useEffect, useState} from 'react';

function App() {
  const [backEndData, setBackEndData] = useState([{}])

  useEffect(() => {
    // A proxy was define in package.json so we dont need to put the full route. This will be changed in production
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackEndData(data)
      }
    )
  }, [])

  return (  
    <div>
      {(typeof backEndData.users === 'undefined') ? (
        <p>Loading...</p>
      ): (
        backEndData.users.map((user,i)=> (
          <p key={i}>{user}</p>
        ))
      )}
    </div>
  );
}

export default App;