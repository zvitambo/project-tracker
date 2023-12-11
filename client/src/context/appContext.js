/* eslint-disable no-unused-vars */
import React, { useReducer, useContext } from "react";
import { redirect } from "react-router-dom";
import axios from "axios";
import reducer from "./reducer";
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,

  //USERS
  GET_USERS_BEGIN,
  GET_USERS_SUCCESS,
  //PROJECTS
  CREATE_PROJECT_BEGIN,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_ERROR,
  GET_PROJECTS_BEGIN,
  GET_PROJECTS_SUCCESS,
  SET_EDIT_PROJECT,
  DELETE_PROJECT_BEGIN,
  EDIT_PROJECT_BEGIN,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_ERROR,
  SET_IS_PROJECT,
  SET_GET_PROJECTS,
  SHOW_PROJECT_STATS_BEGIN,
  SHOW_PROJECT_STATS_SUCCESS,
  //FEATURES
  SET_IS_FEATURE,
  CREATE_FEATURE_BEGIN,
  CREATE_FEATURE_SUCCESS,
  CREATE_FEATURE_ERROR,
  GET_FEATURES_BEGIN,
  GET_FEATURES_SUCCESS,
  SET_EDIT_FEATURE,
  DELETE_FEATURE_BEGIN,
  EDIT_FEATURE_BEGIN,
  EDIT_FEATURE_SUCCESS,
  EDIT_FEATURE_ERROR,
  SHOW_FEATURE_STATS_BEGIN,
  SHOW_FEATURE_STATS_SUCCESS,
  //CREDIT_TRANSACTIONS
  CREATE_CREDIT_TRANSACTION_BEGIN,
  CREATE_CREDIT_TRANSACTION_SUCCESS,
  CREATE_CREDIT_TRANSACTION_ERROR,

  //DEBIT_TRANSACTIONS
  CREATE_DEBIT_TRANSACTION_BEGIN,
  CREATE_DEBIT_TRANSACTION_SUCCESS,
  CREATE_DEBIT_TRANSACTION_ERROR,
  SET_EDIT_DEBIT_TRANSACTION,

  // PROJECT OPERATING COSTS
  GET_PROJECT_OPERATING_COSTS_BEGIN,
  GET_PROJECT_OPERATING_COSTS_SUCCESS,

  //IMAGES
  UPLOAD_IMAGE_ERROR,
  CREATE_IMAGE_BEGIN,
  CREATE_IMAGE_SUCCESS,
  CREATE_IMAGE_ERROR,
  GET_IMAGES_BEGIN,
  GET_IMAGES_SUCCESS,
  SET_IMAGE_UPLOAD,
} from "./actions";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const userLocation = localStorage.getItem("location");

