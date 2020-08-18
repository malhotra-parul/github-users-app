import React from 'react';
import Pagination from "@material-ui/lab/Pagination";

const PaginationComponent = ({ count, onPageChange, page}) => {

    const handlePageChange = (event, value) => {
        onPageChange(value);
    }
    return (
        <div>
            <Pagination
            className="my-3"
            count={count}
            page={page}
            siblingCount={2}
            boundaryCount={2}
            variant="outlined"
            shape="rounded"
            size="large"
            color="primary"
            onChange={handlePageChange}
          />
        </div>
    )
}

export default PaginationComponent
