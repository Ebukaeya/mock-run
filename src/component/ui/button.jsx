import * as React from "react";

const Button = React.forwardRef(({ className = "", variant = "default", size = "default", children, ...props }, ref) => {
  // Base button styles
  let buttonClasses =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  // Variant styles
  if (variant === "default") {
    buttonClasses += " bg-primary text-primary-foreground hover:bg-primary/90";
  } else if (variant === "destructive") {
    buttonClasses += " bg-destructive text-destructive-foreground hover:bg-destructive/90";
  } else if (variant === "outline") {
    buttonClasses += " border border-input bg-background hover:bg-accent hover:text-accent-foreground";
  } else if (variant === "secondary") {
    buttonClasses += " bg-secondary text-secondary-foreground hover:bg-secondary/80";
  } else if (variant === "ghost") {
    buttonClasses += " hover:bg-accent hover:text-accent-foreground";
  } else if (variant === "link") {
    buttonClasses += " text-primary underline-offset-4 hover:underline";
  }

  // Size styles
  if (size === "default") {
    buttonClasses += " h-10 px-4 py-2";
  } else if (size === "sm") {
    buttonClasses += " h-9 rounded-md px-3";
  } else if (size === "lg") {
    buttonClasses += " h-11 rounded-md px-8";
  } else if (size === "icon") {
    buttonClasses += " h-10 w-10";
  }

  // Add custom className
  if (className) {
    buttonClasses += ` ${className}`;
  }

  return (
    <button className={buttonClasses} ref={ref} {...props}>
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button };
