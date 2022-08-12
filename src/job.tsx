import type { ComponentChild } from 'preact'

import { List, HorizontalList } from './list'
import { Title } from './title'
import type { StylableComponentProps } from './types'

export interface JobProps extends StylableComponentProps {
  name: string
  summary: ComponentChild[]
  roles: ComponentChild[]
  achievements: ComponentChild[]
}

export function Job(props: JobProps): JSX.Element {
  const { name, summary, roles, achievements, ...styleProps } = props

  return (
    <div {...styleProps}>
      <Title level="3" text="lg">
        {name}
      </Title>
      <HorizontalList m="b-2">{summary}</HorizontalList>
      <List m="b-2">{roles}</List>
      <List list="square">{achievements}</List>
    </div>
  )
}
