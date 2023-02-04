const Header = (props) => {
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p>
          {props.part} {props.exercises}
        </p>
      </div>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
       {props.parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
      </div>
    )
  }
  
  const Total = (props) => {
    return (
      <div>
        <p>
          Number of exercises{' '}
          {props.parts.reduce((sum, part) => sum + part.exercises, 0)}
        </p>
      </div>
    )
  }
  
  const Course = (props) => {
    return (
      <div>
      {props.courses.map(course =>
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>)} 
      </div>
    )
  }

export default Course