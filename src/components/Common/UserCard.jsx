const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, about, age, gender, skills } = user;
  return (
    <>
      <div className="card bg-base-100 mx-2 sm:w-96 shadow-2xl shadow-black">
        <figure>
          <img src={photoUrl} alt={firstName + lastName} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && <p>{"Age: " + age}</p>}
          {gender && <p>{" Gender: " + gender}</p>}
          <p>{about}</p>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Skills: </legend>
            <div className="flex flex-wrap gap-2 mb-2">
              {skills.map((skill, idx) => (
                <span key={idx} className="badge flex items-center gap-1">
                  {skill}
                </span>
              ))}
            </div>
          </fieldset>
          <div className="card-actions justify-center mt-4">
            <button className="btn btn-success">Interested</button>
            <button className="btn btn-error">Ignore</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
