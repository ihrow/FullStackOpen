import React from 'react'

const FormPerson = (props) => {
  return (
    <div>
      <form onSubmit={props.addName}>
        <div className='blockNumber'>
          <input value={props.newName} onChange={props.handleNameChange} required/>
          <span className='placeholder'>Name</span>
        </div>
        <div className='blockNumber'>
          <input value={props.newNumber} onChange={props.handleNumberChange} required/>
          <span className='placeholder'>Number</span>
        </div>
        <div>
          <button className='button-56' type="submit">ADD</button>
        </div>
      </form>
    </div>
  );
};

export default FormPerson;
