import type { PropsWithChildren, HTMLAttributes } from 'react'

type CardVariant = 'default' | 'elevated' | 'accent' | 'gradient'

type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  variant?: CardVariant
  hover?: boolean
}

export function Card({ children, className = '', variant = 'default', hover = false, ...props }: CardProps) {
  const inner = (
    <div
      className={[
        'component p-4 rounded-lg',
        variant === 'elevated' ? 'card-elevated' : '',
        variant === 'accent' ? 'card-accent' : '',
        hover ? 'card-hover' : '',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  )

  if (variant === 'gradient') {
    return (
      <div className={`rounded-xl p-[1px] card-gradient ${hover ? 'card-hover' : ''}`}>
        <div className={`component p-4 rounded-xl ${className}`}>{children}</div>
      </div>
    )
  }

  return inner
}

export function CardHeader({ children, className = '', ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={`mb-3 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className = '', ...props }: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h3 className={`text-lg font-semibold ${className}`} {...props}>
      {children}
    </h3>
  )
}

export function CardContent({ children, className = '', ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={`text-sm ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className = '', ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={`mt-4 flex items-center gap-2 ${className}`} {...props}>
      {children}
    </div>
  )
}
