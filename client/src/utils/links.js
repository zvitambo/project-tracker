import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
  { id: 1, text: "stats", path: "/", icon: <IoBarChartSharp /> },
  { id: 2, text: "all projects", path: "all-projects", icon: <MdQueryStats /> },
  { id: 3, text: "add project", path: "add-project", icon: <FaWpforms /> },
  { id: 4, text: "all features", path: "all-features", icon: <MdQueryStats /> },
  { id: 5, text: "all jobs", path: "all-jobs", icon: <MdQueryStats /> },
  { id: 6, text: "add job", path: "add-job", icon: <FaWpforms /> },
  { id: 7, text: "profile", path: "/profile", icon: <ImProfile /> },
];

export default links;
