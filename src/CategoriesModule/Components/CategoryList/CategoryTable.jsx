/** @format */

import { Visibility } from "@mui/icons-material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import noData from "../../../assets/images/nodata.png";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CategoryTable(props) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#e3e2e2", color: "white" }}>
              <TableCell>Item Name</TableCell>
              <TableCell align="right">Action</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody className="text-center"></TableBody>
          {props.categoriesList ? (
            <TableBody>
              {props.categoriesList.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.modificationDate}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <div className="mx-2">
                      <MoreHorizIcon
                        fontSize="small"
                        id={id}
                        onClick={handleClick}
                      />
                      <Popper
                        placement="left"
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        transition
                      >
                        {({ TransitionProps }) => (
                          <Fade {...TransitionProps} timeout={350}>
                            <Box
                              sx={{
                                border: 1,
                                p: 0,
                                bgcolor: "background.paper",
                                borderRadius: "1rem",
                              }}
                            >
                              <List>
                                <ListItem disablePadding>
                                  <ListItemButton>
                                    <ListItemIcon>
                                      <Visibility className="text-success" />
                                    </ListItemIcon>
                                    <ListItemText primary="view" />
                                  </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                  <ListItemButton>
                                    <ListItemIcon>
                                      <i className="fa-regular fa-pen-to-square text-success"></i>
                                    </ListItemIcon>
                                    <ListItemText primary="Edit" />
                                  </ListItemButton>
                                </ListItem>
                                <ListItem
                                  disablePadding
                                  onClick={() => props.showDeleteModal(row.id)}
                                >
                                  <ListItemButton>
                                    <ListItemIcon>
                                      <DeleteOutlineIcon className="text-success" />
                                    </ListItemIcon>
                                    <ListItemText primary="Delete" />
                                  </ListItemButton>
                                </ListItem>
                              </List>
                            </Box>
                          </Fade>
                        )}
                      </Popper>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          ) : (
            <div className="text-center">
              <img src={noData} />
            </div>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
