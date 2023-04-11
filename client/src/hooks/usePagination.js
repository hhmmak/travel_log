import { useMemo } from "react";

// helper function: return array of number from start to end inclusive
const range = (start, end) => {
  let length = end - start + 1;

  return Array.from({length}, (_, idx) => idx + start);
}

const usePagination = ({totalCount, pageSize, siblingCount=1, currentPage}) => {
  let paginationRange = useMemo(() => {

    const totalPage = Math.ceil(totalCount / pageSize);

    const totalPageDisplay = siblingCount + 5;

    // base case: num of page < page to display in pagination
    if (totalPageDisplay >= totalPage)  return range(1, totalPage);

    let leftIdx = Math.max(currentPage - siblingCount, 1);
    let rightIdx = Math.min(currentPage + siblingCount, totalPage)

    const truncLeft = leftIdx > 2;
    const truncRight = rightIdx < totalPage - 2;


    // truncate pages on right => 1,2,3,4,5,...,10 ; with siblingCount = 1, currentPage = 3, leftIdx = 2, totalPage = 10
    if (!truncLeft && truncRight){
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, '...', totalPage]
    }

    // truncate pages on right => 1,...,6,7,8,9,10 ; with siblingCount = 1, currentPage = 3, leftIdx = 2, totalPage = 10
    if (truncLeft && !truncRight){
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(totalPage - rightItemCount + 1, totalPage);

      return [1, '...', ...rightRange]
    }

    // truncate both sides
    let middleRange = range(leftIdx, rightIdx);
    return [1, '...', ...middleRange, '...', totalPage];

  }, [totalCount, pageSize, siblingCount, currentPage])
  return paginationRange;
}
export default usePagination