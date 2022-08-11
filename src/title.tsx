import type { ComponentChildren } from 'preact'
import type { StylableComponentProps } from './types'

export interface TitleProps extends StylableComponentProps {
  level: '1' | '2' | '3'
  children: ComponentChildren
}

export function Title(props: TitleProps): JSX.Element {
  const { level, children, ...styleProps } = props
  const Heading = `h${level}` as const

  return <Heading {...styleProps}>{children}</Heading>
}
