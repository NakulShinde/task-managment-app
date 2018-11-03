import {LEFT_PAGE, RIGHT_PAGE} from './constants'

export const utilsGetDate = (dateTime) => {
    return new Date(dateTime).toLocaleString();
}

export const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
};

export const fetchPageNumbers = (totalPages, currentPage) => {
    
    const pageNeighbours = 1;

    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
        let pages = [];

        const leftBound = currentPage - pageNeighbours;
        const rightBound = currentPage + pageNeighbours;
        const beforeLastPage = totalPages - 1;

        const startPage = leftBound > 2
            ? leftBound
            : 2;
        const endPage = rightBound < beforeLastPage
            ? rightBound
            : beforeLastPage;

        pages = range(startPage, endPage);

        const pagesCount = pages.length;
        const singleSpillOffset = totalNumbers - pagesCount - 1;

        const leftSpill = startPage > 2;
        const rightSpill = endPage < beforeLastPage;

        const leftSpillPage = LEFT_PAGE;
        const rightSpillPage = RIGHT_PAGE;

        if (leftSpill && !rightSpill) {
            const extraPages = range(startPage - singleSpillOffset, startPage - 1);
            pages = [
                leftSpillPage, ...extraPages,
                ...pages
            ];
        } else if (!leftSpill && rightSpill) {
            const extraPages = range(endPage + 1, endPage + singleSpillOffset);
            pages = [
                ...pages,
                ...extraPages,
                rightSpillPage
            ];
        } else if (leftSpill && rightSpill) {
            pages = [
                leftSpillPage, ...pages,
                rightSpillPage
            ];
        }

        return [
            1, ...pages,
            totalPages
        ];
    }

    return range(1, totalPages);
};