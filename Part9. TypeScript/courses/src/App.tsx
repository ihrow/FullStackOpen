interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseNormalPartBase extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseNormalPartBase {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseNormalPartBase {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseNormalPartBase {
  type: "special";
  requirements: string[];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const Part = (props: { part: CoursePart }) => {
  switch (props.part.type) {
    case "normal":
      return (
        <div>
          <p>
            <b>{props.part.name}</b> {props.part.exerciseCount}
          </p>
          <p>{props.part.description}</p>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <p>
            <b>{props.part.name}</b> {props.part.exerciseCount}
          </p>
          <p>project exercises {props.part.groupProjectCount}</p>
        </div>
      );
    case "submission":
      return (
        <div>
          <p>
            <b>{props.part.name}</b> {props.part.exerciseCount}
          </p>
          <p>{props.part.description}</p>
          <p>submit to {props.part.exerciseSubmissionLink}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <p>
            <b>{props.part.name}</b> {props.part.exerciseCount}
          </p>
          <p>{props.part.description}</p>
          <p>required skills: {props.part.requirements.join(", ")}</p>
        </div>
      );
    default:
      return (
        <div />
      )
  }
};

const Header = (props: { name: string }) => {
  return <h1>{props.name}</h1>;
};

const Content = (props: { parts: CoursePart[] }) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};


const Total = (props: { exerciseCount: number }) => {
  return <p>Number of exercises {props.exerciseCount}</p>;
};




const App = () => {
  const courseName = "Half Stack application development";
  // new types


// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the easy course part",
    type: "normal"
  },
  {
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the hard course part",
    type: "normal"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    type: "groupProject"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    type: "submission"
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    type: "special"
  }
]

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total exerciseCount={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
    </div>
  );
};

export default App;