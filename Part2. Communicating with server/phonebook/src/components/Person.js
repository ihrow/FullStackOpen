import React from "react";
import servicePersons from "../services/persons";

const Person = ({ person, list, listModify, setErrorMessage }) => {
  return (
    <li className="person">
      {person.name} {person.number}{" "}
      <button
        onClick={() => {
          if (window.confirm("Do you really want to delete a contact?")) {
            const index = list.findIndex(personToFind => personToFind.name === person.name);
            servicePersons.deletePerson(person.id, person.name, setErrorMessage);
            list.splice(index, 1)
            listModify(list.map(allPersons => allPersons))
          }
        }}
      >
        Delete
      </button>
    </li>
  );
};

export default Person;
