// Component to display header: course name
const Header = ({courseName}) => {
  return (
    <h1>{courseName}</h1>
  )
}

// Component to display a single part's name and exercises count
const Part = ({name, exercises}) => {
  return (
    <p>
    {name} {exercises}
    </p>
  )
}

// Component to render the list of parts and their exercise counts
const Content = ({parts}) => {
  return (
    <div>
      <Part name={parts[0].name} exercises={parts[0].exercises} />
      <Part name={parts[1].name} exercises={parts[1].exercises} />
      <Part name={parts[2].name} exercises={parts[2].exercises} />
    </div>
  )
}

// Component to calculate and display all exercises
const Total = ({parts}) => {
  const allExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>Number of exercises {allExercises}</p>
  )
}

// Main app component
const App = () => {
  // Course definition
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of component',
        exercises: 14
      }
    ]
  }
  

  // Returns the structure of this application 
  /* Rendering the Header, Content and Total components and passes the parts
  arrays as a props */
  return (
    <div>
      <Header courseName = {course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
}

export default App
