import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LoggedInContext } from "./LoggedInContext";
import { useParams } from "react-router-dom";
import Api from "../JoblyApi";
import "../styles/Job.css";

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
          <span>Expected salary: {job.salary}</span>
          {user.jobs[id] && user.jobs[id].state === "revoked" ? (
            <p className="revoked">You revoked your application</p>
          ) : (
            <>
              {job.id in user.jobs ? (
                <>
                  <p className="applied">You applied for this position!</p>
                  <button
                    onClick={handleClick}
                    data-action="revoked"
                    className="btn-revoke"
                  >
                    Revoke
                  </button>
                </>
              ) : (
                <button
                  onClick={handleClick}
                  data-action="applied"
                  className="btn-apply"
                >
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
