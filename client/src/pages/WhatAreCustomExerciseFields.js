import React from 'react'


const WhatAreCustomExerciseFields = () => (
      <>
        <h4>Custom Fields</h4>
        <p>Custom fields allow you to define what types of data you'd like me to track for a particular exercise. By default, I'll track any or all of the following:</p>

        <ul>
          <li>Number of reps in each set</li>
          <li>Weight</li>
          <li>Time to complete each set</li>
        </ul>
        
        <p>But there's no way for me to anticipate all the types of fields you might want to track, so I give you the option of defining the ones that are important to you.</p>

        <p>Let me give you a few examples.</p>

        <p>Maybe you're a thrower, and you want to keep track of the distances for your throws? No problem! Just define a field called "Distance" (or something similar--the name is completely up to you). Or maybe you're a powerlifter, and you prefer to autoregulate your intensity using RPE? Easy! A field with a name like "RPE" is what you're after.</p>

        <p>These examples barely scratch the surface of what's possible. The only restriction is that your field must accept <strong>numeric</strong> data. If it's not a number, I don't know how to deal with it. If you have other kinds of data  you want to record (things a number can't easily represent, like whether your spotter decided he wanted to see how much of your bench press set he could curl 😡), a "Notes" field is provided for you on each set.</p>
      </>
    )


export default WhatAreCustomExerciseFields