import React from "react";
import moment from "moment";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import Wrapper from "../assets/wrappers/Project";
import ProjectInfo from "./ProjectInfo";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const Project = ({
  _id,
  name,
  description,
  projectCategory,
  projectStatus,
  createdAt,
}) => {
  const { setEditProject, deleteProject } = useAppContext();
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className='project-main-icon'>{name.charAt(0)}</div>

        <div>
          <h5>{name}</h5>
          <div className='ProjectInfo'>
            <ProjectInfo icon={<FaCalendarAlt />} text={date} />
          </div>
        </div>
      </header>

      <div className='content'>
        <div>
          <ProjectInfo icon={<FaBriefcase />} text={description} />
        </div>
        <div className='content-center'>
          <ProjectInfo icon={<FaBriefcase />} text={projectCategory} />
          <ProjectInfo icon={<FaLocationArrow />} text={projectStatus} />
        </div>

        <footer>
          <div className='actions'>
            <Link
              to='/add-project'
              className='btn edit-btn'
              onClick={() => setEditProject(_id)}
            >
              Edit
            </Link>
            <button
              className='btn delete-btn'
              onClick={() => deleteProject(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Project;
