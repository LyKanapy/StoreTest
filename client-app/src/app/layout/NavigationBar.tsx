import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Header, Icon, Menu } from "semantic-ui-react";

export default function NavigationBar() {

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <Icon icon="window restore"/>
                    TestStore
                </Menu.Item>
                <Menu.Item as={NavLink} to='/Products' name="Products" />
            </Container>
        </Menu>
    )

}