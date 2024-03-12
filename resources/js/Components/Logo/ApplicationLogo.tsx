import logo from '@/assets/images/logo/91st-logo.png';
import cx from 'classnames';

export enum LogoOrientation {
  Vertical = 'vertical',
  Horizontal = 'horizontal'
}

export interface ApplicationLogoProps {
  orientation?: LogoOrientation;
  logoClassName?: string;
  className?: string;
}

export default function ApplicationLogo({
  orientation = LogoOrientation.Vertical,
  logoClassName,
  className
}: ApplicationLogoProps) {
  return (
    <div
      className={cx(className, 'flex gap-2 items-center cursor-pointer', {
        'flex-col': orientation === LogoOrientation.Vertical,
        'flex-row': orientation === LogoOrientation.Horizontal
      })}
    >
      <img src={logo} alt="..." className={cx(logoClassName, 'relative')} />
      <label className="text-lg font-bold">Unida PH</label>
    </div>
  );
}
