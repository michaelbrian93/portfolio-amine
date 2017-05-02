import React, { Component, PropTypes } from 'react'
import styles from './slider-breadcrumb.module.scss'

const getLabel = (currentIndex, index, title, order) => {
  let label = title

  if (currentIndex !== index) {
    label = (order < 10 ? `0${order}` : order)
  }

  return label
}

class SliderBreadCrumb extends Component {
  static propTypes = {
    projectsData: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleProjectSwitch: PropTypes.func.isRequired,
    currentIndex: PropTypes.number.isRequired
  }

  render () {
    const { projectsData, handleProjectSwitch, currentIndex } = this.props

    return (
      <div className={styles.root}>
        <ul className={styles.list}>
          {projectsData.map((project, index) => (
            <li
              key={project.shortTitle}
              className={`${styles.item} ${currentIndex === index ? styles.active : ''}`}
            >
              <div>
                <button
                  className={`${styles.number} ${currentIndex === index ? styles.active : ''}`}
                  onClick={() => handleProjectSwitch(index)}
                >
                  {getLabel(currentIndex, index, project.title, project.order)}
                </button>

                <div
                  ref={(component) => { this.thumbnail = component }}
                  className={`${styles.projectThumbnail} ${currentIndex === index ? styles.activeThumbnail : ''}`}
                  style={{ backgroundImage: `url(${project.cover})` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default SliderBreadCrumb