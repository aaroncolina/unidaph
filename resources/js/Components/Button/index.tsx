import { HTMLAttributes } from 'react';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import TertiaryButton from './TertiaryButton';
import DangerButton from './DangerButton';

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
  Danger = 'danger'
}

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
}

export function Button({ variant = ButtonVariant.Primary, ...props }: ButtonProps) {
  if (variant === ButtonVariant.Primary) return <PrimaryButton {...props} />;
  if (variant === ButtonVariant.Secondary) return <SecondaryButton {...props} />;
  if (variant === ButtonVariant.Tertiary) return <TertiaryButton {...props} />;
  if (variant === ButtonVariant.Danger) return <DangerButton {...props} />;

  return <PrimaryButton {...props} />;
}
