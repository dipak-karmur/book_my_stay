import React from "react"
import { GrPrevious } from "react-icons/gr"
import { GrNext } from "react-icons/gr"

const PaginationComponent = ({ nPages, currentPage, setCurrentPage }) => {
	const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

	const goToNextPage = () => {
		if (currentPage !== nPages) setCurrentPage(currentPage + 1)
	}

	const goToPrevPage = () => {
		if (currentPage !== 1) setCurrentPage(currentPage - 1)
	}

	return (
		nPages > 0 && (
			<div className="mt-6">
				<ul className="flex justify-center space-x-4">
					<li
						className={`grid place-items-center text-[#2590db] rounded-l focus:outline-none ${
							currentPage === 1 ? "text-gray-500 cursor-not-allowed" : ""
						}`}>
						<button
							onClick={goToPrevPage}
							className={`px-2 py-1  ${currentPage === 1 ? "cursor-not-allowed text-sm" : "text-xl"}`}
							disabled={currentPage === 1}>
							<GrPrevious />
						</button>
					</li>
					{pageNumbers.map((pgNumber) => (
						<li
							key={pgNumber}
							className={`rounded focus:outline-none p-1 min-w-[30px] min-h-[30px] grid place-items-center border-[#2590db] hover:bg-[#2590db] hover:text-white cursor-pointer transition-all 
              ${
								currentPage === pgNumber
									? "bg-[#2590db] border-2 border-[#2590db] text-white"
									: "border-2 border:[#2590db] text-[#2590db]"
							}`}>
							<button className="text-center w-full" onClick={() => setCurrentPage(pgNumber)}>
								{pgNumber}
							</button>
						</li>
					))}
					<li
						className={` grid place-items-center text-[#2590db] rounded-r focus:outline-none ${
							currentPage === nPages ? "text-gray-500 cursor-not-allowed" : ""
						}`}>
						<button
							onClick={goToNextPage}
							className={`px-2 py-1 ${currentPage === nPages ? "cursor-not-allowed text-sm" : "text-xl"}`}
							disabled={currentPage === nPages}>
							<GrNext />
						</button>
					</li>
				</ul>
			</div>
		)
	)
}

export default PaginationComponent




{/* <div className="flex justify-center space-x-1 dark:text-gray-800">
	<button title="previous" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-50 dark:border-gray-100">
		<svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
			<polyline points="15 18 9 12 15 6"></polyline>
		</svg>
	</button>
	<button type="button" title="Page 1" className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray-50 dark:text-violet-600 dark:border-violet-600">1</button>
	<button type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-gray-50 dark:border-gray-100" title="Page 2">2</button>
	<button type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-gray-50 dark:border-gray-100" title="Page 3">3</button>
	<button type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-gray-50 dark:border-gray-100" title="Page 4">4</button>
	<button title="next" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-50 dark:border-gray-100">
		<svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
			<polyline points="9 18 15 12 9 6"></polyline>
		</svg>
	</button>
</div> */}