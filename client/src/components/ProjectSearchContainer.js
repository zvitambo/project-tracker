import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";
import { AiOutlineFileSearch } from "react-icons/ai";

const ProjectSearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    projectCategoryOptions,
    projectStatusOptions,
    handleChange,
    clearFilters,
    searchByProject,
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;

    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };

  return (
    <Wrapper>
      <form className='form'>
        <h4 className='form-text-header'>
          <span className='icon'>{<AiOutlineFileSearch />}</span>
          {`  search project`}
        </h4>
        <hr className='hr-center' />

        <div className='form-center'>
          <FormRow
            type='text'
            name='searchByProject'
            value={searchByProject}
            handleChange={handleSearch}
            placeholderText={`Search by project`}
            labelText='project'
          />
          <FormRow
            type='text'
            name='search'
            value={search}
            handleChange={handleSearch}
            placeholderText='Search by description'
            labelText='description'
          />
          <FormRowSelect
            labelText='status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...projectStatusOptions]}
          />
          <FormRowSelect
            labelText='category'
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            list={["all", ...projectCategoryOptions]}
          />

          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default ProjectSearchContainer;
