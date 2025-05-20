import clsx from 'clsx'
import React from 'react'

const Card = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx(
      'rounded-lg border bg-white text-black-500 shadow-sm w-full max-w-md',
      className,
    )}
    {...props}
  >
    {children}
  </div>
)

export default Card
