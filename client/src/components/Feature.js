import React from "react";
import moment from "moment";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import Wrapper from "../assets/wrappers/Feature";
import FeatureInfo from "./FeatureInfo";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const Feature = ({
  _id,  
  featureName,
  featureDescription,
  featureCategory,
  featureStatus,  
  createdAt,
}) => {
 
  const { setEditFeature, deleteFeature } = useAppContext();
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className='project-main-icon'>
          {featureName && featureName.charAt(0)}
        </div>

        <div>
          <h5>{featureName}</h5>
          <div className='FeatureInfo'>
            <FeatureInfo icon={<FaCalendarAlt />} text={date} />
          </div>
        </div>
      </header>

      <div className='content'>
        <div>
          <FeatureInfo icon={<FaBriefcase />} text={featureDescription} />
        </div>
        <div className='content-center'>
          <FeatureInfo icon={<FaBriefcase />} text={featureCategory} />
          <FeatureInfo icon={<FaLocationArrow />} text={featureStatus} />
        </div>

        <footer>
          <div className='actions'>
            <Link
              to='/add-feature'
              className='btn edit-btn'
              onClick={() => setEditFeature(_id)}
            >
              Edit
            </Link>
            <button
              className='btn delete-btn'
              onClick={() => deleteFeature(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Feature;
