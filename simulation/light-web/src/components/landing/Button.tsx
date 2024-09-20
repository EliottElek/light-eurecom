import Link from 'next/link'
import clsx from 'clsx'

const baseStyles = {
  solid:
    'inline-flex justify-center rounded-lg py-2 px-3 items-center text-sm font-semibold outline-2 outline-offset-2 transition-colors',
  outline:
    'inline-flex justify-center rounded-lg border items-center px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors',
}

const variantStyles = {
  solid: {
    teal: 'relative overflow-hidden bg-primary text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-primary active:text-white/80 before:transition-colors',
    white:
      'bg-white text-teal-900 hover:bg-white/90 active:bg-white/90 active:text-teal-900/70',
    gray: 'bg-gray-800 dark:bg-primary text-white hover:bg-gray-900 active:bg-gray-800 active:text-white/80',
  },
  outline: {
    gray: 'active:/80',
  },
}

type ButtonProps = (
  | {
      variant?: 'solid'
      color?: keyof typeof variantStyles.solid
    }
  | {
      variant: 'outline'
      color?: keyof typeof variantStyles.outline
    }
) &
  (
    | Omit<React.ComponentPropsWithoutRef<typeof Link>, 'color'>
    | (Omit<React.ComponentPropsWithoutRef<'button'>, 'color'> & {
        href?: undefined
      })
  )

export function Button({ className, ...props }: ButtonProps) {
  props.variant ??= 'solid'
  props.color ??= 'gray'

  className = clsx(
    baseStyles[props.variant],
    props.variant === 'outline'
      ? variantStyles.outline[props.color]
      : props.variant === 'solid'
        ? variantStyles.solid[props.color]
        : undefined,
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
