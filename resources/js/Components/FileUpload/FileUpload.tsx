import { InputHTMLAttributes, useRef } from 'react';
import { Button, ButtonVariant } from '../Button';
import cx from 'classnames';

export interface FileUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  buttonLabel?: string;
  buttonVariant?: ButtonVariant;
  buttonClassName?: string;
}

export function FileUpload({
  buttonLabel = 'Upload',
  buttonVariant = ButtonVariant.Primary,
  buttonClassName,
  className,
  ...props
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClick = () => {
    if (!inputRef.current) return;

    inputRef.current?.click();
  };

  return (
    <>
      <input ref={inputRef} type="file" {...props} className={cx(className, 'hidden')} />
      <Button variant={buttonVariant} className={buttonClassName} onClick={onClick}>
        {buttonLabel}
      </Button>
    </>
  );
}
