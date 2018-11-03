import React, {Component} from "react"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {setPaginationPage} from './../actions/TaskListActions'

import {PAGE_LIMIT, LEFT_PAGE, RIGHT_PAGE} from './../utils/constants'
import {fetchPageNumbers} from './../utils/index'

class Pagination extends Component {

    onPageChange(newPage) {
        if (newPage === LEFT_PAGE) {
            this
                .props
                .setPaginationPage(this.props.currentPage - 2)
        } else if (newPage === RIGHT_PAGE) {
            this
                .props
                .setPaginationPage(this.props.currentPage + 2)
        } else {
            this
                .props
                .setPaginationPage(newPage)
        }
    }

    render() {
        const {currentPage, tasks, error} = this.props;
        if(error || tasks.length === 0){
            return <div></div>
        }
        const totalPages = Math.floor(tasks.length / PAGE_LIMIT);
        
        const pages = fetchPageNumbers(totalPages, currentPage);

        const pageItem = (item, index, active = 0) => {
            return <span
                key={index}
                className={(active)
                ? 'active'
                : ''}
                onClick={() => {
                this.onPageChange(item);
            }}>{item}</span>
        }

        return (
            <div className="pagination">
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
    return {
        tasks: state.taskList.tasks, 
        currentPage: state.taskList.currentPage,
        error: state.taskList.error
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setPaginationPage: setPaginationPage
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Pagination)
