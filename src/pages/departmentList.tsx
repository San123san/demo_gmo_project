// src/pages/departmentList.t

import React, { useState } from 'react';
import { Typography, Box, Container, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Hardcoded JSON data
const departments = [
    {
        department: 'customer_service',
        sub_departments: ['support', 'customer_success']
    },
    {
        department: 'design',
        sub_departments: ['graphic_design', 'product_design', 'web_design']
    }
];

const DepartmentList: React.FC = () => {
    const initialCheckedState = React.useMemo(() => {
        return departments.reduce((acc, dept) => {
            dept.sub_departments.forEach(subDept => {
                acc[`${dept.department}-${subDept}`] = false;
            });
            return acc;
        }, {} as { [key: string]: boolean });
    }, []);

    const [checked, setChecked] = React.useState<{ [key: string]: boolean }>(initialCheckedState);

    const [expandedDepartments, setExpandedDepartments] = useState<string[]>([]);

    const toggleDepartmentExpansion = (department: string) => {
        if (expandedDepartments.includes(department)) {
            setExpandedDepartments(expandedDepartments.filter(dep => dep !== department));
        } else {
            setExpandedDepartments([...expandedDepartments, department]);
        }
    };

    const isDepartmentExpanded = (department: string) => {
        return expandedDepartments.includes(department);
    };

    const handleSubDeptChange = (department: string, subDept: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked({
            ...checked,
            [`${department}-${subDept}`]: event.target.checked
        });
    };

    const handleDeptChange = (department: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = departments.find(dept => dept.department === department)?.sub_departments.reduce((acc, subDept) => {
            acc[`${department}-${subDept}`] = event.target.checked;
            return acc;
        }, {} as { [key: string]: boolean });
        setChecked({
            ...checked,
            ...newChecked
        });
    };

    return (
        <Box sx={{ bgcolor: '#f5f5f5', p: 1, mt: 2 }}>
            <Container sx={{ padding: '20px' }}>
                <Typography variant="h3">Departments</Typography>
                {departments.map((dept, index) => (
                    <Box key={index} sx={{ marginBottom: '10px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton
                                onClick={() => toggleDepartmentExpansion(dept.department)}
                                sx={{
                                    marginRight: '10px',
                                    '&.MuiIconButton-root': {
                                        border: 'none',
                                        '&:focus': {
                                            outline: 'none' // Remove outline on focus (optional)
                                        }
                                    }
                                }}
                            >
                                {isDepartmentExpanded(dept.department) ? <RemoveIcon /> : <AddIcon />}
                            </IconButton>
                            <FormControlLabel
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                                        <Typography variant="body1">{dept.department}</Typography>
                                        <Typography sx={{ marginLeft: 1, fontSize: 13 }}>
                                            ({dept.sub_departments.length})
                                        </Typography>
                                    </Box>
                                }
                                control={
                                    <Checkbox
                                        checked={Object.keys(checked).filter(key => key.startsWith(dept.department)).every(key => checked[key])}
                                        indeterminate={Object.keys(checked).filter(key => key.startsWith(dept.department)).some(key => checked[key]) && !Object.keys(checked).filter(key => key.startsWith(dept.department)).every(key => checked[key])}
                                        onChange={handleDeptChange(dept.department)}
                                    />
                                }
                            />
                        </Box>
                        {isDepartmentExpanded(dept.department) && (
                            <Box sx={{ pl: 10 }}>
                                {dept.sub_departments.map((subDept, subIndex) => (
                                    <Typography key={subIndex}>
                                        <FormControlLabel
                                            label={subDept}
                                            control={<Checkbox
                                                checked={checked[`${dept.department}-${subDept}`] || false}
                                                onChange={handleSubDeptChange(dept.department, subDept)}
                                            />}
                                        />
                                    </Typography>
                                ))}
                            </Box>
                        )}
                    </Box>
                ))}
            </Container>
        </Box>
    );
};

export default DepartmentList;
