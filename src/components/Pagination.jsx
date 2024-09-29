import React from 'react'

function Pagination({setPage,currentPage}) {
  return (
    <div className='pagination'>
        <button className='prev-btn'
            onClick={()=>setPage(currentPage-1)}
            disabled={currentPage===1}
        >
            Previous</button>
        {
            [...Array(5)].map((_,index)=>{
                return(
                    <button key={index}
                     className={`pag-btn ${currentPage === index + 1 ? 'pag-active' : ''}`}
                     onClick={()=>setPage(index+1)}
                     >{index+1}</button>
                )
            })
        }
        <button className='next-btn'
        onClick={()=>setPage(currentPage+1)}
        disabled={currentPage===5}
        >Next</button>
    </div>
  )
}

export default Pagination