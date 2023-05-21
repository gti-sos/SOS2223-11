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
  import SvelteIcon from './SvelteIcon.svelte'
</script>

<header id="head">
  <Navbar dark expand="md" color="dark">
    <NavbarBrand href="/"><SvelteIcon /> &nbsp; <b> Sistemas Orientados a Servicios</b></NavbarBrand>

    <Nav navbar class="ml-auto">
      <NavItem>
        <NavLink href="/" class="text-white">Inicio</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/about" class="text-white">Vídeos</NavLink>
      </NavItem>
      <Dropdown nav inNavbar>
        <DropdownToggle nav caret class="text-white">Interfaces</DropdownToggle>
        <DropdownMenu end>
          <DropdownItem
            ><NavLink href="/association-stats" class="text-black"
              >Asociaciones</NavLink
            ></DropdownItem
          >

          <DropdownItem
            ><NavLink href="/phone-line-stats" class="text-black"
              >Líneas de teléfono</NavLink
            ></DropdownItem
          >

          <DropdownItem
            ><NavLink href="/projection-homes-stats" class="text-black"
              >Proyección de hogares</NavLink
            ></DropdownItem
          >
        </DropdownMenu>
      </Dropdown>
      <Dropdown nav inNavbar>
        <DropdownToggle nav caret class="text-white">Integraciones y usos</DropdownToggle>
        <DropdownMenu end>
          <DropdownItem
          ><NavLink href="/integrations" class="text-black"
            >Todas</NavLink
          ></DropdownItem
        >

          <DropdownItem
            ><NavLink href="/association-stats/integrations" class="text-black"
              >Ignacio</NavLink
            ></DropdownItem
          >

          <DropdownItem
            ><NavLink href="/phone-line-stats/integrations" class="text-black"
              >Víctor</NavLink
            ></DropdownItem
          >

          <DropdownItem
            ><NavLink href="/projection-homes-stats/integrations" class="text-black"
              >Christian</NavLink
            ></DropdownItem
          >

          <DropdownItem
            ><NavLink href="/analytics" class="text-black"
              >Gráfica grupal</NavLink
            ></DropdownItem
          >
        </DropdownMenu>
      </Dropdown>
    </Nav>
  </Navbar>
</header>

<style>
  #head {
    width: 100%;
  }
</style>
