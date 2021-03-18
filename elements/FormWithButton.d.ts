import React from 'react';
interface Props {
    firstPlaceholder: string;
    secondPlaceholder: string;
    firstValue: number;
    secondValue: number;
    onFirstInputChange: any;
    onSecondInputChange: any;
    onSubmit?: any;
    buttonDisabled?: boolean;
    buttonText: string;
}
declare const FormWithButton: React.FunctionComponent<Props>;
export default FormWithButton;
