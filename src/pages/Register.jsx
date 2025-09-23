import React from 'react'

const Register = () => {
  return (
    <div className=" h-screen flex justify-center items-center">
      <div className="card bg-base-500 w-96 shadow-2xl shadow-black">
        <div className="card-body">
          <h2 className="card-title justify-center">Register</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              className="input"
              required
              onChange={(e) => {
                // setEmail(e.target.value);
              }}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              className="input"
              required
              onChange={(e) => {
                // setEmail(e.target.value);
              }}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email Id</legend>
            <input
              type="email"
              className="input"
              required
              onChange={(e) => {
                // setEmail(e.target.value);
              }}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              className="input"
              required
              onChange={(e) => {
                // setPassword(e.target.value);
              }}
            />
          </fieldset>
          <div className="card-actions justify-center">
            <button className="btn btn-primary">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register