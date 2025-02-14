import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            className="rounded-xl data-[state=open]:animate-slideIn data-[state=closed]:animate-slideOut data-[swipe=end]:animate-slideOut"
          >
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport className="fixed top-full left-1/2 transform -translate-x-1/2 -translate-y-full flex flex-col gap-2 w-[390px] max-w-[100vw] m-0 list-none z-[100] outline-none" />
    </ToastProvider>
  );
}
