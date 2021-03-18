import React from 'react';
interface Props {
    title?: string;
    menu?: Array<string>;
    onMenuChange?: any;
}
declare class Layout extends React.Component<Props> {
    state: {
        selected: number;
    };
    render(): JSX.Element;
}
export default Layout;
