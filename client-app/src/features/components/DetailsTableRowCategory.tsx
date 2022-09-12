import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Dropdown, Table } from "semantic-ui-react";
import agent from "../../app/api/agent";
import { Category } from "../../app/models/category";

interface Props {
  data: any;
  dataName: string;
  dataKey: any;
  object: any;
  updateData: (object: any) => void;
  updateCategory: (id: string) => void;
}

export default function DetailsTableRowCategory({
  data,
  dataName,
  object,
  dataKey,
  updateData,
  updateCategory
}: Props) {
  const [fieldValue, setValue] = useState("");
  const [categoryId, setId] = useState("");
  const [editMode, setEditMode] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  let categoriesDropdown: any = [];

  useEffect(() => {
    agent.Categories.list().then((response) => {
      let categories: Category[] = [];
      response.forEach((product: any) => {
        categories.push(product);
      });
      setCategories(categories);
    });
  }, []);

  categories.map((category)=> {
    let object = {key : "", value: "", text: ""}
    object.key = category.categoryId;
    object.value = category.categoryId;
    object.text = category.categoryName;
    categoriesDropdown.push(object);
  })

  function handleOnChange (e: any, data: any) {
    let value = categories.find(x=> x.categoryId === data.value)!.categoryName
    setValue(value)
    setId(data.value)
  }

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
            <Dropdown
              placeholder={data}
              search
              selection
              options={categoriesDropdown}
              onChange={handleOnChange}
            ></Dropdown>
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
                  updateCategory(categoryId);
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
