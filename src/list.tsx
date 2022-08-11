import { toChildArray } from 'preact'

import type { ComponentChildren } from 'preact'
import type { StylableComponentProps } from './types'

export interface ListProps extends StylableComponentProps {
  children: ComponentChildren
}

export function List(props: ListProps): JSX.Element {
  const { children, ...styleProps } = props

  return (
    <ul {...styleProps}>
      {toChildArray(children).map(child => (
        <li m="not-last:b-0.5">{child}</li>
      ))}
    </ul>
  )
}

export function HorizontalList(props: ListProps): JSX.Element {
  const { children, ...styleProps } = props

  return (
    <ul {...styleProps}>
      {toChildArray(children).map((child, index) => (
        <li display="inline">
          {index > 0 ? <span>{' | '}</span> : null}
          {child}
        </li>
      ))}
    </ul>
  )
}
