import React, { useState } from "react";
import {Table } from "semantic-ui-react";

interface Props {
  data: any | undefined;
  dataName: string;
}

export default function DetailsTableRow({
  data,
  dataName,
}: Props) {

  return (
    <Table.Row>
      <Table.Cell width={4}>{dataName}</Table.Cell>

      <Table.Cell>

          <>
            <div style={{ display: "inline-block", padding: "0.45em 0" }}>
              {data}
            </div>
          </>

      </Table.Cell>
    </Table.Row>
  );
}
