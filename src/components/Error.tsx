import React from 'react'

function Error(props:{errorMsg:string}) {
  return (
    <div className="error">
        <h1>Error: {props.errorMsg}</h1>
    </div>
  )
}

export default Error