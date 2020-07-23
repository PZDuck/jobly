import React, { useContext, useState, useEffect } from "react";

import LoggedInContext from "./LoggedInContext";
import { useParams } from "react-router-dom";
import Api from "./JoblyApi";
import JoblyApi from "./JoblyApi";

function Job() {
  const { user, setUser } = useContext(LoggedInContext);

  const { id } = useParams();
  const [job, setJob] = useState({});

  useEffect(() => {
    async function getJob() {
      const company = await Api.getJob(id);
      setJob(company);
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
          <p>{job.company_handle}</p>
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
