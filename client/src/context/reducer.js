import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
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
  GET_USERS_BEGIN,
  GET_USERS_SUCCESS,
  CREATE_PROJECT_BEGIN,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_ERROR,
  GET_PROJECTS_BEGIN,
  GET_PROJECTS_SUCCESS,
  SET_GET_PROJECTS,
  SET_EDIT_PROJECT,
  DELETE_PROJECT_BEGIN,
  EDIT_PROJECT_BEGIN,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_ERROR,
  SET_IS_PROJECT,
  SHOW_PROJECT_STATS_BEGIN,
  SHOW_PROJECT_STATS_SUCCESS,
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
  CREATE_CREDIT_TRANSACTION_BEGIN,
  CREATE_CREDIT_TRANSACTION_SUCCESS,
  CREATE_CREDIT_TRANSACTION_ERROR,
  CREATE_DEBIT_TRANSACTION_BEGIN,
  CREATE_DEBIT_TRANSACTION_SUCCESS,
  CREATE_DEBIT_TRANSACTION_ERROR,
  SET_EDIT_DEBIT_TRANSACTION,
  UPLOAD_IMAGE_ERROR,
  CREATE_IMAGE_BEGIN,
  CREATE_IMAGE_SUCCESS,
  CREATE_IMAGE_ERROR,
  GET_IMAGES_BEGIN,
  GET_IMAGES_SUCCESS,
  SET_IMAGE_UPLOAD,
  GET_PROJECT_OPERATING_COSTS_BEGIN,
  GET_PROJECT_OPERATING_COSTS_SUCCESS,
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: "danger",
        alertText: "Please provide all details!",
      };
    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertType: "",
        alertText: "",
      };
    case REGISTER_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        showAlert: true,
        alertType: "success",
        alertText: "User Created! Redirecting...",
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
      };
    case REGISTER_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case LOGIN_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        showAlert: true,
        alertType: "success",
        alertText: "Login Successful! Redirecting...",
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
    case LOGOUT_USER:
      return {
        ...initialState,
        user: null,
        token: null,
        userLocation: "",
        jobLocation: "",
      };
    case UPDATE_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        showAlert: true,
        alertType: "success",
        alertText: "User Profile Updated",
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case HANDLE_CHANGE:
      return {
        ...state,
        page: 1,
        [action.payload.name]: action.payload.value,
      };
    case CLEAR_VALUES:
      const newInitialState = {
        isEditing: false,
        isEditingFeature: false,
        editJobId: "",
        position: "",
        company: "",
        jobType: "full-time",
        status: "pending",
        jobLocation: state.userLocation,
        editProjectId: "",
        name: "",
        description: "",
        projectCategory: "Family Home Renovations/Revamping",
        projectStatus: "In Progress",
        isProject: true,
        featureProjectId: "",
        featureName: "",
        featureDescription: "",
        featureCategory: "New Feature",
        featureStatus: "In Progress",
        creditTransactionAmount: 0,
        creditTransactionStatus: "Complete",
        creditTransactionType: "Investment",
        creditTransactionOwnerId: "",
        //debit_transactions
        debitTransactionAmount: 0,
        debitTransactionStatus: "Complete",
        debitTransactionDescription: "",
        projectRunningBalance: "0.00",
        featureExpenditureBalance: "0.00",
        debitTransactionUUID: "",

        operatingBalance: "$0.00",
        funding: "$0.00",
        expenditure: "$0.00",
        transactionArr: [],
        positiveBalance: false,

        //Images
        formData: new FormData(),
        imageName: "",
        imageDescription: "",
        imageStatus: "Receipt",
        imageOwner: "",
        imageUrl: "",
        images: [],
        uploadAttachment: false,
      };
      return {
        ...state,
        ...newInitialState,
      };
    case CREATE_JOB_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_JOB_SUCCESS:
      return {
        ...state,
        showAlert: true,
        alertType: "success",
        alertText: "New Job Created!",
        isLoading: false,
      };
    case CREATE_JOB_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case GET_JOBS_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };
    case GET_JOBS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobs: action.payload.jobs,
        totalJobs: action.payload.totalJobs,
        numOfPages: action.payload.numOfPages,
      };
    case SET_EDIT_JOB:
      const job = state.jobs.find((job) => job._id === action.payload.id);
      const { _id, position, company, jobLocation, jobType, status } = job;
      return {
        ...state,
        isEditing: true,
        editJobId: _id,
        position,
        company,
        jobLocation,
        jobType,
        status,
      };
    case DELETE_JOB_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case EDIT_JOB_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case EDIT_JOB_SUCCESS:
      return {
        ...state,
        showAlert: true,
        alertType: "success",
        alertText: "Job Updated Successfully!",
        isLoading: false,
      };
    case EDIT_JOB_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case SHOW_STATS_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: true,
      };
    case SHOW_STATS_SUCCESS:
      return {
        ...state,
        stats: action.payload.stats,
        monthlyApplications: action.payload.monthlyApplications,
        isLoading: false,
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        search: "",
        searchByCompany: "",
        editProjectId: "",
        searchByProject: "",
        searchByFeature: "",
        searchStatus: "all",
        searchType: "all",
        sort: "lastest",
      };
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload.page,
      };
    //Users

    case GET_USERS_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload.users,
        totalUsers: action.payload.totalUsers,
        numOfPages: action.payload.numOfPages,
      };
    //Projects
    case CREATE_PROJECT_BEGIN:
      return {
        ...state,
        isLoading: true,
        isProject: true,
      };
    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        showAlert: true,
        alertType: "success",
        alertText: "New Project Created!",
        isLoading: false,
      };
    case CREATE_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case GET_PROJECTS_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };
    case SET_GET_PROJECTS:
      return {
        ...state,
        // isProject: true,
        // isEditing: false,
        // editProjectId: "",
      };
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projects: action.payload.projects,
        totalProjects: action.payload.totalProjects,
        numOfPages: action.payload.numOfPages,
      };
    case SET_EDIT_PROJECT:
      const project = state.projects.find(
        (project) => project._id === action.payload.id
      );
      const {
        _id: projectId,
        uuid: projectUUID,
        name,
        description,
        projectCategory,
        projectStatus,
      } = project;
      return {
        ...state,
        isEditing: true,
        isProject: true,
        editProjectId: projectId,
        editFeatureUUID: projectUUID,
        name,
        description,
        projectCategory,
        projectStatus,
        editFeatureId: "",
      };
    case DELETE_PROJECT_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case EDIT_PROJECT_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case EDIT_PROJECT_SUCCESS:
      return {
        ...state,
        showAlert: true,
        alertType: "success",
        alertText: "Project Updated Successfully!",
        isLoading: false,
      };
    case EDIT_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case SET_IS_PROJECT:
      return {
        ...state,
        isProject: true,
      };
    case SHOW_PROJECT_STATS_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: true,
      };
    case SHOW_PROJECT_STATS_SUCCESS:
      return {
        ...state,
        projectStats: action.payload.projectStats,
        monthlyProjects: action.payload.monthlyProjects,
        isLoading: false,
      };

    //Features
    case CREATE_FEATURE_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_FEATURE_SUCCESS:
      return {
        ...state,
        showAlert: true,
        alertType: "success",
        alertText: "New Feature/Task Created!",
        isLoading: false,
        // isProject: true,
        // isEditing: false,
        // editProjectId: "",
      };
    case CREATE_FEATURE_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case SET_IS_FEATURE:
      return {
        ...state,
        isProject: false,
        editProjectId: action.payload.projectId,
        isEditingFeature: false,
      };

    case GET_FEATURES_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };
    case GET_FEATURES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        features: action.payload.features,
        totalFeatures: action.payload.totalFeatures,
        numOfPages: action.payload.numOfPages,
      };
    case SET_EDIT_FEATURE:
      const feature = state.features.find(
        (feature) => feature._id === action.payload.id
      );
      const {
        _id: featureId,
        uuid: featureUUID,
        featureName,
        featureDescription,
        featureCategory,
        featureStatus,
        project: featureProject,
      } = feature;
      return {
        ...state,
        isEditingFeature: true,
        isProject: false,
        editFeatureId: featureId,
        editFeatureUUID: featureUUID,
        featureName,
        featureDescription,
        featureCategory,
        featureStatus,
        editProjectId: featureProject,
        // featureProject: featureProject,
      };
    case DELETE_FEATURE_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case EDIT_FEATURE_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case EDIT_FEATURE_SUCCESS:
      return {
        ...state,
        showAlert: true,
        alertType: "success",
        alertText: "Feature Updated Successfully!",
        isLoading: false,
      };
    case EDIT_FEATURE_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case SHOW_FEATURE_STATS_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: true,
      };
    case SHOW_FEATURE_STATS_SUCCESS:
      return {
        ...state,
        featureStats: action.payload.featureStats,
        monthlyFeatures: action.payload.monthlyFeatures,
        isLoading: false,
      };
    //Credit transactions
    case CREATE_CREDIT_TRANSACTION_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_CREDIT_TRANSACTION_SUCCESS:
      return {
        ...state,
        showAlert: true,
        alertType: "success",
        alertText: "Transaction successfully created!",
        isLoading: false,
      };
    case CREATE_CREDIT_TRANSACTION_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    //Debit transactions
    case CREATE_DEBIT_TRANSACTION_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_DEBIT_TRANSACTION_SUCCESS:
      return {
        ...state,
        showAlert: true,
        alertType: "success",
        alertText: "Transaction successfully created!",
        isLoading: false,
      };
    case CREATE_DEBIT_TRANSACTION_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case SET_EDIT_DEBIT_TRANSACTION:
      return {
        ...state,
        imageOwner: action.payload.uuid,
      };
    //images
    case UPLOAD_IMAGE_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case CREATE_IMAGE_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_IMAGE_SUCCESS:
      return {
        ...state,
        showAlert: true,
        alertType: "success",
        alertText: "Image uploaded successfully!",
        isLoading: false,
      };
    case CREATE_IMAGE_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };

    case GET_IMAGES_BEGIN:
      return {
        ...state,
        isLoading: false,
        showAlert: false,
        images: [],
      };
    case GET_IMAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        images: action.payload.images,
      };
    case SET_IMAGE_UPLOAD:
      return {
        ...state,
        formData: new FormData(),
      };
    case GET_PROJECT_OPERATING_COSTS_BEGIN:
      return {
        ...state,
        transactionArr: [],
        operatingBalance: "$0.00",
        funding: "$0.00",
        expenditure: "$0.00",
        positiveBalance: false,
      };
    case GET_PROJECT_OPERATING_COSTS_SUCCESS:
      return {
        ...state,
        transactionArr: action.payload.transactionArr,
        operatingBalance: action.payload.operatingBalance,
        funding: action.payload.funding,
        expenditure: action.payload.expenditure,
        positiveBalance: action.payload.positiveBalance,
      };
    default:
      return state;
  }
};

export default reducer;
