import usePagination from "../../hooks/usePagination"

type PaginationProps = {
  onPageChange: (page: number) => void
  totalCount: number
  siblingCount?: number
  currentPage: number
  pageSize: number
}

const Pagination = ({onPageChange, totalCount, siblingCount=1, currentPage, pageSize}: PaginationProps) => {

  const paginationRange = usePagination({totalCount, siblingCount, currentPage, pageSize});

  if (currentPage === 0 || paginationRange.length <= 1){
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];
  
  const onNext = () => onPageChange(currentPage + 1);
  const onPrevious = () => onPageChange(currentPage - 1);


  return (
    <nav aria-label="pagination" className='my-4'>
      <ul className="pagination pagination-lg justify-content-center">
        <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
          <div className="page-link" onClick={onPrevious}>
              Previous
          </div>
        </li>
        { paginationRange.map(page => {
          if (page === '...') return <li className="page-item page-link">...</li>
          return (
            <li 
              className={`page-item ${currentPage === page && 'active'}`}
            >
              <div className="page-link" onClick={() => onPageChange(page)}>{page}</div>
            </li>
          )
        })}
        <li className={`page-item ${currentPage === lastPage && 'disabled'}`}>
          <div className="page-link" onClick={onNext}>
            Next
          </div>
        </li>
      </ul>
    </nav>
  )
}
export default Pagination