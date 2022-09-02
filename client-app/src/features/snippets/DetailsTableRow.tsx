import React, { useState } from "react";
import { Input, Table } from "semantic-ui-react";

interface Props {
  data: any;
  dataName: string;
  dataKey: any;
  object: any;
  updateData: (object: any) => void;
}

export default function DetailsTableRow({
  data,
  dataName,
  object,
  dataKey,
  updateData
}: Props) {
  const [fieldValue, setValue] = useState("");
  const [editMode, setEditMode] = useState(false);

  return (
    <Table.Row>
      <Table.Cell width={4}>{dataName}</Table.Cell>
      <Table.Cell>
        {!editMode && <>{data}</>}
        {editMode && (
          <Input
            onChange={(e) => setValue(e.target.value)}
            style={{ visibility: editMode ? "visible" : "hidden" }}
            placeholder={data}
          ></Input>
        )}
      </Table.Cell>
      <>
        {!editMode && (
          <>
            <Table.Cell
              width="1"
              textAlign="center"
              style={{ cursor: "pointer" }}
              onClick={() => setEditMode(!editMode)}
            >
              Edit
            </Table.Cell>
          </>
        )}
        {editMode && (
          <>
            <Table.Cell
              width="1"
              textAlign="center"
              style={{
                cursor: "pointer",
                color: "white",
                backgroundColor: "#21ba45",
              }}
              onClick={() => {
                const obj: any = {...object};
                Object.entries(object!).forEach(([key, value], index) => {
                  if ((key = dataKey)) {
                    value = fieldValue;
                    obj[key] = value;
                  } else {
                    obj[key] = value;
                  }
                });
                object=obj;
                updateData(object)
                setEditMode(!editMode);
              }}
            >
              Save
            </Table.Cell>
            <Table.Cell
              width="1"
              textAlign="center"
              style={{ cursor: "pointer" }}
              onClick={() => setEditMode(!editMode)}
            >
              Cancel
            </Table.Cell>
          </>
        )}
      </>
    </Table.Row>
  );
}
