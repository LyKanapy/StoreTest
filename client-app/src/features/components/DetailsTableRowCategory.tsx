import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, ButtonGroup, Dropdown, Table } from "semantic-ui-react";
import { useStore } from "../../stores/store";

export default observer(function DetailsTableRowCategory() {
  // MobX
  const { productStore, categoryStore } = useStore();

  const [categoryId, setId] = useState("");
  const [editMode, setEditMode] = useState(false);

  let categoriesDropdown: any = [];

  categoryStore.categories.forEach((category) => {
    let object = { key: "", value: "", text: "" };
    object.key = category.categoryId;
    object.value = category.categoryId;
    object.text = category.categoryName;
    categoriesDropdown.push(object);
  });

  function handleOnChange(e: any, data: any) {
    setId(data.value);
  }

  function renderNewCategoryValue() {
    let value = categoryStore.categories.find(x=> x.categoryId === categoryId)!.categoryName;
    productStore.selectedProduct!.categoryName=value;
  }


  return (
    <Table.Row>
      <Table.Cell width={4}>Category</Table.Cell>

      <Table.Cell>
        {/* Edit mode OFF */}
        {!editMode && (
          <>
            <div style={{ display: "inline-block", padding: "0.45em 0" }}>
              {productStore.selectedProduct?.categoryName}
            </div>
            <Button
              size="tiny"
              positive
              onClick={() => {
                setEditMode(!editMode);
                categoryStore.loadListCategories();
              }}
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
              placeholder="Select Category"
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
                  productStore.idChangeCategoryTo(categoryId);
                  setEditMode(!editMode);
                  renderNewCategoryValue();
                  categoryStore.unloadListCategories();
                }}
              >
                Save
              </Button>
              <Button
                negative
                floated="right"
                onClick={() => {
                  setEditMode(!editMode);
                  categoryStore.unloadListCategories();
                }}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </>
        )}
      </Table.Cell>
    </Table.Row>
  );
});
