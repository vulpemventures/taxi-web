import React from 'react';
interface Props {
    inputPlaceholder?: string;
    inputText?: string;
    onButtonClick?: any;
    onInputChange?: any;
    hasError?: boolean;
    errorMessage?: string;
    buttonDisabled?: boolean;
    buttonText: string;
}
declare const Input: React.FunctionComponent<Props>;
export default Input;
