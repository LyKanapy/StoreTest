import React from "react";
import { Table } from "semantic-ui-react";

interface Props {
    title: string,
    component: React.ReactNode;
}


export default function EntityList ({title, component} : Props) {


    return (
        <>
         <h1>{title}</h1>
            <Table celled striped>
                {component}
            </Table>
        </>
    )
}