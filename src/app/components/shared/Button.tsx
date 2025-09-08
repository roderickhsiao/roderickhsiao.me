interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'glass'
    | 'primary'
    | 'secondary'
    | 'active'
    | 'github'
    | 'npm'
    | 'demo'
    | 'icon'
    | 'close';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// Base classes
const baseClasses =
  'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

// Variant classes
const variantClasses = {
  glass:
    'text-gray-700 hover:text-gray-800 hover:shadow-md backdrop-blur-sm border border-white/30 hover:scale-105 rounded-full',
  primary: 'bg-primary text-white hover:bg-primary/90 rounded-lg',
  secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg',
  active: 'bg-primary text-white rounded-lg',
  github: 'bg-gray-900 text-white hover:bg-gray-800 rounded-lg',
  npm: 'bg-red-600 text-white hover:bg-red-700 rounded-lg',
  demo: 'bg-primary text-white hover:bg-primary/90 rounded-lg',
  icon: 'text-gray-600 hover:text-gray-800 hover:bg-white/30 bg-white/20 backdrop-blur-sm border border-white/30 hover:scale-105 rounded-full',
  close:
    'text-gray-600 hover:text-gray-800 hover:bg-white/30 bg-white/20 backdrop-blur-sm border border-white/30 hover:scale-105 rounded-full',
};

const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  children,
  className = '',
  style,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  // Size classes
  const sizeClasses = {
    xs: 'text-xs px-2 py-1.5 gap-1',
    sm: 'text-sm px-3 py-2 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-3 gap-2',
    icon: 'w-8 h-8 p-0',
  };

  // Combine classes
  const buttonClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Special styling for glass variant
  const buttonStyle =
    variant === 'glass'
      ? {
          background: 'rgba(255, 255, 255, 0.3)',
          ...style,
        }
      : style;

  return (
    <button
      className={buttonClasses}
      disabled={isDisabled}
      style={buttonStyle}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
