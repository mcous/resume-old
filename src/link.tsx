import type { ComponentChildren } from 'preact'
import type { StylableComponentProps } from './types'

export interface LinkProps extends StylableComponentProps {
  href: string
  children: ComponentChildren
}

export function Link(props: LinkProps): JSX.Element {
  const { href, children, ...styleProps } = props

  return (
    <a href={href} text="blue-700" {...styleProps}>
      {children}
    </a>
  )
}