export const initialState = {
  isLoading: false,
  showAlert: true,
  alertText: "",
  alertType: "",
  user: JSON.parse(user) || null,
  token: token || null,
  userLocation: userLocation || "",
  showSidebar: false,
  isEditing: false,
  isEditingFeature: false,
  editJobId: "",
  position: "",
  company: "",
  jobTypeOptions: ["fulltime", "part-time", "remote", "internship"],
  jobType: "fulltime",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  jobLocation: userLocation || "",
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: "",
  searchByCompany: "",
  searchStatus: "all",
  searchType: "all",
  sort: "lastest",
  sortOptions: ["lastest", "oldest", "a-z", "z-a"],

  //users
  users: [],
  totalUsers: 0,
  //Projects
  editProjectId: "",
  editProjectUUID: "",
  name: "",
  description: "",
  projectCategoryOptions: [
    "Family Home Renovations/Revamping",
    "Family Function/Event",
    "Legal Process",
  ],
  projectCategory: "Family Home Renovations/Revamping",
  projectStatusOptions: ["In Progress", "Finished", "On Hold"],
  projectStatus: "In Progress",
  projects: [],
  totalProjects: 0,
  isProject: true,
  searchByProject: "",
  projectRunningBalance: "0.00",
  featureExpenditureBalance: "0.00",
  projectStats: {},
  monthlyProjects: [],
  //Features
  editFeatureId: "",
  editFeatureUUID: "",
  searchByFeature: "",
  featureName: "",
  featureDescription: "",
  featureCategoryOptions: ["New Feature", "Repairs", "Todo/task"],
  featureCategory: "New Feature",
  featureStatusOptions: ["In Progress", "Finished", "On Hold"],
  featureStatus: "In Progress",
  features: [],
  totalFeatures: 0,
  totalExpenditure: "0.00",
  featureStats: {},
  monthlyFeatures: [],
  //credit_transactions
  creditTransactionAmount: 0,
  transactionStatusOptions: ["Complete", "Incomplete", "Reversed"],
  creditTransactionTypeOptions: ["Investment", "Contribution"],
  creditTransactionStatus: "Complete",
  creditTransactionType: "Investment",
  creditTransactionOwnerId: "",
  //debit_transactions
  debitTransactionAmount: 0,
  debitTransactionUUID: "",
  debitTransactionStatus: "Complete",
  debitTransactionDescription: "",

  operatingBalance: "$0.00",
  funding: "$0.00",
  expenditure: "$0.00",

  formData: new FormData(),
  //Images
  imageName: "",
  imageDescription: "",
  imageStatusOptions: [
    "Receipt",
    "Before the Job",
    "During the job/work",
    "After the Job",
    "Personal Gallery Picture",
  ],
  imageStatus: "Receipt",
  imageOwner: "",
  imageUrl: "",
  images: [],
  uploadAttachment: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;

  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);
      const { user, token, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, location },
      });

      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      //console.log(error);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/login", currentUser);
      const { user, location, token } = response.data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, location, token },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      const { user, location, token } = data;
      console.log(data);
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.post("/jobs", {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status !== 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const createProject = async () => {
    dispatch({ type: CREATE_PROJECT_BEGIN });
    try {
      const {
        name,
        description,
        projectCategory,
        projectStatus,
        uploadAttachment,
      } = state;
      const {
        data: {
          project: { uuid },
        },
      } = await authFetch.post("/projects", {
        name,
        description,
        projectCategory,
        projectStatus,
      });

      if (uploadAttachment) {
        createImage(uuid);
        dispatch({ type: CREATE_PROJECT_SUCCESS });
      } else {
        dispatch({ type: CREATE_PROJECT_SUCCESS });
        dispatch({ type: CLEAR_VALUES });
      }
    } catch (error) {
      if (error.response.status !== 401) return;
      dispatch({
        type: CREATE_PROJECT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const createFeature = async () => {
    dispatch({ type: CREATE_FEATURE_BEGIN });
    try {
      const {
        editProjectId,
        featureName,
        featureDescription,
        featureCategory,
        featureStatus,
        uploadAttachment,
      } = state;
      const {
        data: {
          feature: { uuid },
        },
      } = await authFetch.post("projects/features", {
        featureName,
        featureDescription,
        featureCategory,
        featureStatus,
        projectId: editProjectId,
      });

      if (uploadAttachment) {
        createImage(uuid);
      }

      dispatch({ type: CREATE_FEATURE_SUCCESS });
      //dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status !== 401) return;
      dispatch({
        type: CREATE_FEATURE_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    dispatch({ type: CLEAR_VALUES });
    clearAlert();
  };

  const createCreditTransaction = async () => {
    dispatch({ type: CREATE_CREDIT_TRANSACTION_BEGIN });
    try {
      const {
        editProjectId,
        creditTransactionAmount,
        creditTransactionStatus,
        creditTransactionType,
        creditTransactionOwnerId,
      } = state;
      await authFetch.post("accounts/credit/", {
        amount: creditTransactionAmount,
        status: creditTransactionStatus,
        transaction_type: creditTransactionType,
        account_holder: creditTransactionOwnerId,
        projectId: editProjectId,
      });
      dispatch({ type: CREATE_CREDIT_TRANSACTION_SUCCESS });
      getProjectOperatingCosts(editProjectId);
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status !== 401) return;
      dispatch({
        type: CREATE_CREDIT_TRANSACTION_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const createDebitTransaction = async () => {
    dispatch({ type: CREATE_DEBIT_TRANSACTION_BEGIN });
    try {
      const {
        editFeatureId,
        debitTransactionAmount,
        debitTransactionStatus,
        debitTransactionDescription,
        uploadAttachment,
        editProjectId,
      } = state;
      const {
        data: {
          transaction: { uuid },
        },
      } = await authFetch.post("accounts/debit/", {
        amount: debitTransactionAmount,
        status: debitTransactionStatus,
        description: debitTransactionDescription,
        featureId: editFeatureId,
      });

      // dispatch({
      //     type: SET_EDIT_DEBIT_TRANSACTION,
      //     payload: {  uuid },
      //   });

      //     dispatch({ type: CREATE_DEBIT_TRANSACTION_SUCCESS });
      // dispatch({ type: CLEAR_VALUES });
      getProjectOperatingCosts(editProjectId);
      if (uploadAttachment) {
        createImage(uuid);
        dispatch({
          type: SET_EDIT_DEBIT_TRANSACTION,
          payload: { uuid },
        });
        dispatch({ type: CREATE_DEBIT_TRANSACTION_SUCCESS });
      } else {
        dispatch({ type: CREATE_DEBIT_TRANSACTION_SUCCESS });
        dispatch({ type: CLEAR_VALUES });
      }
    } catch (error) {
      if (error.response.status !== 401) return;
      dispatch({
        type: CREATE_DEBIT_TRANSACTION_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const uploadImage = async () => {
    try {
      const { formData } = state;
      const {
        data: {
          image: { name, src },
        },
      } = await authFetch.post(`images/save`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return { name, src };
    } catch (error) {
      if (error.response.status !== 401) return;
      dispatch({
        type: UPLOAD_IMAGE_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const createImage = async (uuid) => {
    dispatch({ type: CREATE_IMAGE_BEGIN });
    try {
      const { imageDescription, imageStatus, imageOwner } = state;
      const { name, src } = await uploadImage();
      await authFetch.post("images/", {
        name,
        description: imageDescription,
        status: imageStatus,
        uuid,
        url: src,
      });

      dispatch({ type: CREATE_IMAGE_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
      getImages();
    } catch (error) {
      if (error.response.status !== 401) return;
      dispatch({
        type: CREATE_IMAGE_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getJobs = async () => {
    const { search, searchByCompany, searchStatus, searchType, sort, page } =
      state;
    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;

    if (search) {
      url = url + `&search=${search}`;
    }
    if (searchByCompany) {
      url = url + `&searchByCompany=${searchByCompany}`;
    }

    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { jobs, totalJobs, numOfPages } = data;

      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      //logoutUser();
    }
    clearAlert();
  };

  const getProjects = async () => {
    const { search, searchStatus, searchByProject, searchType, sort, page } =
      state;

    let url = `/projects?page=${page}&projectStatus=${searchStatus}&projectCategory=${searchType}&sort=${sort}`;

    if (search) {
      url = url + `&description=${search}`;
    }
    if (searchByProject) {
      url = url + `&name=${searchByProject}`;
    }

    dispatch({ type: GET_PROJECTS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { projects, totalProjects, numOfPages } = data;

      dispatch({
        type: GET_PROJECTS_SUCCESS,
        payload: {
          projects,
          totalProjects,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const setGetProjects = () => {
    dispatch({ type: SET_GET_PROJECTS });
  };

  const getFeatures = async () => {
    const {
      search,
      searchStatus,
      searchByFeature,
      searchType,
      sort,
      page,
      editProjectId,
    } = state;

    let url = `/projects/features?page=${page}&featureStatus=${searchStatus}&featureCategory=${searchType}&sort=${sort}`;

    if (search) {
      url = url + `&featureDescription=${search}`;
    }
    if (searchByFeature) {
      url = url + `&featureName=${searchByFeature}`;
    }

    if (editProjectId) {
      url = url + `&projectId=${editProjectId}`;
    }

    dispatch({ type: GET_FEATURES_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { features, totalFeatures, numOfPages } = data;

      dispatch({
        type: GET_FEATURES_SUCCESS,
        payload: {
          features,
          totalFeatures,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getUsers = async () => {
    let url = `/auth/users/`;

    dispatch({ type: GET_USERS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { users, totalUsers, numOfPages } = data;

      dispatch({
        type: GET_USERS_SUCCESS,
        payload: {
          users,
          totalUsers,
          numOfPages,
        },
      });
    } catch (error) {
      //logoutUser();
    }
    clearAlert();
  };

  const getProjectOperatingCosts = async (projectId) => {
    //const { editProjectId } = state;
    let url = `/accounts/project/?projectId=${projectId}`;

    dispatch({ type: GET_PROJECT_OPERATING_COSTS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { operatingBalance, funding, expenditure } = data;

      dispatch({
        type: GET_PROJECT_OPERATING_COSTS_SUCCESS,
        payload: {
          operatingBalance,
          funding,
          expenditure,
        },
      });
    } catch (error) {
      //logoutUser();
    }
    clearAlert();
  };

  const getImages = async () => {
    const { editFeatureId, editProjectId } = state;
    let url = `/images?page=all`;

    if (editFeatureId) {
      url = url + `&featureId=${editFeatureId}`;
    }
    if (editProjectId) {
      url = url + `&projectId=${editProjectId}`;
    }

    dispatch({ type: GET_IMAGES_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { images } = data;

      dispatch({
        type: GET_IMAGES_SUCCESS,
        payload: {
          images,
        },
      });
    } catch (error) {
      //logoutUser();
    }
    clearAlert();
  };

  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };

  const setEditProject = (id) => {
    dispatch({ type: SET_EDIT_PROJECT, payload: { id } });
    getProjectOperatingCosts(id);
  };

  const setEditFeature = (id, project) => {
    dispatch({ type: CLEAR_VALUES });
    dispatch({ type: SET_EDIT_FEATURE, payload: { id } });
    getProjectOperatingCosts(project);
  };

  const setIsProject = () => {
    dispatch(dispatch({ type: SET_IS_PROJECT }));
  };

  const setIsFeature = (projectId) => {
    dispatch({ type: SET_IS_FEATURE, payload: { projectId } });
  };
  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });
    try {
      const { editJobId, position, company, status, jobLocation, jobType } =
        state;
      await authFetch.patch(`/jobs/${editJobId}`, {
        position,
        company,
        status,
        jobLocation,
        jobType,
      });
      dispatch({ type: EDIT_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({ type: EDIT_JOB_ERROR, payload: { msg: error.response.msg } });
    }
    clearAlert();
  };

  const editProject = async () => {
    dispatch({ type: EDIT_PROJECT_BEGIN });
    try {
      const {
        editProjectId,
        name,
        description,
        projectCategory,
        projectStatus,
        uploadAttachment,
      } = state;
      const {
        data: {
          updatedProject: { uuid },
        },
      } = await authFetch.patch(`/projects/${editProjectId}`, {
        name,
        description,
        projectCategory,
        projectStatus,
      });

      if (uploadAttachment) {
        createImage(uuid);
        dispatch({ type: EDIT_PROJECT_SUCCESS });
      } else {
        dispatch({ type: EDIT_PROJECT_SUCCESS });
        redirect("/all-projects");
        dispatch({ type: CLEAR_VALUES });
      }
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_PROJECT_ERROR,
        payload: { msg: error.response.msg },
      });
    }
    clearAlert();

    //dispatch({ type: CLEAR_VALUES });
  };

  const editFeature = async () => {
    dispatch({ type: EDIT_FEATURE_BEGIN });
    try {
      const {
        editFeatureId,
        featureName,
        featureDescription,
        featureCategory,
        featureStatus,
        uploadAttachment,
      } = state;
      const {
        data: {
          updatedFeature: { uuid },
        },
      } = await authFetch.patch(`/projects/features/${editFeatureId}`, {
        featureName,
        featureDescription,
        featureCategory,
        featureStatus,
      });

      if (uploadAttachment) {
        createImage(uuid);
        dispatch({ type: EDIT_FEATURE_SUCCESS });
      } else {
        dispatch({ type: EDIT_FEATURE_SUCCESS });
      }
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_FEATURE_ERROR,
        payload: { msg: error.response.msg },
      });
    }
    clearAlert();

    dispatch({ type: CLEAR_VALUES });
  };

  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/jobs/${jobId}`);
      getJobs();
    } catch (error) {
      logoutUser();
    }
  };

  const deleteProject = async (projectId) => {
    dispatch({ type: DELETE_PROJECT_BEGIN });
    try {
      await authFetch.delete(`/projects/${projectId}`);
      getProjects();
    } catch (error) {
       logoutUser();
    }
  };

  const deleteFeature = async (featureId) => {
    dispatch({ type: DELETE_FEATURE_BEGIN });
    try {
      await authFetch.delete(`/projects/features/${featureId}`);
      getFeatures();
    } catch (error) {
       logoutUser();
    }
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch("/jobs/stats");
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const showProjectStats = async () => {
    dispatch({ type: SHOW_PROJECT_STATS_BEGIN });
    try {
      const { data } = await authFetch("/projects/stats");
      dispatch({
        type: SHOW_PROJECT_STATS_SUCCESS,
        payload: {
          projectStats: data.defaultStats,
          monthlyProjects: data.monthlyProjects,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };
  const showProjectFeatureStats = async () => {
    dispatch({ type: SHOW_FEATURE_STATS_BEGIN });
    try {
      const { data } = await authFetch("/projects/features/stats");
      dispatch({
        type: SHOW_FEATURE_STATS_SUCCESS,
        payload: {
          featureStats: data.defaultStats,
          monthlyFeatures: data.monthlyFeatures,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  const setImageUpload = () => {
    dispatch({ type: SET_IMAGE_UPLOAD });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
        clearFilters,
        changePage,
        //Users
        getUsers,
        //Projects
        createProject,
        getProjects,
        setEditProject,
        deleteProject,
        editProject,
        setIsProject,
        setGetProjects,
        showProjectStats,
        //Feature
        setIsFeature,
        createFeature,
        getFeatures,
        setEditFeature,
        deleteFeature,
        editFeature,
        showProjectFeatureStats,
        //Credit Transactions
        createCreditTransaction,

        //Debit Transactions
        createDebitTransaction,
        createImage,
        getImages,
        setImageUpload,
        getProjectOperatingCosts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
