import React, { ReactNode } from "react"

type Props = {
  // Children is passed via JSX nesting, so it should be optional in the props definition to avoid validation errors on the opening tag
  children?: ReactNode
  size?: "article" | "page" | "full"
}

export default function Container({ children, size = "page" }: Props) {
  const sizes = {
    article: "max-w-3xl",      // ~768px → lecture parfaite
    page: "max-w-6xl",         // pages catégories
    full: "max-w-7xl"          // homepage
  }

  return (
    <div className={`${sizes[size]} mx-auto px-4`}>
      {children}
    </div>
  )
}