import clsx from 'clsx';
import './LoadingIndicator.css';

interface LoadingIndicatorProps {
  text: string;
}

export default function LoadingIndicator({ text }: LoadingIndicatorProps) {
  return (
    <div className={clsx('absolute inset-0 flex flex-col items-center justify-center text-center')}>
      <svg
        className={clsx('loader')}
        width="64"
        height="64"
        viewBox="0 0 50 50"
        role="img"
        aria-label="Loading"
      >
        <circle className={clsx('loader-bg')} cx="25" cy="25" r="20" fill="none" stroke="var(--loader-bg, #e6f6ec)" strokeWidth="4" />
        <circle className={clsx('loader-fg')} cx="25" cy="25" r="20" fill="none" stroke="var(--loader-fg, #16a34a)" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <p className={clsx('text-gray-600 text-sm mt-2')}>{text}</p>
    </div>
  );
}
 