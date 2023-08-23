import React from 'react'
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useAppContext } from "../context/appContext";
import {HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

const PageBtnContainer = () => {
      const {page,numOfPages,changePage} = useAppContext();

      const pages = Array.from({length: numOfPages}, (_, index)=>{
        return index + 1;
      })
      

      const prevPage = () => {
        let newPage = page - 1;
        if(newPage < 1){
          //newPage = 1
          //or
          newPage = numOfPages
        }
        changePage(newPage)
      }
    const nextPage = () => {
      let newPage = page + 1;
      if (newPage > numOfPages) {
        newPage = 1
        //or
        //newPage = numOfPages;
      }
      changePage(newPage);
    };
  return (
    <Wrapper>
      <button className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>

        {pages.map((pageNumber)=>{
            return (
              <button
                key={pageNumber}
                type='button'
                className={pageNumber === page ? "pageBtn active" : "pageBtn"}
                onClick={()=>{changePage(pageNumber);}}
              >
                {pageNumber}
              </button>
            );
        })}
      </div>
      <button className='next-btn' onClick={nextPage}>
        <HiChevronDoubleRight />
        next
      </button>
    </Wrapper>
  );
}

export default PageBtnContainer