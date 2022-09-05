import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Dropdown, Icon, Menu } from "semantic-ui-react";
import agent from "../api/agent";
import { Category } from "../models/category";

export default function NavigationBar() {

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        agent.Categories.list().then((response) => {
          let categories: Category[] = [];
          response.forEach((product: any) => {
            categories.push(product);
          });
          setCategories(categories);
        });
      }, []);

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <Icon icon="window restore"/>
                    TestStore
                </Menu.Item>
                <Dropdown item text='Categories'>
                    <Dropdown.Menu>
                        {categories.map((category: Category) => (
                            <Dropdown.Item 
                                key={category.categoryId}
                                as={Link}
                                to={`/Categories/${category.categoryId}`}
                                >
                                    {category.categoryName}
                                </Dropdown.Item>
                            ))
                        }
                    </Dropdown.Menu>
                </Dropdown>
                <Menu.Item as={NavLink} to='/admin' position="right">
                    Admin   
                </Menu.Item>
                {/* <Menu.Item as={NavLink} to='/Products' name="Products" /> */}
            </Container>
        </Menu>
    )

}