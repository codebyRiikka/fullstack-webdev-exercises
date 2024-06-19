// Component to display header: course name
const Header = ({courseName}) => {
  return (
    <h2>{courseName}</h2>
  )
}

// Component to display a single course with its parts and total exercises
const Course = ({course}) => {
  return (
    <div>
      <Header courseName = {course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
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
      {parts.map(part => 
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

// Component to calculate and display all exercises
const Total = ({parts}) => {
  const allExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p><b>Total of {allExercises} exercises</b></p>
  )
}

// Main app component
const App = () => {
  // Definition to courses
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of component',
          exercises: 14,
          id: 3
        },
        {
          name: 'random',
          exercises: 23,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
        name: 'Routing',
        exercises: 3,
        id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course =>
        <Course key={course.id} course={course} />
      )}
    </div>
  )
}

export default App
