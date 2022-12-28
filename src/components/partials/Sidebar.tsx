import React from "react";
import {Badge, Box, NavLink, Input, Kbd} from '@mantine/core';
import {IconHome2, IconGauge, IconChevronRight, IconActivity, IconCircleOff, IconSearch} from '@tabler/icons';

const Sidebar = ({backgroundColor}: { backgroundColor: string }) => {
  return (
    <div className={"sidebar"} style={{background: backgroundColor}}>
      <Input
        icon={<IconSearch size={12}/>}
        placeholder="Search..."
        size="xs"
        className={"sidebar-search"}
        rightSection={(
          <div className={"sidebar-search-right"}>
            ⌘+K
          </div>
        )}
      />
      <div className="sidebar-inside scroll-bar">
        <NavLink label="With icon" icon={<IconHome2 size={16} stroke={1.5}/>}/>
        <NavLink label="With icon" icon={<IconHome2 size={16} stroke={1.5}/>}/>
        <NavLink label="With icon" icon={<IconHome2 size={16} stroke={1.5}/>}/>
        <NavLink label="With icon" icon={<IconHome2 size={16} stroke={1.5}/>}/>
        <NavLink label="With icon" icon={<IconHome2 size={16} stroke={1.5}/>}/>
        <NavLink label="With icon" icon={<IconHome2 size={16} stroke={1.5}/>}/>
        <NavLink label="With icon" icon={<IconHome2 size={16} stroke={1.5}/>}/>
        <NavLink label="With icon" icon={<IconHome2 size={16} stroke={1.5}/>}/>
        <NavLink label="With icon" icon={<IconHome2 size={16} stroke={1.5}/>}/>
        <NavLink label="With icon" icon={<IconHome2 size={16} stroke={1.5}/>}/>
        <NavLink label="With icon" icon={<IconHome2 size={16} stroke={1.5}/>}/>
        <NavLink label="With icon" icon={<IconHome2 size={16} stroke={1.5}/>}/>
        <NavLink label="With icon" icon={<IconHome2 size={16} stroke={1.5}/>}/>
        <NavLink label="With icon" icon={<IconHome2 size={16} stroke={1.5}/>}/>
        <NavLink label="With icon" icon={<IconHome2 size={16} stroke={1.5}/>}/>
        <NavLink label="With icon" icon={<IconHome2 size={16} stroke={1.5}/>}/>
        <NavLink label="With icon" icon={<IconHome2 size={16} stroke={1.5}/>}/>
        <NavLink label="With icon" icon={<IconHome2 size={16} stroke={1.5}/>}/>
        <NavLink label="With icon" icon={<IconHome2 size={16} stroke={1.5}/>}/>
        <NavLink label="With icon" icon={<IconHome2 size={16} stroke={1.5}/>}/>
        <NavLink label="With icon" icon={<IconHome2 size={16} stroke={1.5}/>}/>
        <NavLink
          label="With right section"
          icon={<IconGauge size={16} stroke={1.5}/>}
          rightSection={<IconChevronRight size={12} stroke={1.5}/>}
        />
        <NavLink label="Disabled" icon={<IconCircleOff size={16} stroke={1.5}/>} disabled/>
        <NavLink
          label="With description"
          description="Additional information"
          icon={
            <Badge size="xs" variant="filled" color="red" sx={{width: 16, height: 16, padding: 0}}>
              3
            </Badge>
          }
        />
        <NavLink
          label="Active subtle"
          icon={<IconActivity size={16} stroke={1.5}/>}
          rightSection={<IconChevronRight size={12} stroke={1.5}/>}
          variant="subtle"
          active
        />
        <NavLink
          label="Active light"
          icon={<IconActivity size={16} stroke={1.5}/>}
          rightSection={<IconChevronRight size={12} stroke={1.5}/>}
          active
        />
        <NavLink
          label="Active filled"
          icon={<IconActivity size={16} stroke={1.5}/>}
          rightSection={<IconChevronRight size={12} stroke={1.5}/>}
          variant="filled"
          active
        />
      </div>
    </div>
  )
}

export default Sidebar
