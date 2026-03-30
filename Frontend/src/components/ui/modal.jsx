import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogPortal, DialogOverlay } from "./dialog"
import { cn } from "@/shared/lib/utils"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  children, 
  showCloseButton = true,
  maxWidth = "sm",
  className 
}) => {
  const maxWidthClasses = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className={cn(maxWidthClasses[maxWidth], "p-0 overflow-hidden", className)}>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-all duration-200 flex items-center justify-center text-xl leading-none border border-white/20"
            >
              ×
            </button>
          )}
          
          <div className="overflow-y-auto max-h-[85vh] scrollbar-none">
            <DialogHeader>
              {title ? (
                <DialogTitle>{title}</DialogTitle>
              ) : (
                <VisuallyHidden>
                  <DialogTitle>Модальное окно</DialogTitle>
                </VisuallyHidden>
              )}
              {description && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>
            
            <div className="px-6 pb-6">
              {children}
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};