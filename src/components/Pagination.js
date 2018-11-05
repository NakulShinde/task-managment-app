import React, {Component} from "react"
import {connect} from 'react-redux'

import {PAGE_LIMIT, LEFT_PAGE, RIGHT_PAGE} from './../utils/constants'
import {fetchPageNumbers} from './../utils/index'
import {changeCurrentPage} from './../actions/TaskListActions'

import styles from './Pagination.module.scss'

class Pagination extends Component {

    onPageChange(newPage) {
        let newVal = this.props.currentPage;
        if (newPage === LEFT_PAGE) {
            newVal -= 2;
        } else if (newPage === RIGHT_PAGE) {
            newVal += 2;
        } else {
            newVal = newPage;
        }
        this.props.changePage(newVal)
    }

    render() {
        const {currentPage, tasksList} = this.props;

        const totalPages = Math.floor(tasksList.length / PAGE_LIMIT);

        const pages = fetchPageNumbers(totalPages, currentPage);

        const pageItem = (item, index, active = 0) => {
            return <span
                key={index}
                className={(active)
                ? styles.active
                : ''}
                onClick={() => {
                this.onPageChange(item);
            }}>{item}</span>
        }

        return (
            <div className={styles.pagination}>
                {pages.map((item, index) => {
                    if (item === currentPage) {
                        return pageItem(item, index, 1)
                    }
                    return pageItem(item, index)
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {tasksList: state.tasksSuccess, currentPage: state.currentPage};
};

const matchDispatchToProps = (dispatch) => {
    return {
        changePage: (page) => dispatch(changeCurrentPage(page))
    };
};

export default connect(mapStateToProps, matchDispatchToProps)(Pagination)
