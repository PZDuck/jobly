import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoggedInContext from "./LoggedInContext";
import { useParams } from "react-router-dom";
import Api from "../JoblyApi";

function Job() {
  const { user, setUser } = useContext(LoggedInContext);

  const { id } = useParams();
  const [job, setJob] = useState({});

  useEffect(() => {
    async function getJob() {
      const job = await Api.getJob(id);
      setJob(job);
    }
    getJob();
  }, [id]);

  const handleClick = async (e) => {
    console.log(e.target);
    await Api.apply(user.username, job.id, e.target.dataset.action);

    // Update user information to force re-render
    const u = await Api.getUser(user.username);
    setUser(u);
  };

  return (
    <div className="Job">
      {user ? (
        <>
          <h2>{job.title}</h2>
          <p>
            {/* To accomodate for the delay in db response for job.company */}
            {job.company ? (
              <Link to={`/companies/${job.company_handle}`}>
                {job.company.name}
              </Link>
            ) : null}
          </p>
          <span>{job.salary}</span>
          {user.jobs[id] && user.jobs[id].state === "revoked" ? (
            <p>You revoked your application</p>
          ) : (
            <>
              {" "}
              {job.id in user.jobs ? (
                <button onClick={handleClick} data-action="revoked">
                  Applied!
                </button>
              ) : (
                <button onClick={handleClick} data-action="applied">
                  Apply
                </button>
              )}
            </>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Job;
