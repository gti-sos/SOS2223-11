<script>
    import {
        Navbar,
        NavbarBrand,
        Nav,
        NavItem,
        NavLink,
        Dropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem,
    } from "sveltestrap";
</script>

<Navbar color="light" light expand="md">
    <NavbarBrand href="/">My Website</NavbarBrand>
    <Nav navbar>
        <NavItem>
            <NavLink href="#">Home</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="#">About</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="#">Contact</NavLink>
        </NavItem>
        <Dropdown nav inNavbar>
            <DropdownToggle nav caret>Options</DropdownToggle>
            <DropdownMenu end>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </Nav>
</Navbar>
