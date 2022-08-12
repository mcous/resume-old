import type { ComponentChild, ComponentChildren } from 'preact'

import { Link } from './link'
import { List } from './list'
import { Title } from './title'
import type { StylableComponentProps } from './types'

export interface ProjectProps extends StylableComponentProps {
  repository: string
  stats: ComponentChild[]
  children: ComponentChildren
}

export function Project(props: ProjectProps): JSX.Element {
  const { repository, stats, children, ...styleProps } = props

  return (
    <div {...styleProps}>
      <Title level="3" m="b-1">
        <Link href={`https://github.com/${repository}`}>{repository}</Link>
      </Title>
      <List m="b-1" text="sm">
        {stats}
      </List>
      <p text="sm">{children}</p>
    </div>
  )
}
