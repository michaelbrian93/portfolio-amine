import React, { Component } from 'react'
import TimelineLite from 'gsap/TimelineLite'
import { TRANSITION_LAYER_DURATION } from 'src/values/animations'
import breakpoints from 'src/values/breakpoints'
import styles from './page-transition-layer.module.scss'

class PageTransitionLayer extends Component {
  getInitialState () {
    return {
      width: 0,
      left: 'initial',
      right: 'initial'
    }
  }

  animateOut (onComplete, reverse) {
    const timeline = new TimelineLite({ onComplete })
    timeline.fromTo(
      this,
      TRANSITION_LAYER_DURATION,
      { state: { width: 0, [reverse ? 'right' : 'left']: 0 } },
      { state: { width: 100 } }
    )
    this.resetTimelineProperties(timeline)
  }

  animateIn (onComplete, reverse) {
    const timeline = new TimelineLite({ onComplete })
    timeline.fromTo(
      this,
      TRANSITION_LAYER_DURATION,
      { state: { width: 100, [reverse ? 'left' : 'right']: 0 } },
      { state: { width: 0 } }
    )
    this.resetTimelineProperties(timeline)
  }

  animate (direction, onComplete, reverse) {
    if (window.innerWidth >= breakpoints.desktop) {
      if (direction === 'in') {
        this.animateIn(onComplete, reverse)
      } else if (direction === 'out') {
        this.animateOut(onComplete, reverse)
      }
    } else {
      onComplete()
    }
  }

  resetTimelineProperties (timeline) {
    // Always reset timelines properties after they have finished animating so that we don’t have
    // to manually reset styles everytime.
    timeline.set(this, { state: this.getInitialState() })
  }

  render () {
    const { width, left, right } = this.state

    return (
      <div
        className={styles.root}
        style={{
          width: `${width}%`,
          left,
          right
        }}
      />
    )
  }
}

export default PageTransitionLayer
