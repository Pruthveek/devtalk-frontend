const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, about, age, gender } = user;
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-2xl shadow-black">
        <figure>
          <img src={photoUrl} alt={firstName + lastName} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{"Age: " + age + "Gender: " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
