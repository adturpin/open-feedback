import { createSelector } from 'reselect'
import { getAdminStateSelector } from '../../adminSelector'
import { NO_ORGANIZATION_FAKE_ID } from '../../organization/core/organizationConstants'
import { getOrganizationsSelector } from '../../organization/core/organizationSelectors'

const getProjects = (state) => getAdminStateSelector(state).adminProject
const getProjectsData = (state) => getProjects(state).data

export const isProjectsLoadedSelector = (state) =>
    getProjects(state).projectsLoaded

export const getSelectedProjectIdSelector = (state) =>
    getProjects(state).selectedProjectId

export const isProjectApiInitSelector = (state) =>
    getProjects(state).projectApiInit

export const getMemberIds = (state) => getSelectedProjectSelector(state).members

export const getOwnerId = (state) => getSelectedProjectSelector(state).owner

export const getLanguagesSelector = (state) =>
    getSelectedProjectSelector(state).languages || []

export const getStartTimeSelector = (state) =>
    getSelectedProjectSelector(state).voteStartTime

// MEMOIZED

export const getSortedProjectsSelector = createSelector(
    getProjectsData,
    (projectsData) => {
        return projectsData.projects.sort((a, b) => {
            if (a.createdAt < b.createdAt) {
                return 1
            }
            if (a.createdAt > b.createdAt) {
                return -1
            }
            return 0
        })
    }
)

export const getSortedProjectsByOrganizationIdsSelector = createSelector(
    getSortedProjectsSelector,
    getOrganizationsSelector,
    (projects, organizations) => {
        const orgsWithProjects = projects
            .sort((a) => {
                if (!a.organizationId) {
                    return -1
                }
                return 0
            })
            .reduce((acc, project) => {
                const organizationId =
                    project.organizationId || NO_ORGANIZATION_FAKE_ID
                if (!acc[organizationId]) {
                    acc[organizationId] = {
                        projects: [],
                    }
                }
                acc[organizationId].projects.push(project)
                return acc
            }, {})

        // Add empty projects an hydrate org data
        return organizations.reduce((acc, organization) => {
            if (!acc[organization.id]) {
                acc[organization.id] = {
                    ...organization,
                    projects: [],
                }
            } else {
                acc[organization.id] = {
                    ...acc[organization.id],
                    ...organization,
                }
            }
            return acc
        }, orgsWithProjects)
    }
)

export const getSelectedProjectSelector = createSelector(
    getProjectsData,
    getSelectedProjectIdSelector,
    (projectsData, selectedProjectId) => {
        const projects = projectsData.projects
        if (!projects || projects.length < 1) {
            return null
        }
        return projects.filter((project) => project.id === selectedProjectId)[0]
    }
)
