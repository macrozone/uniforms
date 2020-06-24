import React, { HTMLProps, ReactNode } from 'react';
import classnames from 'classnames';
import { Override, connectField, filterDOMProps } from 'uniforms';

import AutoField from './AutoField';

export type NestFieldProps = Override<
  Omit<HTMLProps<HTMLDivElement>, 'onChange'>,
  {
    error?: boolean;
    errorMessage?: string;
    fields?: any[];
    itemProps?: object;
    label?: ReactNode;
    name: string;
    showInlineError?: boolean;
  }
>;

const Nest = ({
  children,
  className,
  error,
  errorMessage,
  fields,
  itemProps,
  label,
  name,
  showInlineError,
  ...props
}: NestFieldProps) => (
  <div
    className={classnames(className, { 'has-error': error })}
    {...filterDOMProps(props)}
  >
    {label && <label>{label}</label>}

    {!!(error && showInlineError) && (
      <span className="help-block">{errorMessage}</span>
    )}

    {children ||
      fields?.map(field => (
        <AutoField key={field} name={field} {...itemProps} />
      ))}
  </div>
);

export default connectField(Nest);
