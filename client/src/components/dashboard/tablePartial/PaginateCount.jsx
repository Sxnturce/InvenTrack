import ReactPaginate from "react-paginate";
import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PaginateCount({ pageCount, handlePageClick }) {
	return (
		<ReactPaginate
			breakLabel="..."
			nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
			onPageChange={handlePageClick}
			pageRangeDisplayed={5}
			pageCount={pageCount}
			previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
			renderOnZeroPageCount={null}
			containerClassName={"pagination"}
			activeClassName={"active_page"}
			pageLinkClassName={"page_link"}
			previousLinkClassName={"previus"}
			nextLinkClassName={"next"}
			breakLinkClassName={"brake_link"}
		/>
	);
}

export default PaginateCount;
