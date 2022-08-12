import type { ComponentChildren } from 'preact'

import { List } from './list'
import { Title } from './title'
import type { StylableComponentProps } from './types'

export interface TitledListProps extends StylableComponentProps {
  title: ComponentChildren
  children: ComponentChildren
}

export function TitledList(props: TitledListProps): JSX.Element {
  const { title, children, ...styleProps } = props

  return (
    <div {...styleProps}>
      <Title level="3" m="b-1">
        {title}
      </Title>
      <List text="sm">{children}</List>
    </div>
  )
}
