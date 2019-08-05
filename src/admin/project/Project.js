import { Component } from 'react'
import { connect } from 'react-redux'
import { getSortedProjectsSelector } from './core/projectSelectors'
import { selectProject } from './core/projectActions'

class Project extends Component {
    componentWillMount() {
        this.props.selectProject(this.props.match.params.projectId)
    }

    render() {
        return this.props.children
    }
}

const mapStateToProps = state => ({
    projects: getSortedProjectsSelector(state)
})

const mapDispatchToProps = Object.assign(
    {},
    {
        selectProject: selectProject
    }
)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Project)
