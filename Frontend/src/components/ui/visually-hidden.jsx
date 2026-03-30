import * as React from "react"
import { cn } from "@/shared/lib/utils"

/**
 * Компонент для скрытия контента визуально, но сохранения его для screen reader'ов
 */
const VisuallyHidden = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
})

VisuallyHidden.displayName = "VisuallyHidden"

export { VisuallyHidden }