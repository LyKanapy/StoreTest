import React, { useState } from "react";
import { Button, ButtonGroup, Input, Table } from "semantic-ui-react";

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
  updateData,
}: Props) {
  const [fieldValue, setValue] = useState("");
  const [editMode, setEditMode] = useState(false);

  return (
    <Table.Row>
      <Table.Cell width={4}>{dataName}</Table.Cell>

      <Table.Cell>
        {/* Edit mode OFF */}
        {!editMode && (
          <>
            <div style={{ display: "inline-block", padding: "0.45em 0" }}>
              {data}
            </div>
            <Button
              size="tiny"
              positive
              onClick={() => setEditMode(!editMode)}
              floated="right"
            >
              Edit
            </Button>
          </>
        )}
        {/* Edit mode ON */}
        {editMode && (
          <>
            <Input
              size="small"
              onChange={(e) => setValue(e.target.value)}
              style={{ visibility: editMode ? "visible" : "hidden" }}
              placeholder={data}
            ></Input>
            <ButtonGroup floated="right" size="tiny">
              <Button
                positive
                floated="right"
                onClick={() => {
                  const obj: any = { ...object };
                  Object.entries(object!).forEach(([key, value], index) => {
                    if ((key = dataKey)) {
                      value = fieldValue;
                      obj[key] = value;
                    } else {
                      obj[key] = value;
                    }
                  });
                  object = obj;
                  updateData(object);
                  setEditMode(!editMode);
                }}
              >
                Save
              </Button>
              <Button
                negative
                floated="right"
                onClick={() => setEditMode(!editMode)}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </>
        )}
      </Table.Cell>
    </Table.Row>
  );
}
