import './Pagination.css';

interface IPaginationProps {
    page: number,
    setPage: (...args: any[]) => void,
    total: number,
    limit: number
}

const Pagination = ({ page, limit, setPage, total } : IPaginationProps) => {
    console.log(Math.floor(total/limit) + ((total%limit === 0) ? 0 : 1))
    return (
        <div className="pagination">
            <div className="control" onClick={() => {
                if(page > 1) setPage(page-1);
            }}><i className="fa-solid fa-chevron-left"></i></div>
            {
                [...Array(Math.floor(total/limit) + ((total%limit === 0) ? 0 : 1)).keys()].map((e) => {
                    return <div className={(page === (e+1)) ? "active" : ""} onClick={() => { setPage(e+1) }}>{e+1}</div>
                })
            }
            <div className="control" onClick={() => {
                if(page < (Math.floor(total/limit) + ((total%limit === 0) ? 0 : 1))) setPage(page+1);
            }}><i className="fa-solid fa-chevron-right"></i></div>
        </div>
    );
}

export default Pagination;