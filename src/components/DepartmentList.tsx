import React, { useState } from 'react';
import { Checkbox, List, ListItem, ListItemText, Collapse, ListItemIcon } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import './departmentlist.css'

const departments = [
  {
    name: 'Customer_Service',
    subDepartments: ['Support', 'Customer_Success'],
  },
  {
    name: 'Design',
    subDepartments: ['Graphic_Design', 'Product_Design', 'Web_Design'],
  },
];



const DepartmentList: React.FC = () => {
  const [open, setOpen] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const handleClick = (department: string) => {
    setOpen(open === department ? null : department);
  };

  const handleSelect = (department: string, subDepartment?: string) => {
    if (subDepartment) {
      if (selected.includes(subDepartment)) {
        setSelected(selected.filter((item) => item !== subDepartment));
      } else {
        setSelected([...selected, subDepartment]);
      }
    } else {
      const isSelected = selected.includes(department);
      const allSubDepartments = departments
        .find((dept) => dept.name === department)!
        .subDepartments.map((sub) => `${department}-${sub}`);
      setSelected(
        isSelected ? selected.filter((item) => !allSubDepartments.includes(item)) : [...selected, ...allSubDepartments]
      );
    }
  };

  const isDepartmentSelected = (department: string) => {
    const allSubDepartments = departments
      .find((dept) => dept.name === department)!
      .subDepartments.map((sub) => `${department}-${sub}`);
    return allSubDepartments.every((sub) => selected.includes(sub));
  };

  const isSubDepartmentSelected = (subDepartment: string) => selected.includes(subDepartment);

  return (
    <div className='listContainer'>
    <List>
     <h1>DepartmentList Table</h1>
      {departments.map((department) => (
        <div key={department.name}>
          <ListItem button onClick={() => handleClick(department.name)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={isDepartmentSelected(department.name)}
                tabIndex={-1}
                disableRipple
                onChange={() => handleSelect(department.name)}
              />
            </ListItemIcon>
            <ListItemText primary={department.name} />
            {open === department.name ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open === department.name} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.subDepartments.map((subDepartment) => (
                <ListItem key={subDepartment} button style={{ paddingLeft: 32 }}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={isSubDepartmentSelected(`${department.name}-${subDepartment}`)}
                      tabIndex={-1}
                      disableRipple
                      onChange={() => handleSelect(department.name, `${department.name}-${subDepartment}`)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={subDepartment} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
    </div>
  );
};

export default DepartmentList;
